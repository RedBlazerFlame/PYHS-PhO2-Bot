import { Client } from "discord.js";

export const onReadyHandler = (client: Client<true>) => {
    console.log(`Logged in as ${client.user.tag}`);
};
