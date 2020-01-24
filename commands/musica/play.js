const { RichEmbed } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
    name: "play",
    aliases: ["tocar"],
    category: "musica",
    description: "Eu vou cantar uma música pra você ^^",
    example: "-play All Star",
    run: async(bot, message, args) => {

        const channel = message.member.voiceChannel;

        if(message.member.voiceChannel){
            channel.joinChannel()
            .then(message.reply("Entrei!"))
            .then(m => m.delete(5000));;
        }else{
            message.reply("Você precisa estar em um canal de voz pra me ouvir 😝")
        }


    }}
