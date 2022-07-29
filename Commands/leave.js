// Global Variables
var Command = {};

// Variables
Command.Name = "Leave";

Command.Alias = ["leave"];

// Function
Command.Execute = function(Main, msg){
    if (!Main.Data[msg.author.id]) {
        msg.channel.send("You aren't participating !");
        return;
    }

    if (Main.Data[msg.author.id].Leader != undefined){
        Team = Main.Functions.GetTeam(Main.Data[Main.Data[msg.author.id].Leader].TeamName);
        if (Team.length == 2) {
            delete Main.Data[Main.Data[msg.author.id].Leader].TeamName;
        }
    }else if(Main.Data[msg.author.id].TeamName != undefined){
        Team = Main.Functions.GetTeam(Main.Data[msg.author.id].TeamName);
        for (let UserId of Team) {
            delete Main.Data[UserId].Leader;
        }
    }

    delete Main.Data[msg.author.id];
    Main.Functions.Save();
    Main.Functions.ReloadTeams();
    msg.member.roles.remove("998991783751069696", "User left the gamejam");

    msg.channel.send("You left the gamejam event !");
}

// Export
module.exports = Command;