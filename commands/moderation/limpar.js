module.exports = {
    name: "limpar",
    category: "moderation",
    description: "Limpa mensagens do chat",
    run: async(bot, message, args) => {
        
        if(args[1]){

            //let msgNumber = args.slice(1).values;

            message.channel.bulkDelete(args[1]);
            message.channel.bulkDelete(1);
            
        }else{
            
            return message.reply("Você não falou quantas mensagens eu tenho que apagar =P")         

        }
        
    }}
