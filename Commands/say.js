// Global Variables
var Command = {};
const {PermissionsBitField} = require("discord.js");

// Variables
Command.Name = "Say";
Command.Description = "Say something.";

Command.Permission = PermissionsBitField.Flags.Administrator;
Command.Alias = ["say", "s"];

// Function
Command.Execute = function(Main, msg){
    msg.channel.send(msg.content.substring(msg.content.split(" ")[0].length));
}

// Export
module.exports = Command;