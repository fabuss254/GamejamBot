// Global Variables
const {PermissionsBitField} = require("discord.js");
var Command = {};

// Variables
Command.Name = "admin";
Command.Permission = PermissionsBitField.Flags.Administrator;

Command.Alias = ["admin"];

// Function
Command.Execute = async function(Main, msg){
    let Args = msg.content.split(" ");
    Args.shift();

    let Member, Team;
    switch (Args[0].toLowerCase()) {
        case "participate":
            Member = msg.mentions.members.first();
            if (Main.Data[Member.id] != undefined) return msg.channel.send(Member.user.tag + " already participate in the event.");

            Main.Data[Member.id] = {}
            Main.Functions.Save();
            Main.Functions.ReloadTeams();
            Member.roles.add("998991783751069696", "Admin made user join the gamejam");

            msg.channel.send(Member.user.tag + " now participate in the event.");
            break;

        case "leave":
            Member = msg.mentions.members.first();
            if (Main.Data[Member.id] == undefined) return msg.channel.send(Member.user.tag + " doesn't participate already in the event.");

            if (Main.Data[Member.id].Leader != undefined){
                Team = Main.Functions.GetTeam(Main.Data[Main.Data[Member.id].Leader].TeamName);
                if (Team.length == 2) {
                    delete Main.Data[Main.Data[Member.id].Leader].TeamName;
                }
            }else if(Main.Data[Member.id].TeamName != undefined){
                Team = Main.Functions.GetTeam(Main.Data[Member.id].TeamName);
                for (let UserId of Team) {
                    delete Main.Data[UserId].Leader;
                }
            }

            delete Main.Data[Member.id];
            Main.Functions.Save();
            Main.Functions.ReloadTeams();
            Member.roles.remove("998991783751069696", "Admin made user leave the gamejam");

            msg.channel.send(Member.user.tag + " doesn't participate anymore in the event.");
            break;

        case "getinfo":
            msg.channel.send(Main.Functions.GetInfos(msg.mentions.users.first()));
            break;

        case "teamrename":
            let CurrentTeam = Args[1].replaceAll("_", " ");
            let NewTeamName = Args[2].replaceAll("_", " ");

            Team = Main.Functions.GetTeam(CurrentTeam);
            if (Team == undefined) {
                return msg.channel.send("No team named '" + CurrentTeam + "'");
            }

            Main.Data[Team[0]].TeamName = NewTeamName;
            Main.Functions.Save();
            Main.Functions.ReloadTeams();

            msg.channel.send(`Team ${CurrentTeam} has been renamed ${NewTeamName}`);
            break;

        case "teaminvite":
            let Inviter = msg.mentions.members.first();
            let Receiver = msg.mentions.members.last();

            if (Inviter.id == Receiver.id) return msg.channel.send("Inviter and Receiver are the same account.");
            if (!Main.Data[Inviter.id] || Main.Data[Inviter.id].Leader != undefined) return msg.channel.send("Inviter incorrect.")
            if (!Main.Data[Receiver.id] || Main.Data[Receiver.id].Leader != undefined || Main.Data[Receiver.id].TeamName != undefined) return msg.channel.send("Receiver incorrect.")

            if (Main.Data[Inviter.id].TeamName == undefined) {
                let newName = Inviter.user.username

                if (Main.Functions.GetTeam(newName)) newName = Inviter.id;

                Main.Data[Inviter.id].TeamName = newName;
            }

            Main.Data[Receiver.id].Leader = Inviter.id;
            Main.Functions.Save();
            Main.Functions.ReloadTeams();

            msg.channel.send(Receiver.user.tag + " force joined " + Inviter.user.tag + "'s team.");

            break;

        case "teamkick":
            let TeamName = Args[1].replaceAll("_", " ");
            Team = Main.Functions.GetTeam(TeamName);
            if (Team == undefined) return msg.channel.send("No team found.");

            let Leader = await Main.Bot.users.fetch(Team[0]);
            let KickedMember = msg.mentions.members.last();
            if (!Main.Data[KickedMember.id] || Main.Data[KickedMember.id].Leader != Leader.id) return msg.channel.send("KickedMember incorrect." + Leader.tag);

            delete Main.Data[KickedMember.id].Leader;

            if (Team.length <= 2) {
                delete Main.Data[Leader.id].TeamName;
                msg.channel.send(KickedMember.user.tag + " force kicked from " + Leader.tag + "'s team. due to not having enough member, the team has been disbanded.");
            }else{
                msg.channel.send(KickedMember.user.tag + " force kicked from " + Leader.tag + "'s team.");
            }
            
            Main.Functions.Save();
            Main.Functions.ReloadTeams();
            break;
            
        default:
            msg.channel.send("Admin command undefined.");
    }
}

// Export
module.exports = Command;