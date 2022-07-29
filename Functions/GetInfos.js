const Discord = require("discord.js");

module.exports = (Main) => {
    return (User) => {
        if (!Main.Data[User.id]) {
            return `User ${User.tag} isn't participating in the gamejam.`;
        }
    
        let Description = "User is solo.";
        if (Main.Data[User.id].Leader) {
            Description = `User is member of team '${Main.Data[Main.Data[User.id].Leader].TeamName}'`;
        }else if(Main.Data[User.id].TeamName) {
            Description = `User is leader of team '${Main.Data[User.id].TeamName}'`;
        }
        return {embeds: [
            new Discord.EmbedBuilder()
                .setColor('#ffffff')
                .setTitle(User.tag)
                .setDescription(Description)
            ]
        }
    }
};