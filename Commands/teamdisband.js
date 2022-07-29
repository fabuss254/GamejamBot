// Global Variables
var Command = {};

// Variables
Command.Name = "TeamDisband";

Command.Alias = ["teamdisband"];

// Function
Command.Execute = function(Main, msg){
    if (Main.Data[msg.author.id] == undefined) return msg.channel.send("You're not participating in the gamejam yet !\n use ``-participate`` to participate now !");
    if (Main.Data[msg.author.id].TeamName == undefined) return msg.channel.send("You're not the leader of any team, you can create one by inviting someone with ``-teaminvite @mention``.");
    if (Main.Data[msg.author.id].Leader != undefined) return msg.channel.send("You're not the leader of your current team. only the leader can disband the team !");

    let Team = Main.Functions.GetTeam(Main.Data[msg.author.id].TeamName)
    for (let UserId of Team) {
        if (UserId == msg.author.id) continue;
        delete Main.Data[UserId].Leader;
    }

    delete Main.Data[msg.author.id].TeamName;

    Main.Functions.Save();
    Main.Functions.ReloadTeams();

    return msg.channel.send(`**${msg.member.user.tag}'s team has been disbanded.**`);
}

// Export
module.exports = Command;