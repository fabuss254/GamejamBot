// Global Variables
var Command = {};

// Variables
Command.Name = "Teamleave";

Command.Alias = ["teamleave"];

// Function
Command.Execute = function(Main, msg){
    if (Main.Data[msg.author.id] == undefined) return msg.channel.send("You're not participating in the gamejam yet !\n use ``-participate`` to participate now !");
    if (Main.Data[msg.author.id].TeamName != undefined) return msg.channel.send("You cannot leave your own team, but you can disband it using ``-teamdisband`` (WARNING: it will kick all current members of your team).");
    if (Main.Data[msg.author.id].Leader == undefined) return msg.channel.send("You're not in a team yet !");

    let TeamName = Main.Data[Main.Data[msg.author.id].Leader].TeamName
    let Team = Main.Functions.GetTeam(TeamName)
    if (Team.length <= 2) {
        delete Main.Data[Main.Data[msg.author.id].Leader].TeamName;
    }
    delete Main.Data[msg.author.id].Leader;

    Main.Functions.Save();
    Main.Functions.ReloadTeams();

    return msg.channel.send(`**${msg.member.user.tag} has left ${TeamName}.**` + (Team.length == 2 ? " The team has been disbanded has it now only contain one member." : ""));
}

// Export
module.exports = Command;