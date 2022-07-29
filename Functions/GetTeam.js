const Discord = require("discord.js");

module.exports = (Main) => {
    return (TeamName) => {
        let TeamLeader
        for (let UserId in Main.Data){
            let Tbl = Main.Data[UserId];

            if (Tbl.TeamName == TeamName) {
                TeamLeader = UserId;
                break;
            }
        }

        if (TeamLeader == undefined) return;

        let Members = [];
        for (let UserId in Main.Data){
            let Tbl = Main.Data[UserId];

            if (Tbl.Leader == TeamLeader) {
                Members.push(UserId);
            }
        }

        let Team = [TeamLeader];
        for (let UserId in Members) {
            Team.push(Members[UserId]);
        }

        return Team;
    }
};