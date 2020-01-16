module.exports = {
    getMember: function(message, toFind = ''){

        toFind = toFind.toLowerCase();

        let target = message.guild.members.get(toFind);

        if(!target && message.mentions.member)
            target = message.mentions.members.first();

        if(!target && toFind){
            
            target = message.guild.members.find(member =>{
                return member.displayName.toLowerCase().include(toFind) ||
                member.user.tag.toLowerCase().include(toFind);
            });
        }

        if(!target)
            target = message.member;

        return target;
    },


    formatDate: function(date){

        return new Intl.DateTimeFormat('pt-BR').format(date);

    }

}