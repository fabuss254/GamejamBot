module.exports = (Main) => {
    return async () => {
        let TeamChannel = await Main.Bot.channels.fetch("999419578822164500");
        let SoloMessage = await TeamChannel.messages.fetch("999428296850808832");
        let TeamMessage = await TeamChannel.messages.fetch("999428314064224377");

        let Data = Main.Data;
        let Solos = [];
        let Teams = {};
        for (let UserId in Data) {
            let Tbl = Data[UserId];

            if (Tbl.TeamName == undefined && Tbl.Leader == undefined) {
                Solos.push(UserId);
                continue;
            }

            let TeamName = Tbl.TeamName;
            if (Tbl.Leader != undefined) {
                TeamName = Data[Tbl.Leader].TeamName;
            }

            if (Teams[TeamName] == undefined) Teams[TeamName] = {Members : []};
            Teams[TeamName].Members.push(UserId);
            Teams[TeamName].Leader = Tbl.Leader || UserId;
        }

        let SolosText = "> __**SOLO**__\n\n";
        let TeamsText = "> __**TEAMS**__\n\n";

        let soloMore = 0
        for (let UserId of Solos) {
            if (SolosText.length > 1930) {soloMore++; continue;}
            let User = await Main.Bot.users.fetch(UserId);
            SolosText = SolosText + User.username + " - <@" + UserId + "> \n";
        }

        let TeamMore = 0
        for (let TeamName in Teams) {
            if (TeamsText.length > 1900) {TeamMore++; continue;}
            let Tbl = Teams[TeamName];

            let UserText = "";
            UserText = UserText + "<@" + Tbl.Leader + ">";
            for (let UserId of Tbl.Members) {
                if (UserId == Tbl.Leader) continue;

                UserText = UserText + " <@" + UserId + ">";
            }

            TeamsText = TeamsText + TeamName + " - " + UserText + "\n";
        }

        if (soloMore != 0){
            SolosText = SolosText + "*and **" + soloMore + "** more...*"
        }

        if (TeamMore != 0){
            TeamsText = TeamsText + "*and **" + TeamMore + "** more...*"
        }

        SoloMessage.edit(SolosText);
        TeamMessage.edit(".\n\n" + TeamsText);
    }
};
