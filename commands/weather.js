const weather = require('weather-js');
const discord = require('discord.js')

exports.run = async (client, message, args, level) => {

    if (!args.length)
        return message.reply({ content: `No location specified!` });
    weather.find({ search: args.join(" "), degreeType: 'F' }, function (err, result) {
        try {

            var temp = result[0].current.temperature;
            var feel = result[0].current.feelslike;

            let embed = new discord.MessageEmbed()
                .setTitle(`${result[0].location.name}\n${result[0].current.skytext}`)
                .setColor("#ff2050")
                .setDescription(`${result[0].location.alert}`, true)
                .addField("Temperature", `${temp}F / ${Math.round(((temp - 32) * 5 / 9) * 100) / 100}C`, true)
                .addField("Feels Like", `${feel}F / ${Math.round(((feel - 32) * 5 / 9) * 100) / 100}C`, true)
                .addField("Humidity", `${result[0].current.humidity}%`, true)
                .addField("High", `${result[0].forecast[1].high}`, true)
                .addField("Low", `${result[0].forecast[1].low}`, true)
                .addField("Precipitation", `${result[0].forecast[1].precip}%`, true)
                .addField("Wind", result[0].current.winddisplay, true)
                //.addField("Alerts", result[0].location.alert, true)
                .setThumbnail(result[0].current.imageUrl);
            message.reply({ embeds: [embed] });
        }
        catch (err) { return message.reply({ content: `An unexpected error occured during lookup!` }); };
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["weather"],
    permLevel: "User"
};

exports.help = {
    name: "w",
    category: "Miscellaneous",
    description: "Weather Lookup",
    usage: "w"
};