const { getMember, formatDate } = require("../../functions.js");
const { RichEmbed } =require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "avatar",
    category: "variados",
    description: "Mostra o avatar de algum usuário",
    run: async(bot, message, args) => {
        if(message.deletable) message.delete();

        const member = getMember(message, args.join(" "));
        
        const avatarEmbed = new RichEmbed()
            .setColor('#275BF0')
            .setTitle(`Foto de ${member.user.username}`)
            .setImage(member.user.displayAvatarURL);
            message.channel.send(avatarEmbed);

    }}
