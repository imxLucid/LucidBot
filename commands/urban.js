const { MessageEmbed } = require('discord.js');
var axios = require('axios');

const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

exports.run = async (client, message, args, level) => {

    if (!args.length) {
        args[0] = "ID10T";
        //return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
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
            .then(function (response) {
                //console.log(response.data.list);
                const [answer] = response.data.list;

		if (answer == null)
		    return message.reply({ content: `No definition found for searchterm "${searchQuery}"!`});

                const embed = new MessageEmbed()
                    .setColor('#1D2439')
                    .setTitle(answer.word)
                    .setURL(answer.permalink)
                    .setThumbnail('https://g.udimg.com/assets/logo-1b439b7fa6572b659fbef161d8946372f472ef8e7169db1e47d21c91b410b918.svg')
                    .addFields(
                        { name: 'Definition', value: trim(answer.definition, 1024) },
                        { name: 'Example', value: trim(answer.example, 1024) },
                        { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` }
                    );
		    message.reply({ embeds: [embed] });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
	else return message.reply({ content: `An unexpected error occured during lookup!`});
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
