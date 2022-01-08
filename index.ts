// Importing Dependencies
import Discord from "discord.js";
import { onMessageCreateHandler } from "./listeners/onMessageCreateHandler.js";
import { onReadyHandler } from "./listeners/onReadyHandler.js";
import Dotenv from "dotenv";

// Setting up ENV file
Dotenv.config();

// Creating Discord Client
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
});

// Setting up Event Handlers
client.on("ready", onReadyHandler);

client.on("messageCreate", (msg) => {
    return onMessageCreateHandler(client, msg);
});

// Logging into the bot
client.login(process.env.TOKEN);
