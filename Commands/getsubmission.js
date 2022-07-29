// Global Variables
var Command = {};

// Variables
Command.Name = "GetSubmission";

Command.Alias = ["getsubmission"];

// Function
Command.Execute = function(Main, msg){
    let UserId = msg.author.id;
    if (Main.Data[UserId] == undefined) return msg.channel.send("You're not participating in the gamejam yet !\n use ``-participate`` to participate now !");
    if (Main.Data[UserId].Leader) UserId = Main.Data[UserId].Leader;

    let Submission = Main.Data[UserId].Submission
    if (Submission == undefined){
        return msg.channel.send("No submission has been sent yet.");
    }else{
        return msg.channel.send("**Submission found <@" + UserId + ">:** " + Submission);
    }
}

// Export
module.exports = Command;