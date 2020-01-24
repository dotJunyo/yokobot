const { RichEmbed } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
    name: "play",
    aliases: ["tocar"],
    category: "musica",
    description: "Eu vou cantar uma música pra você ^^",
    example: "-play All Star",
    run: async(bot, message, args) => {

        if(message.member.voiceChannel){

        }else{
            message.reply("Você precisa estar em um canal de voz pra me ouvir 😝")
        }


    }}
