const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "help",
    aliases: ["ajuda, h, commands, comandos"],
    category: "info",
    description: "Mostra todos os comandos ou um comando específico",
    usage: "[command | alias",
    run: async(bot, message, args) => {

        if(args[0]){
            return getCMD(bot, message, args[0]);
        }else{
            return getAll(bot, message);
        }


    }
}

function getAll(bot, message){
        
    const getEmbed = new RichEmbed()
    .setColor("RANDOM")

    const commands = (category) => {
        return bot.commands
        .filter(cmd => cmd.category === category)
        .map(cmd => `- \`${cmd.name}\``)
        .join("\n");
    }

    const info = bot.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

        return message.channel.send(getEmbed.setDescription(info));
}

function getCMD(bot, message, input){
    const cmdEmbed = new RichEmbed();

    const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));

    let info = `Não sei nada sobre esse comando 😔 **${input.toLowerCase()}**`;

    if(!cmd)
        return message.channel.send(cmdEmbed.setColor("RED").setDescription(info));

    if(cmd.name) info = `**Comando**: ${cmd.name}`;
    if(cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}`).join(", ")}`;
    if(cmd.description) info += `\n**Descrição**: ${cmd.description}`;
    if(cmd.usage){
        info += `\n**Usa**: ${cmd.usage}`;
        cmdEmbed.setFooter(`Sintaxe: <> = requer, [] = opcional`);
    }

    return message.channel.send(cmdEmbed.setColor("GREEN").setDescription(info));

}

