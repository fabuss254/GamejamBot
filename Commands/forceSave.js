// Global Variables
var Command = {};
const {PermissionsBitField} = require("discord.js");

// Variables
Command.Name = "ForceSave";
Command.Permission = PermissionsBitField.Flags.Administrator;

Command.Alias = ["forcesave", "fsave"];

// Function
Command.Execute = function(Main, msg){
    Main.Functions.Save();
    msg.channel.send("Force saved !")
}

// Export
module.exports = Command;