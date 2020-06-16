const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { promptMessage } = require('../../functions.js');

module.exports = {
    name: "ban",
    aliases: ["banir"],
    category: "moderation",
    description: "Bane um usuário pra sempre do servidor!",
    example: "-ban @Bagunceiro",
    run: async(bot, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

        if (message.deletable) message.delete();

        //Não mencionou
        if (!args[0])
            return message.reply("Você não me falou quem é o bagunceiro! 👀")
                .then(m => m.delete(5000));

        //Sem motivo
        if (!args[1])
            return message.reply("Você não me falou o motivo!!!")
                .then(m => m.delete(5000));

        //Sem permissão
        if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.reply(`❌ Você não tem permissão pra isso, fale com um staff ou user o ${prefix}report!`)
                .then(m => m.delete(6000));


        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        //Membro não encontrado
        if (!toBan)
            return message.reply("Não achei o bagunceiro, será que ele se escondeu? 👀")
                .then(m => m.delete(5000));

        //Não pode se banir
        if (message.author.id === toBan.id)
            return message.reply("Não quero te banir! 😔")
                .then(m => m.delete(5000));

        //Banir ADM
        if (!toBan.bannable)
            return message.reply("Eu não posso banir meu chefe!!!")
                .then(m => m.delete(5000));

        /*if (toBan.banable && message.member.hasPermission("BAN_MEMBERS") && !message.author.id === toBan.id)
            return message.channel.send(banEmbed)*/

        const banEmbed = new RichEmbed()
            .setColor('#ff0000')
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents `**> Usuário banido:** ${toBan} (${toBan.id})
            **> Banido por:** ${message.author} (${message.author.id})
            **> Motivo:** ${args.slice(1).join(" ")}`);
        return channel.send(reportEmbed);

        const promptEmbed = new RichEmbed()
            .setColor('GREEN')
            .setAuthor("Essa verificação será inválida após 30 segundos")
            .setDescription(`Você quer banir ${toBan}?`);

        message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"])

            if (emoji === "✅") {
                message.delete();

                toBan.ban(args.slice(1).join(" "))
                    .catch(err => {
                        if (error)
                            return message.channel.send("Algum bug atrapalhou tudo!");
                    });

                logChannel.send(banEmbed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply("Banimento cancelado, ufa!")
                    .then(m => m.delete(5000));
            }
        });

    }
}