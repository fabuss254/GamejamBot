// Global Variables
var Command = {};

// Variables
Command.Name = "TeamInfo";

Command.Alias = ["teaminfo"];

// Function
Command.Execute = function(Main, msg){
    let Team = msg.content.substring(10)
    if (Team == ''){
        Team = Main.Data[msg.author.id] && (Main.Data[msg.author.id].TeamName || (Main.Data[msg.author.id].Leader && Main.Data[Main.Data[msg.author.id].Leader].TeamName));
    }

    if (Team == undefined){
        return msg.channel.send("No team found.");
    }

    msg.channel.send(Main.Functions.GetTeamInfos(Team));
}

// Export
module.exports = Command;