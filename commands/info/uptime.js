const { RichEmbed } = require('discord.js');
const {stripIndents } = require('common-tags');

module.exports = {
    name: "uptime",
    category: "info",
    description: "Mostra a quanto tempo eu estou sem dormir!",
    run: async(bot, message, args) => {
        if(message.deletable) message.delete();

        let segundosTotais = Math.floor((bot.uptime / 1000));
        let dias = Math.floor(segundosTotais / 86400);
        let horas = Math.floor(segundosTotais / 3600);
        segundosTotais %= 3600;
        let minutos = Math.floor(segundosTotais / 60);
        let segundos = segundosTotais % 60;

        let tempoOnline = `Eu tô acordada a ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos ^-^`;

        var tempoOn = "Tô meio dormindo ainda k";



        if(minutos <= 10){
            tempoOn = "Acordei agorinha =P";
        }else if(horas <= 12){
            tempoOn = "Tá na hora de ir dormir já k"
        }else if(dias <= 1){
            tempoOn = "Alguém me deixa dormir pfv ;-;"
        }else if(dias <= 7){
            tempoOn = "Daqui a pouco já vai fazer uma semana, é sério, deixa eu dormir..."
        }else{
            tempoOn = "Virei sócia da RedBull, não preciso dormir mais \o/"
        }

        const semDormir = new RichEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .addField(stripIndents`**> Dias:** ${dias}
        **> Horas:** ${horas}
        **> Minutos:** ${minutos}
        **> Segundos:** ${segundos}`, true)
        .setColor('#00ffff')
        .setFooter(tempoON.toString())
        .setTitle("Quanto tempo eu estou sem dormir")
        .setThumbnail(bot.user.avatarURL);

        message.channel.send(semDormir);  

    }}


