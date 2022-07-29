// Global Variables
var Command = {};

// Variables
Command.Name = "TeamKick";

Command.Alias = ["teamkick"];

// Function
Command.Execute = function(Main, msg){
    if (Main.Data[msg.author.id] == undefined) return msg.channel.send("You're not participating in the gamejam yet !\n use ``-participate`` to participate now !");
    if (Main.Data[msg.author.id].Leader != undefined) return msg.channel.send("You're not the leader of your current team. only the leader can kick someone from the team !");
    if (Main.Data[msg.author.id].TeamName == undefined) return msg.channel.send("You're not the leader of any team, you can create one by inviting someone with ``-teaminvite @mention``.");

    let Member = msg.mentions.members.first();
    if (Member == undefined) return msg.channel.send("No mentions found.");

    let Team = Main.Functions.GetTeam(Main.Data[msg.author.id].TeamName)
    if (!Team.includes(Member.id)) return msg.channel.send(`${Member.user.tag} isn't a part of your team.`);

    delete Main.Data[Member.id].Leader;

    if (Team.length <= 2) {
        delete Main.Data[msg.author.id].TeamName;
    }

    Main.Functions.Save();
    Main.Functions.ReloadTeams();

    return msg.channel.send(`**${Member.user.tag} has been kicked from the team.**` + (Team.length == 2 ? " The team has been disbanded has it now only contain one member." : ""));
}

// Export
module.exports = Command;