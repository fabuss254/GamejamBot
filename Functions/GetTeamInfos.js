const Discord = require("discord.js");

module.exports = (Main) => {
    return (TeamName) => {
        let Team = Main.Functions.GetTeam(TeamName);
        if (Team == undefined) {
            return "No team found.";
        }

        let Description = "Leader : <@" + Team[0] + ">\nMembers :";
        for (let Id in Team) {
            let UserId = Team[Id]

            if (Id == 0) continue;
            Description = Description + "\n> <@" + UserId + ">"; 
        }

        return {embeds: [
                new Discord.EmbedBuilder()
                .setColor('#ffffff')
                .setTitle("Team " + TeamName)
                .setDescription(Description)
            ]
        }
    }
};