// Global Variables
var Command = {};
const {PermissionsBitField} = require("discord.js");

// Variables
Command.Name = "reloadTeams";
Command.Permission = PermissionsBitField.Flags.Administrator;

Command.Alias = ["reloadteams", "reloadt", "rteams"];

// Function
Command.Execute = function(Main, msg){
    Main.Functions.ReloadTeams();

    msg.channel.send("Reloaded teams !");
}

// Export
module.exports = Command;