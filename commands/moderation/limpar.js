module.exports = {
    name: "limpar",
    category: "moderation",
    description: "Limpa mensagens do chat",
    run: async(bot, message, args) => {

        if(args[0]){
            if(message.deletable) message.delete();

            message.channel.bulkDelete(args.slice(1).values);
            
        }else{
            
            return message.reply("Você não falou quantas mensagens eu tenho que apagar =P")
                .then(m => m.delete(5000))     

        }
        
    }}
