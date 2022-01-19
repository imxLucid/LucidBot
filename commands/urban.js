const { MessageEmbed } = require('discord.js');
var axios = require('axios');

const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

exports.run = async (client, message, args, level) => {

    if (!args.length) {
        args[0] = "ID10T";
    }

    if (args[0] != "") {
        var searchQuery = args[0];

        // Send a POST request
        axios({
            method: 'get',
            url: 'http://api.urbandictionary.com/v0/define',
            headers: { "Content-Type": "application/json" },
            params: { "term": searchQuery }
        })
            .then(resp => {
                //console.log(resp.data.list);
                const [answer] = resp.data.list;

                if (answer == null)
                    return message.reply({ content: `No definition found for searchterm "${searchQuery}"!` });

                const embed = new MessageEmbed()
                    .setColor('#1D2439')
                    .setTitle(answer.word)
                    .setURL(answer.permalink)
                    .setThumbnail('https://justn.io/lucidbot/ud.png')
                    .addFields(
                        { name: 'Definition', value: trim(answer.definition, 1024) },
                        { name: 'Example', value: trim(answer.example, 1024) },
                        { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` }
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
    aliases: ["urban"],
    permLevel: "User"
};

exports.help = {
    name: "ud",
    category: "Miscellaneous",
    description: "Urban Dictionary Lookup",
    usage: "ud"
};
