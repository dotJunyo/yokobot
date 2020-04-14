module.exports = {
    name: "autor",
    aliases: "author",
    category: "info",
    description: "A Yoko fala quem é seu criador!",
    example: "-autor",
    run: async(bot, message, args) => {

        var autorImg = "https://cdn.discordapp.com/avatars/295718290251317260/9055d701ffc0a6e440b12c790845b4d9.png?size=2048"

        if(message.deletable) message.delete();

        const autorEmbed = new Discord.RichEmbed()
        .setColor('#275BF0')
        .setTitle("Fui criada por Junyo#6937")
        .setImage(autorImg)
        message.channel.send(autorEmbed);
    },
}