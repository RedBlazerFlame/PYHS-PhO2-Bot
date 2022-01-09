import { PREFIX } from "../scripts/prefix.js";
// Declaring Constants
const SUCCESS = {
    status: "success",
};
// Declaring Command Handlers
const commandHandlersObject = {
    /* Help Command */
    help: {
        expects: [],
        usage: `${PREFIX}help ---command? command`,
        description: "Provides descriptions and usage of all commands",
        callback: ({ client, message, commandName, commandArgs }) => {
            try {
                if (commandArgs.command === undefined) {
                    message.reply(`**Command Help**\n\n${Object.entries(commandHandlersObject)
                        .map((command) => `**${command[0]}**: \`${command[1].usage}\` (${command[1].description})\n`)
                        .join("\n")}`);
                }
                else if (commandHandlersObject[commandArgs.command] === undefined) {
                    throw `Command ${commandArgs.command} does not exist`;
                }
                else {
                    const commandInfo = commandHandlersObject[commandArgs.command];
                    message.reply(`**${commandArgs.command}**\n\nUsage: \`${commandInfo.usage}\`\nDescription: ${commandInfo.description}`);
                }
                return SUCCESS;
            }
            catch (e) {
                return Object.assign({ status: "error" }, (typeof e === "string" ? { errorDescription: e } : {}));
            }
        },
    },
    /* Announce Command */
    announce: {
        expects: ["message"],
        usage: `p!announce ---message yourMessageHere`,
        description: "Broadcasts a message to all servers the bot is in",
        callback: ({ client, message, commandName, commandArgs }) => {
            var _a;
            try {
                for (let guild of client.guilds.cache.values()) {
                    (_a = guild.systemChannel) === null || _a === void 0 ? void 0 : _a.send({
                        content: commandArgs.message,
                    });
                }
                return SUCCESS;
            }
            catch (e) {
                return Object.assign({ status: "error" }, (typeof e === "string" ? { errorDescription: e } : {}));
            }
        },
    },
    /* Answer Command */
    answer: {
        expects: ["teamName", "questionNumber", "answer"],
        usage: `p!answer ---teamName yourTeamName ---questionNumber questionNumber ---answer yourAnswer`,
        description: "Sends a response to a question",
        callback: ({ client, message, commandName, commandArgs }) => {
            try {
                // TODO Do something with the response
                // Updating user on the status of the command
                message.reply(`Success! Team **${commandArgs.teamName}** gave the following answer to question ${commandArgs.questionNumber}:\n\n ${commandArgs.answer}`);
                return SUCCESS;
            }
            catch (e) {
                return Object.assign({ status: "error" }, (typeof e === "string" ? { errorDescription: e } : {}));
            }
            return SUCCESS;
        },
    },
};
export const commandHandlers = new Map(Object.entries(commandHandlersObject));
