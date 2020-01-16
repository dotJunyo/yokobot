module.exports = {
    name: "info",
    category: "info",
    description: "Mostra informações de algum usuário",
    run: async(bot, message, args) => {

        if(!args[1]){

            message.reply("Você não me disse quem você quer pesquisar =P");

        }else{
            
            const dataU = message.mentions.users.first();
            const date = dataU.createdAt;
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

    }}}
