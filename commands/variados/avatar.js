const { getMember, formatDate } = require("../../functions.js");
const { RichEmbed } =require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "avatar",
    category: "variados",
    description: "Mostra o avatar de algum usuário",
    run: async(bot, message, args) => {

        const member = getMember(message, args.join(" "));

        if(!args[1]){                 
            const avatarEmbed = new RichEmbed()
            .setColor('#275BF0')
            .setTitle(message.author.username +", que foto linda ^^")
            .setImage(message.author.avatarURL);
            message.channel.send(avatarEmbed);
        }else{

            var mentioned = message.mentions.users.first();

            const avatarEmbed = new RichEmbed()
            .setColor('#275BF0')
            .setTitle(`Foto de ${mentioned.username}`)
            .setImage(mentioned.avatarURL);
            message.channel.send(avatarEmbed);
            
        }

    }}
