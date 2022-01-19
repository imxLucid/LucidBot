const vrchat = require("vrchat");
const configuration = new vrchat.Configuration({
    username: "LucidBot",
    password: "s9qHhfbsAVWXrBDn"
});

exports.run = async (client, message, args, level) => {

    const SystemApi = new vrchat.SystemApi(configuration);

    SystemApi.getCurrentOnlineUsers().then(resp => {
        console.log(`Current Online Users: ${resp.data}`);
        message.reply({ content: `VRChat Online Users: ${resp.data}` });
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