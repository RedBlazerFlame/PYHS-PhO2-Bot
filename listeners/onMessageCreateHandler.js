const PREFIX = "p!";
export const onMessageCreateHandler = (client, message) => {
    if (message.content.startsWith(PREFIX)) {
        message.reply("pong");
    }
};
