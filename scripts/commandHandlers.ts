import { Client, Message } from "discord.js";
import { parseArgs } from "../helpers/parseArgs.js";

// Declaring Types
type CommandHandlerInputs = {
    client: Client<true>;
    message: Message;
    commandName: string;
    commandArgs: string;
};
type CommandResult = {
    status: "success" | "error";
    errorDescription?: string;
};
export type CommandHandler = (inputs: CommandHandlerInputs) => CommandResult;
type CommandHandlerObject = {
    [key: string]: CommandHandler;
};

// Declaring Constants
const SUCCESS: CommandResult = {
    status: "success",
};

// Declaring Command Handlers
const commandHandlersObject: CommandHandlerObject = {
    announce: ({ client, message, commandName, commandArgs }) => {
        try {
            let parsedArgs = parseArgs(commandArgs);

            if (typeof parsedArgs.message === "undefined")
                throw "No message included. Try doing `p!announce ---message your message here`";

            for (let guild of client.guilds.cache.values()) {
                guild.systemChannel?.send({
                    content: parsedArgs.message,
                });
            }
            return SUCCESS;
        } catch (e) {
            return {
                status: "error",
                ...(typeof e === "string" ? { errorDescription: e } : {}),
            };
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
            message.reply(
                `Success! Team **${parsedArgs.teamName}** gave the following answer to question ${parsedArgs.questionNumber}:\n\n ${parsedArgs.answer}`
            );

            return SUCCESS;
        } catch (e) {
            return {
                status: "error",
                ...(typeof e === "string" ? { errorDescription: e } : {}),
            };
        }

        return SUCCESS;
    },
};

export const commandHandlers: Map<string, CommandHandler> = new Map(
    Object.entries(commandHandlersObject)
);
