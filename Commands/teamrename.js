// Global Variables
var Command = {};

// Variables
Command.Name = "TeamRename";

Command.Alias = ["teamrename"];

// Function
Command.Execute = function(Main, msg){
    if (Main.Data[msg.author.id] == undefined) return msg.channel.send("You're not participating in the gamejam yet !\n use ``-participate`` to participate now !");
    if (Main.Data[msg.author.id].Leader != undefined) return msg.channel.send("You're not the leader of your current team. only the leader can rename the team !");
    if (Main.Data[msg.author.id].TeamName == undefined) return msg.channel.send("You're not the leader of any team, you can create one by inviting someone with ``-teaminvite @mention``.");

    let TeamName = msg.content.substring(12);
    if (TeamName.length < 3 || TeamName.length > 30) return msg.channel.send("Your new team name should be 3 to 30 character long.");
    if (!/^[a-zA-Z0-9 ]+$/.test(TeamName)) return msg.channel.send("Team name must only contain letters and numbers");

    let Team = Main.Functions.GetTeam(TeamName);
    if (Team != undefined) return msg.channel.send("Another team named similarly already exist.");

    Main.Data[msg.author.id].TeamName = TeamName
    Main.Functions.Save();
    Main.Functions.ReloadTeams();

    return msg.channel.send("**Team renamed !**");
}

// Export
module.exports = Command;