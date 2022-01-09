import { Client, Message } from "discord.js";
import { CommandHandler, commandHandlers } from "../scripts/commandHandlers.js";

// Setting Prefix
const PREFIX = "p!";

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

        // Handling Commands

        /// If the command does not exist, do nothing
        if (!commandHandlers.has(commandName)) return;

        // Executing the command
        const { status, errorDescription } = (
            commandHandlers.get(commandName) as CommandHandler
        )({
            client,
            message,
            commandName,
            commandArgs,
        });

        if (status === "error") {
            message.reply(
                `**Error**\n\nOh no... It seems like I encountered an error...\n\nError Description: ${
                    errorDescription || "An unknown error occured"
                }`
            );
        }
    }
};
