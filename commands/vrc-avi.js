const { MessageEmbed } = require('discord.js');
var axios = require('axios');

exports.run = async (client, message, args, level) => {

    if (!args.length)
        return message.reply({ content: `Invalid Avatar ID!` });

    if (args[0] != "") {
        let searchQuery = args[0];

        if (!searchQuery.startsWith("avtr_"))
            return message.reply({ content: `Invalid Avatar ID!` });

        // Send a POST request
        axios({
            method: 'get',
            url: 'https://requi.dev/vrcx_search.php',
            headers: { "Content-Type": "application/json", "user-agent": "Daaaaave was here" },
            params: { "searchTerm": searchQuery }
        })
            .then(resp => {
                const [avatar] = resp.data;

                console.log(avatar);

                if (avatar == null)
                    return message.reply({ content: `No results found for "${searchQuery}"!` });

                const embed = new MessageEmbed()
                    .setColor('#1D2439')
                    .setTitle(avatar.name)
                    .setImage(avatar.thumbnailImageUrl)
                    .addFields(
                        { name: 'Avatar ID', value: avatar.id },
                        { name: 'Description', value: avatar.description },
                        { name: 'Release Status', value: avatar.releaseStatus },
                        { name: 'Author ID', value: avatar.authorId },
                        { name: 'Author Name', value: avatar.authorName }
                    );
                message.channel.send({ embeds: [embed] });
            })
            .catch(error => {
                const err = error.response;
                if (err) {
                    message.reply({ content: `${err.status} ${err.statusText}` });
                }
                else if (error.reqeust) {
                    message.reply({ content: `Request timed out!` });
                }
                else { message.reply({ content: `An unexpected error occured!` }); }
            })
    }
    else return message.reply({ content: `An unexpected error occured!` });

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
