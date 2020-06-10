module.exports = {
    name: "limpar",
    aliases: ["clear"],
    category: "moderation",
    description: "Limpa mensagens do chat",
    example: "-limpar 10",
    run: async(bot, message, args) => {

        if (args[0]) {
            var l = parseInt(args[0]);
            message.delete();
            message.channel
                .bulkDelete(l)
                .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
                .catch(console.error);
            message.reply("Ufa! Limpar cansa um pouquinho 😅")
                .then(m => m.delete(5000));
        } else {

            return message.reply("Você não falou quantas mensagens eu tenho que apagar =P")
                .then(m => m.delete(5000))

        }

    }
}