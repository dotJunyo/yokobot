const { RichEmbed } = require('discord.js');
const { stripIndents} = require("common-tags");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Eu falo com o ADM quem é o cara mal >:D",
    example: "-report @Junyo Flood",
    usage: ("<mention | id>"),
    run: async(bot, message, args) => {

        if(message.deletable) message.delete();

        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

        if(!rMember)
            return message.reply("Não conseguir achar o meliante 😠").then(m => m.delete(5000))

        if(rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.reply("Não vou reportar essa pessoa! 🤐").then(m => m.delete(5000))
        

// COLOCAR OUTROS NOMES NO CANAL DE REPORT ----- CANAL DE CONFIG DO BOT
        if(!args[1])
            return message.channel.send("Você não me disse o motivo do reporte =P").then(m => m.delete(5000))

        const channel = message.guild.channels.find(channel => channel.name === "reportes");

        if(!channel) // message.delete(); ---- DELETAR MENSAGEM DE USUÁRIO -- BUG

            return message.channel.send("Eu envio esse report pra onde??? Não achei o canal \`#reportes\`").then(m => m.delete(5000))

        const reportEmbed = new RichEmbed()
        .setColor("#ff0000")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL)
        .setAuthor("Usuário reportado", rMember.user.displayAvatarURL)
        .setDescription(stripIndents `**> Usuário:** ${rMember} (${rMember.id})
        **> Reportado por:** ${message.member} (${message.member.id})
        **> Reportado em:** ${message.channel}
        **> Motivo:** ${args.slice(1).join(" ")}`)

        return channel.send(reportEmbed);
        
    }}
