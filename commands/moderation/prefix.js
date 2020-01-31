const { RichEmbed } = require('discord.js');

module.exports = {
    name: "prefix",
    category: "moderation",
    description: "Altera o prefix da Yoko",
    example: "-prefix !",
    run: async(bot, message, args) => {

            prefixes[message.guild.id] = {
            prefixes: args[0]};

        if(message.deletable) message.delete();

        if(!message.member.hasPermission("MANAGE_SERVER")){
            return message.reply("Calma lá meu parceiro, tu não pode mexer nisso não!")
            .then(m => m.delete(5000));
        }else{
            if(!args[0] || args[0] == "ajuda" || args[0] == "help"){

                message.reply("Você precisa definir outro prefix 😝")
                .then(m => m.delete(5000));

            }else{
                message.channel.send(prefixEmbed)
            }
        }

        fs.writeFile('./prefixes.jason', JSON.stringify(prefixes)), err =>{
            if(err)
                console.log(err)
        }

        let prefixEmbed = new RichEmbed()
        .setColor("#FF9900")
        .setTitle("Prefixo alterado!")
        .setDescription(`Prefixo mudado para ${args[0]}`);
    }   
}
