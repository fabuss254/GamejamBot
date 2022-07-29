// Global Variables
var Command = {};

// Variables
Command.Name = "ClearSubmission";

Command.Alias = ["clearsubmission"];

// Function
Command.Execute = function(Main, msg){
    if (Main.Data[msg.author.id] == undefined) return msg.channel.send("You're not participating in the gamejam yet !\n use ``-participate`` to participate now !");
    if (Main.Data[msg.author.id].Leader != undefined) return msg.channel.send("You're not the leader of your current team. only the leader can clear the submission!");
    
    let UserId = msg.author.id;
    if (Main.Data[UserId].Leader) UserId = Main.Data[UserId].Leader;
    if (Main.Data[UserId].Submission == undefined){
        return msg.channel.send("No submission found.");
    }

    delete Main.Data[msg.author.id].Submission;
    Main.Functions.Save();

    return msg.channel.send("**Submission cleared !**");
}

// Export
module.exports = Command;