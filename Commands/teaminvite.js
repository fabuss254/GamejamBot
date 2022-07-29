// Global Variables
var Command = {};

// Variables
Command.Name = "TeamInvite";

Command.Alias = ["teaminvite"];

// Function
Command.Execute = async function(Main, OriginalMessage){
    let member = OriginalMessage.mentions.members.first();

    if (!member) {
        return OriginalMessage.channel.send("No user found.");
    }

    if (member.id == OriginalMessage.author.id) return OriginalMessage.channel.send("You cannot send an invite to yourself.");

    if (Main.Data[OriginalMessage.author.id] == undefined) return OriginalMessage.channel.send("You're not participating in the gamejam yet !\n use ``-participate`` to participate now !");
    if (Main.Data[OriginalMessage.author.id].Leader != undefined) return OriginalMessage.channel.send("You're already in a team which you're not the leader ! (only the leader can invite new members)\nYou can use ``-teamleave`` to leave your current team.");

    if (Main.Data[member.id] == undefined) return OriginalMessage.channel.send("User isn't participating in the gamejam.");
    if (Main.Data[member.id].Leader != undefined || Main.Data[member.id].TeamName != undefined) return OriginalMessage.channel.send("User is already inside another team !");

    if (Main.Data[OriginalMessage.author.id].TeamName) {
        let Team = Main.Functions.GetTeam(Main.Data[OriginalMessage.author.id].TeamName);
        if (Team.length > 3) return OriginalMessage.channel.send("Your team is already full !");
    }
    

    let msg = await OriginalMessage.channel.send(`**${OriginalMessage.member.user.tag} Invited ${member.user.tag} to join their team !**\nTo accept, ${member.user.tag} must react to this message with ✅ (expires in 5min)`);
    msg.react("✅");
    
    let filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === member.id;
    let collector = msg.createReactionCollector({filter, time: 300000, max : 1});

    let DidAccept = false;
    collector.on("collect", () => {
        DidAccept = true;
        collector.stop();
    })

    collector.on("end", () => {
        if (!DidAccept){
            return msg.edit(`${OriginalMessage.member.user.tag} Invitation has expired...`);
        }

        if (Main.Data[OriginalMessage.author.id] == undefined || Main.Data[OriginalMessage.author.id].Leader != undefined) {
            return msg.edit(`${OriginalMessage.member.user.tag} Invitation has been cancelled. Either the team has been disbanded or the team leader left...`);
        }

        if (Main.Data[OriginalMessage.author.id].TeamName) {
            let Team = Main.Functions.GetTeam(Main.Data[OriginalMessage.author.id].TeamName);
            if (Team.length > 3) return msg.edit(`${OriginalMessage.member.user.tag} Invitation has been cancelled. The team is already full.`);
        }

        if (Main.Data[member.id] == undefined || Main.Data[member.id].Leader != undefined || Main.Data[member.id].TeamName != undefined) {
            return msg.edit(`${OriginalMessage.member.user.tag} Invitation has been cancelled. Either the invited person left or joined another team...`);
        }

        msg.edit(`**${member.user.tag} Joined ${OriginalMessage.member.user.tag}'s team !**`);
        if (!Main.Data[OriginalMessage.author.id].TeamName) {
            let newName = OriginalMessage.member.user.username

            if (Main.Functions.GetTeam(newName)) newName = OriginalMessage.member.id;

            Main.Data[OriginalMessage.author.id].TeamName = newName;
        }
        
        Main.Data[member.id].Leader = OriginalMessage.author.id;
        Main.Functions.Save();
        Main.Functions.ReloadTeams();
    })
}

// Export
module.exports = Command;