const { MessageEmbed } = require('discord.js');
var axios = require('axios');

const imageUrl = "https://d348imysud55la.cloudfront.net/thumbnails/946814895.1.thumbnail-256.png";
//const imageUrl = "https://justn.io/lucidbot/images/robot.png";

exports.run = async (client, message, args, level) => {

    if (!args.length || !args[0].startsWith("avtr_"))
        return message.reply({ content: `Invalid Input!` });

    let searchQuery = args[0];
    let image = imageUrl;

    axios({
        method: 'get',
        url: 'https://requi.dev/vrcx_search.php',
        headers: { "Content-Type": "application/json", "user-agent": "Daaaaave was here" },
        params: { "searchTerm": searchQuery }
    })
        .then(resp => {
            const [avatar] = resp.data;
            //console.log(resp.data);
            if (!avatar)
                return message.reply({ content: `Avatar private or not found!` });

            if (!avatar.description) avatar.description = "None";
            if (!avatar.releaseStatus) avatar.releaseStatus = "Unknown";
            if (!avatar.authorName) avatar.authorName = "Unknown";
            if (!avatar.authorId) avatar.authorId = "Unknown";
            if (avatar.thumbnailImageUrl) image = avatar.thumbnailImageUrl;

            const embed = new MessageEmbed()
                .setColor('#1D2439')
                .setTitle(avatar.name)
                .setImage(image)
                .addFields(
                    { name: 'Avatar ID', value: avatar.id },
                    { name: 'Description', value: avatar.description },
                    //{ name: 'Release Status', value: avatar.releaseStatus },
                    { name: 'Author Name', value: avatar.authorName },
                    { name: 'Author ID', value: avatar.authorId }
                );
            message.channel.send({ embeds: [embed] });
        })
        .catch(error => {
            const err = error.response;
            if (err) { message.reply({ content: `${err.status} ${err.statusText}` }); }
            else if (error.request) { message.reply({ content: `Request timed out!` }); }
            else { message.reply({ content: `An unexpected error occured!` }); }
        })
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["avi", "avatar"],
    permLevel: "User"
};

exports.help = {
    name: "vrc-avi",
    category: "VRChat",
    description: "VRChat Avatar Lookup",
    usage: "vrc-avi"
};
