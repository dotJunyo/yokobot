module.exports = {
    name: "prefix",
    category: "moderation",
    description: "Altera o prefix da Yoko",
    example: "-prefix !",
    run: async(bot, message, args) => {
        import { prefix } from './indes.js'

        if(message.deletable) message.delete();

        let novoPrefix = message.content.replace('-prefix ', '')

        if(!args[0]){

            message.reply("Você precisa definir outro prefix ;P")

        }else{
            prefix = novoPrefix;
            message.channel.send("Prefix mudado para: " + novoPrefix);

    }}}
