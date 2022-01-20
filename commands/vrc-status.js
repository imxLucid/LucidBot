const vrchat = require("vrchat");

exports.run = async (client, message, args, level) => {
    message.channel.send({ content: `https://metrics.vrch.at/d/vrchat/vrchat-status\nhttps://metrics.vrch.at/d/vrchat-api-status/vrchat-api-status` });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["vrc", "vrcstatus"],
    permLevel: "User"
};

exports.help = {
    name: "vrc-status",
    category: "VRChat",
    description: "Not Implemented",
    usage: "vrc-status"
};