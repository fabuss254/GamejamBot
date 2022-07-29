// Global Variables
var Command = {};

// Variables
Command.Name = "Participate";

Command.Alias = ["participate"];

// Function
Command.Execute = function(Main, msg){
    if (Main.Data[msg.author.id]) return msg.channel.send("You're already participating !");
    if (!msg.member.roles.resolve("998993662472114196")) return msg.channel.send("You must be verified to enter the gamejam: <#999357125186834462> (if you don't get the verify role, try /getrole)")

    Main.Data[msg.author.id] = {}
    Main.Functions.Save();
    Main.Functions.ReloadTeams();
    msg.member.roles.add("998991783751069696", "User joined the gamejam");

    msg.channel.send("You're now participating !");
}

// Export
module.exports = Command;