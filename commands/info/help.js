const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "help",
    aliases: ["ajuda, h, commands, comandos"],
    category: "info",
    description: "Mostra todos os comandos ou um comando específico",
    usage: "[command | alias",
    run: async(bot, message, args) => {



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
            .map((cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)})`)
            .reduce((string, category) => string + "\n" + category));

        return message.channel.send(getEmbed.setDescription(info));
    }

