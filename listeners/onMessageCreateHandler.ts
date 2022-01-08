import { Client, Message } from "discord.js";

const PREFIX = "p!";

export const onMessageCreateHandler = (
    client: Client<true>,
    message: Message
) => {
    if (message.content.startsWith(PREFIX)) {
        message.reply("pong");
    }
};
