/*

CANAL DE CONFIG DO BOT

*/

const { RichEmbed } = require('discord.js');
const { stripIndents} = require("common-tags");

module.exports = {
    name: "config",
    category: "moderation",
    description: "Minha configuração ^-^",
    example: "-config",
    run: async(bot, message, args) => {

        message.channel.send("Meu bot minhas regras!")

    }
}