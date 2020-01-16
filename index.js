const {Client, RichEmbed, Collection} = require('discord.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.KEY_TOKEN;
const fs = require('fs');

bot.commands = new Collection();
bot.aliases = new Collection();

["commands"].forEach(handler =>{
	require(`./handler/${handler}`)(bot);
})

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

bot.on ('message', async message => {

    var prefix = "-";
	//let args = message.content.substring(prefix.length).split(" ");
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.member) message.member = await message.guild.fetchMember(message);
	
	if (cmd.length ===0) return;

	let command = bot.commands.get(cmd);
	if(!command) command = bot.commands.get(client.aliases.get(cmd));

	if (command)
		command.run(bot, message, args);

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
            bot.commands.get('autor').execute(message, args);
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

        //=========Avatar========
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

            let tempoOn = "Tô meio dormindo ainda k";


            
            /*if(minutos <= 10){
                tempoOn = "Acordei agorinha =P";
            }else if(horas <= 12){
                tempoOn = "Tá na hora de ir dormir já k"
            }else if(dias <= 1){
                tempoOn = "Alguém me deixa dormir pfv ;-;"
            }else if(dias <= 7){
                tempoOn = "Daqui a pouco já vai fazer uma semana, é sério, deixa eu dormir..."
            }else{
                tempoOn = "Virei sócia da RedBull, não preciso dormir mais \o/"
            }*/

            const semDormir = new Discord.RichEmbed()
            .setAuthor(bot.user.username, bot.user.avatarURL)
            .addField(dias, " dias")
            .addField(horas, " horas")
            .addField(minutos, " minutos")
            .addField(segundos, " segundos")
            .setColor('#00ffff')
            .setFooter("tempoON")
            .setTitle("Quanto tempo eu estou sem dormir")
            .setThumbnail(bot.user.avatarURL);

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

        }
    
        //==========PREFIX=========
        /*case 'prefix':
            if(!args[1]){

                message.reply("Você precisa definir outro prefix ;P")

            }else{

                var prefix = args[1];
                message.channel.send("Prefix mudado para: " + prefix);
            }*/

    }

    //==========================================FUNÇÕES=========================================

})

//===========================================================================================================
//=============================================MUSIC=========================================================
//===========================================================================================================

/*const queue = new Map();
const ytdl = require('ytdl-core');

bot.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const serverQueue = queue.get(message.guild.id);

	if (message.content.startsWith(`${prefix}play`)) {
		execute(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}pular`)) {
		skip(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}parar`)) {
		stop(message, serverQueue);
		return;
	} else {
		message.channel.send('Não entendi o que você quer! :c')
	}
});

async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('Você tem que estar em uma call pra poder me ouvir cantando!');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('Você não me deu permissão pra entrar no canal e cantar!!!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title} foi adicionado à fila!`);
	}

}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('Você nem tá me ouvindo, não pode pular a música >:(');
	if (!serverQueue) return message.channel.send('Meu chefe gosta dessa música, não vou parar de cantar!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('Você nem tá me ouvindo, não pode pular a música >:(!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Tá bom, eu paro de cantar...');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}*/

//===========================================================================================================



/*const GOOGLE_API_KEY = require('./config');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const fs = require('fs');

const client = new Client({ disableEveryone: true });

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

bot.on('message', msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)


    if(command == 'test'){
        msg.channel.send("Te ouvi!");
    }

	if (command === 'play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`I set the volume to: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Resumed the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}



/*const ytdl = require('ytdl-core');

const client = new Discord.Client();

const queue = new Map();


bot.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const serverQueue = queue.get(message.guild.id);

	if (message.content.startsWith(`${prefix}play`)) {
		execute(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}skip`)) {
		skip(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}stop`)) {
		stop(message, serverQueue);
		return;
	} else {
		message.channel.send('You need to enter a valid command!')
	}
});

async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title} has been added to the queue!`);
	}

}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}*/




bot.login(token);
