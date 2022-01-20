const vrchat = require("vrchat");
const SystemApi = new vrchat.SystemApi();

exports.run = async (client, message, args, level) => {
    SystemApi.getCurrentOnlineUsers().then(resp => {
        message.channel.send({ content: `VRChat Online Users: ${resp.data}` });
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["online"],
    permLevel: "User"
};

exports.help = {
    name: "vrc-online",
    category: "VRChat",
    description: "VRChat Online User Count",
    usage: "vrc-online"
};