import { parseArgs } from "../helpers/parseArgs.js";
// Declaring Constants
const SUCCESS = {
    status: "success",
};
// Declaring Command Handlers
const commandHandlersObject = {
    announce: ({ client, message, commandName, commandArgs }) => {
        var _a;
        try {
            let parsedArgs = parseArgs(commandArgs);
            if (typeof parsedArgs.message === "undefined")
                throw "No message included. Try doing `p!announce ---message your message here`";
            for (let guild of client.guilds.cache.values()) {
                (_a = guild.systemChannel) === null || _a === void 0 ? void 0 : _a.send({
                    content: parsedArgs.message,
                });
            }
            return SUCCESS;
        }
        catch (e) {
            return Object.assign({ status: "error" }, (typeof e === "string" ? { errorDescription: e } : {}));
        }
    },
    answer: ({ client, message, commandName, commandArgs }) => {
        try {
            let parsedArgs = parseArgs(commandArgs);
            // Catching Errors
            if (parsedArgs.teamName === undefined)
                throw "No team name included. Try doing `p!announce ---teamName yourTeamName ---questionNumber questionNumber ---answer yourAnswer`";
            if (parsedArgs.questionNumber === undefined)
                throw "No question number included. Try doing `p!announce ---teamName yourTeamName ---questionNumber questionNumber ---answer yourAnswer`";
            if (parsedArgs.answer === undefined)
                throw "No answer included. Try doing `p!announce ---teamName yourTeamName ---questionNumber questionNumber ---answer yourAnswer`";
            // TODO Do something with the response
            // Updating user on the status of the command
            message.reply(`Success! Team **${parsedArgs.teamName}** gave the following answer to question ${parsedArgs.questionNumber}:\n\n ${parsedArgs.answer}`);
            return SUCCESS;
        }
        catch (e) {
            return Object.assign({ status: "error" }, (typeof e === "string" ? { errorDescription: e } : {}));
        }
        return SUCCESS;
    },
};
export const commandHandlers = new Map(Object.entries(commandHandlersObject));
