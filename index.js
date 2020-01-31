const {Client, RichEmbed, Collection} = require('discord.js');
const Discord = require('discord.js');
//const ffmpeg = require('ffmpeg-extra')
const bot = new Discord.Client();
const client = new Discord.Client();
const token = process.env.KEY_TOKEN;
const fs = require('fs');

bot.commands = new Collection();
bot.aliases = new Collection();
bot.example = new Collection();

bot.categories = new fs.readdirSync("./commands/");

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

    let prefix = "-";

    /*
    let prefixes = JSON.parse(fs.readFileSync('./prefixes.json', 'utf8'));

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        }
    }

    let prefix = prefixes[message.guild.id].prefixes;
    */

	//let args = message.content.substring(prefix.length).split(" ");
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.member) message.member = await message.guild.fetchMember(message);
	
    if (cmd.length ===0) return;
    

	let command = bot.commands.get(cmd);
	if(!command) command = bot.commands.get(bot.aliases.get(cmd));

	if (command)
		command.run(bot, message, args);

    var d = new Date,
    dformat = [d.getMonth()+1,
       d.getDate(),
       d.getFullYear()].join('/')+' '+
      [d.getHours(),
       d.getMinutes(),
       d.getSeconds()].join(':');

    //=================================SOWZX==============================

    if(message.content('sowzx'/* || 'Sowzx' || '@sowzx' || '@Sowzx'*/)){
        message.reply("Não fala do Sowzx, eca! Ele é muito estranho :c");
    }

})

bot.login(token);
