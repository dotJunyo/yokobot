const Discord = require('discord.js');

const bot = new Discord.Client();

const token = process.env.KEY_TOKEN;

bot.on('ready', () =>{
    
    console.log("");
    console.log("=============================================");
    console.log("Estou acordada! Que horas são agora mesmo? -;");
    console.log("=============================================");
    console.log("");
    bot.user.setActivity("meu criador na lixeira!");

});

bot.on('reconnecting', () =>{
    
    console.log("");
    console.log("=============================================");
    console.log("Tentando falar com o Discord!");
    console.log("=============================================");
    console.log("");

});

bot.on('disconnect', () =>{
    
    console.log("");
    console.log("=============================================");
    console.log("Vou ir dormir, hoje foi um dia cheio!");
    console.log("=============================================");
    console.log("");

});

bot.on('error', () =>{

    console.log("");
    console.log("=============================================");
    console.log("Opa, alguém derramou café no meu computador! :^");
    console.log("=============================================");
    console.log("");

})


bot.on ('message', message => {

    const botUser = bot.fetchUser(665812863234998283);
    var prefix = "-";
    let args = message.content.substring(prefix.length).split(" ");

    var d = new Date,
dformat = [d.getMonth()+1,
       d.getDate(),
       d.getFullYear()].join('/')+' '+
      [d.getHours(),
       d.getMinutes(),
       d.getSeconds()].join(':');

    switch(args[0]){

        //=========Autor=========
        case 'autor':
            message.channel.send('Fui criada por dotJunyo!');
            break;

        //========Limpar=========
        case 'limpar':

            if(!args[1]){
                return message.reply("Você não falou quantas mensagens eu tenho que apagar =P")
                
            }else{
                
                //let msgNumber = args.slice(1).values;

                message.channel.bulkDelete(args[1]);
                message.channel.bulkDelete(1);
            }
            break;

        //INCOMPLETO ========Avatar========
        case 'avatar':
            if(!args[1]){                 
                const avatarEmbed = new Discord.RichEmbed()
                .setColor('#275BF0')
                .setTitle(message.author.username +", que foto linda ^^")
                .setImage(message.author.avatarURL);
                message.channel.send(avatarEmbed);
            }else{

                var mentioned = message.mentions.users.first();

                const avatarEmbed = new Discord.RichEmbed()
                .setColor('#275BF0')
                .setTitle(`Foto de ${mentioned.username}`)
                .setImage(mentioned.avatarURL);
                message.channel.send(avatarEmbed);
                
            }
            break;
        
        case 'dormir':
            message.channel.send("Posso dormir finalmente \o/");
            bot.off();
            break;

        case 'uptime':
            
            let segundosTotais = Math.floor((bot.uptime / 1000));
            let dias = Math.floor(segundosTotais / 86400);
            let horas = Math.floor(segundosTotais / 3600);
            segundosTotais %= 3600;
            let minutos = Math.floor(segundosTotais / 60);
            let segundos = segundosTotais % 60;

            let tempoOnline = `Eu tô acordada a ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos ^-^`;

            var tempoOn = "Tô meio dormindo ainda k";


            while(bot.on){
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
            }}

            const semDormir = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField(dias, " dias")
            .addField(horas, " horas")
            .addField(minutos, " minutos")
            .addField(segundos, " segundos")
            .setColor('#00ffff')
            .setFooter("tempoON")
            .setTitle("Quanto tempo eu estou sem dormir")
            .setThumbnail(message.author.avatarURL);

            message.channel.send(semDormir);       
            break;

        case 'kick':
            
            let membro = message.mentions.members.first();
            membro.kick();
            break;

        case 'info':
            
        if(!args[1]){

            message.reply("Você não me disse quem você quer pesquisar =P");

        }else{

            const date = usuarioMencionado.createdAt;
            const newDate = date.toLocaleDateString();

            const usuarioMencionado = message.mentions.users.first() || message.author;
            const membroMencionado = message.mentions.members.first() || message.member;

            let userinfo = {};
            userinfo.bot = usuarioMencionado.bot;
            userinfo.contaDia = newDate;
            userinfo.tag = usuarioMencionado.discriminator;
            userinfo.id = usuarioMencionado.id;
            userinfo.a2f = usuarioMencionado.mfaEnabled;
            userinfo.nitro = usuarioMencionado.premium;
            userinfo.presen = usuarioMencionado.presence;
            userinfo.discordTag = usuarioMencionado.tag;
            userinfo.nome = usuarioMencionado.username;
            userinfo.verificado = usuarioMencionado.verified;

            userinfo.avatar = usuarioMencionado.avatarURL;

            const usuarioInfo = new Discord.RichEmbed()
            .setAuthor(userinfo.nome, userinfo.avatar)
            .addField("É um robô?",userinfo.bot, true)
            .addField("Criou sua conta dia",userinfo.contaDia, true)
            .addField("ID (Só ignora k)",userinfo.id, true)
            .addField("Autênticação de 2 fatores?",userinfo.a2f, true)
            .addField("Tem nitro? (Só rico tem =P)",userinfo.nitro, true)
            .addField("Presença",userinfo.presen, true)
            .addField("DiscordTag",userinfo.discordTag, true)
            .addField("Nome",userinfo.nome, true)
            .addField("Verificado?",userinfo.verificado, true)
            .setColor('#00ffff')
            .setFooter('Acho que isso é tudo ^^')
            .setTitle("O que eu sei dessa pessoa...")
            .setThumbnail(userinfo.avatar);
            message.channel.send(usuarioInfo);
            

        }
    
    }

    //==========================================FUNÇÕES=========================================

})


bot.login(token);
