// Global Variables
var Command = {};

// Variables
Command.Name = "GetInfo";

Command.Alias = ["getinfo"];

// Function
Command.Execute = function(Main, msg){
    msg.channel.send(Main.Functions.GetInfos(msg.member.user));
}

// Export
module.exports = Command;