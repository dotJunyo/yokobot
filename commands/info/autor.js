module.exports = {
    name: "autor",
    category: "info",
    description: "A Yoko fala quem é seu criador!",
    run: async(bot, message, args) => {
        if(message.deletable) message.delete();

        /*const autorID = bot.fetchUser(295718290251317260).avatarURL();
        const autorName = bot.fetchUser(295718290251317260).username();

        const autorEmbed = new Discord.RichEmbed()
        .setColor('#275BF0')
        .setTitle(`Foto de ${autorName}`)
        .setImage(autorID);
        message.channel.send(autorEmbed);
*/
        message.channel.send('Fui criada por dotJunyo! (Ele é um gato)');
    },
}