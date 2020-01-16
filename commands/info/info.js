const { getMember, formatDate } = require("../../functions.js");
const { RichEmbed } =require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "info",
    aliases: ["user", "userinfo", "who", "informação", "whois"],
    category: "info",
    description: "Mostra informações de algum usuário",
    usage: "[username | id, | mentions",
    run: async(bot, message, args) => {
        if(message.deletable) message.delete();

        const member = getMember(message, args.join(" "));


        //Variação de membros
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", " || "none");

        //Variação de Usuários
        const created = formatDate(member.user.createdAt);
        
        const infoEmbed = new RichEmbed()

        .setFooter(member.displayName, member.user.displayAvatarURL)
        .setThumbnail(member.user.displayAvatarURL)
        .setColor("#00ffff")

        .addField('Informação do membro', stripIndents`**> Display Name:** ${member.displayName}
            **> Entrou em:** ${joined}
            **> Cargos:** ${roles}`, true)

        .addField('Informação de usuário', stripIndents`**> ID:** ${member.user.id}
            **> Username:** ${member.user.username}
            **> Discord Tag:** ${member.user.tag}
            **> Criado em:** ${created}`, true)

        .setTimestamp()

        if(member.user.presence.game)
            infoEmbed.addField('Jogando atualmente', `**> ${member.user.presence.game.name}** `)

        message.channel.send(infoEmbed);

        }
}
