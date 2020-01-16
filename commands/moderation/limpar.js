module.exports = {
    name: "limpar",
    category: "moderation",
    description: "Limpa mensagens do chat",
    run: async(bot, message, args) => {
        if(message.deletable) message.delete();
        
        if(args[1]){

            //let msgNumber = args.slice(1).values;

            message.channel.bulkDelete(args[1]);
            
        }else{
            
            return message.reply("Você não falou quantas mensagens eu tenho que apagar =P")         

        }
        
    }}
