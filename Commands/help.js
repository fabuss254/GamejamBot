// Global Variables
var Command = {};

// Variables
Command.Name = "Help";

Command.Alias = ["help", "h"];

// Function
Command.Execute = function(Main, msg){
    msg.channel.send("You can view the whole list of commands inside <#999048238122414091>");
}

// Export
module.exports = Command;