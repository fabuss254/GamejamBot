// Global Variables
var Command = {};

// Variables
Command.Name = "Submit";

Command.Alias = ["submit"];

// Function
Command.Execute = function(Main, msg){
    if (Main.Data[msg.author.id] == undefined) return msg.channel.send("You're not participating in the gamejam yet !\n use ``-participate`` to participate now !");
    if (Main.Data[msg.author.id].Leader != undefined) return msg.channel.send("You're not the leader of your current team. only the leader can submit the game !");

    let Submitted = msg.content.substring(8).replaceAll("`", "");
    if (msg.mentions.members.size > 0 || msg.mentions.everyone) return msg.channel.send("Submission cannot contain mentions.");
    if (Submitted == undefined || Submitted == "") return msg.channel.send("Submission is invalid.");
    if (Submitted.length > 500) return msg.channel.send("Submission too long. (500 char limit)");

    Main.Data[msg.author.id].Submission = Submitted
    Main.Functions.Save();

    return msg.channel.send("**Game submitted!** you can change it at any time by re-using this command!");
}

// Export
module.exports = Command;
