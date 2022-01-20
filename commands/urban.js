const { MessageEmbed } = require('discord.js');
const axios = require('axios');

const apiUrl = "http://api.urbandictionary.com/v0/define";

//const imageUrl = "https://justn.io/lucidbot/images/ud.png";
const imageUrl = "https://static.wikia.nocookie.net/logopedia/images/8/82/UD_logo-01.svg/revision/latest/scale-to-width-down/664?cb=20180906220343";

const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

exports.run = async (client, message, args, level) => {

    if (!args.length) {
        args[0] = "ID10T";
    }

    let searchQuery = args[0];

    axios({
        method: 'get',
        url: apiUrl,
        headers: { "Content-Type": "application/json" },
        params: { "term": searchQuery }
    })
        .then(resp => {
            //console.log(resp.data.list);
            const [answer] = resp.data.list;

            if (!answer)
                return message.reply({ content: `No definition found for searchterm "${searchQuery}"!` });

            const embed = new MessageEmbed()
                .setColor('#1D2439')
                .setTitle(answer.word)
                .setURL(answer.permalink)
                .setThumbnail(imageUrl)
                .addFields(
                    { name: 'Definition', value: trim(answer.definition, 1024) },
                    { name: 'Example', value: trim(answer.example, 1024) },
                    { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` }
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
    aliases: ["ud"],
    permLevel: "User"
};

exports.help = {
    name: "urban",
    category: "Miscellaneous",
    description: "Urban Dictionary Lookup",
    usage: "urban"
};
