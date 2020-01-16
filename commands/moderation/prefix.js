module.exports = {
    name: "prefix",
    category: "moderation",
    description: "Altera o prefix da Yoko",
    example: "-prefix !",
    run: async(bot, message, args) => {
        if(message.deletable) message.delete();

        if(!args[1]){

            message.reply("Você precisa definir outro prefix ;P")

        }else{

            var prefix = args[1];
            message.channel.send("Prefix mudado para: " + prefix);

    }}}
