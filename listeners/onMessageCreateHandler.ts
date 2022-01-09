import { Client, Message } from "discord.js";
import { parseArgs } from "../helpers/parseArgs.js";
import { CommandHandler, commandHandlers } from "../scripts/commandHandlers.js";
import { PREFIX } from "../scripts/prefix.js";

export const onMessageCreateHandler = (
    client: Client<true>,
    message: Message
) => {
    if (message.content.startsWith(PREFIX)) {
        // This will take out the prefix to make reading the command easier
        const messageContentWithoutPrefix = message.content
            .split(PREFIX)
            .slice(1)
            .join(PREFIX);

        // Extracting Command Name and Command Arguments
        const messageContentDelimited = messageContentWithoutPrefix
            .split("\n")
            .map((entry) => entry.split(" "));

        let commandName: string = messageContentDelimited[0][0];

        let commandArgs: string = [
            messageContentDelimited[0].slice(1).join(" "),
            ...messageContentDelimited.slice(1).map((entry) => entry.join(" ")),
        ].join("\n");

        let parsedCommandArgs = parseArgs(commandArgs);

        // Handling Commands
        try {
            // If the command does not exist, throw an error
            if (!commandHandlers.has(commandName))
                throw `Command ${commandName} does not exist. Do p!help for a list of all commands`;

            // Fetching command handler data
            const commandHandler = commandHandlers.get(
                commandName
            ) as CommandHandler;

            // Checking if command inputs have all required fields
            for (let expectation of commandHandler.expects) {
                console.log(expectation);
                if (parsedCommandArgs[expectation] === undefined) {
                    throw `Command \`${commandName}\` expects a/an \`${expectation}\` field in the input.\n\nUsage of \`${PREFIX}${commandName}\`: \`${commandHandler.usage}\`  --  ${commandHandler.description}`;
                }
            }

            // Executing the command
            const { status, errorDescription } = commandHandler.callback({
                client,
                message,
                commandName,
                commandArgs: parsedCommandArgs,
                commandHandler,
            });

            if (status === "error" && errorDescription) {
                throw errorDescription;
            }
        } catch (e) {
            message.reply(
                `**Error**\n\nOh no... It seems like I encountered an error...\n\nError Description: ${
                    e || "An unknown error occured"
                }`
            );
        }
    }
};
