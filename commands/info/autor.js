const { RichEmbed } = require('discord.js');

module.exports = {
    name: "autor",
    aliases: "author",
    category: "info",
    description: "A Yoko fala quem é seu criador!",
    example: "-autor",
    run: async(bot, message, args) => {

        if(message.deletable) message.delete();

        const autorEmbed = new RichEmbed()
        .setColor('#275BF0')
        .setTitle("Fui criada por Junyo#6937")
        .setImage("https://i.imgur.com/xgSyBDZ.png")
        message.channel.send(autorEmbed);
    },
}