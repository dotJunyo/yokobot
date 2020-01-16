const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { promptMessage } = require('../../functions.js');

module.exports = {
    name: "kick",
    aliases: ["expulsar"],
    category: "moderation",
    description: "Chuta um usuário pra longe do server!",
    example: "-kick @Bagunceiro",
    run: async(bot, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

        if(message.deletable) message.delete();

        //Não mencionou
        if(!args[0])
            return message.reply("Você não me falou quem é o bagunceiro!👀")
            .then(m => m.delete(5000));

        //Sem motivo
        if(!args[1])
            return message.reply("Você não me falou o motivo!!!")
            .then(m => m.delete(5000));

        //Sem permissão
        if(!message.member.hasPermission("KICK_MEMBERS"))
            return message.reply(`❌ Você não tem permissão pra isso, fale com um staff ou user o ${prefix}report!`)
            .then(m => m.delete(6000));
        

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        //Membro não encontrado
        if(!toKick)
            return message.reply("Não achei o bagunceiro, será que ele se escondeu? 👀")
                .then(m => m.delete(5000));

        //Não pode se kickar
        if(message.author.id === toKick.id)
            return message.reply("Não quero te expulsar! 😔")
                .then(m => m.delete(5000));

        //Kickar ADM
        if(!toKick.kickable)
            return message.reply("Eu não posso expulsar meu chefe!!!")
                .then(m => m.delete(5000));

        const kickEmbed = new RichEmbed()
            .setColor('#ff0000')
            .setThumbnail(toKick.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents `**> Usuário punido:** ${toKick} (${toKick.id})
            **> Punido por:** ${message.author} (${message.author.id})
            **> Motivo:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new RichEmbed()
            .setColor('GREEN')
            .setAuthor("Essa verificação será inválida após 30 segundos")
            .setDescription(`Você quer expulsar ${toKick}?`);

        message.channel.send(promptEmbed).then(async msg =>{
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"])

            if(emoji === "✅"){
                message.delete();

                toKick.kick(args.slice(1).join(" "))
                    .catch(err =>{
                        if(error)
                            return message.channel.send("Algum bug atrapalhou tudo!");
                    });

                    logChannel.send(kickEmbed);
            }else if(emoji === "❌"){
                msg.delete();

                message.reply("Expulsão cancelada, ufa!")
                    .then(m => m.delete(5000));
            }
        });

    }}
