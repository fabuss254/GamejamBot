// CONSTANTS
const Discord = require("discord.js");
const fs = require('fs');

// CONSOLE LOG REWRITE (include date)
let log = console.log;
console.log = function(){
    let args = Array.from(arguments); // ES5
    args.unshift(`[${new Date()}]`);
    log.apply(console, args);
}

let Main = {}
Main.Data = JSON.parse(fs.readFileSync('Data.json'));

// VARIABLES
let Intents = Discord.IntentsBitField;
Main.Bot = new Discord.Client({intents : [Intents.Flags.Guilds, Intents.Flags.GuildMembers, Intents.Flags.GuildMessages, Intents.Flags.MessageContent, Intents.Flags.GuildMessageReactions]});
Main.Commands = {};
require("./Commands/reloadcommand.js").Reload(Main);

// EVENTS
Main.Bot.on("ready", async function(){
    console.log(`
Connected to ${Main.Bot.user.tag}.
Server: ${Main.Bot.guilds.cache.size}
Users: ${Main.Bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}
    `)
});

Main.Bot.on("clickButton", async function(button){
    if (button.id === 'DeleteMessage') {
        if (Main.CommandOwner[button.message.id] != button.clicker.user.id) return;
        await button.message.delete();
    }
});

Main.Bot.on("guildMemberRemove", async function(Member){
    if (Main.Data[Member.id] == undefined) return;

    if (Main.Data[Member.id].Leader != undefined){
        let Team = Main.Functions.GetTeam(Main.Data[Main.Data[Member.id].Leader].TeamName);
        if (Team.length == 2) {
            delete Main.Data[Main.Data[Member.id].Leader].TeamName;
        }
    }else if(Main.Data[Member.id].TeamName != undefined){
        let Team = Main.Functions.GetTeam(Main.Data[Member.id].TeamName);
        for (let UserId of Team) {
            delete Main.Data[UserId].Leader;
        }
    }

    delete Main.Data[Member.id];
    Main.Functions.Save();
    Main.Functions.ReloadTeams();
})

Main.Bot.on("messageCreate", async function(msg){
    if (msg.author.bot) return;
    if (!msg.content.startsWith("-")) return;
    if (!msg.member.permissions.has(Discord.PermissionFlagsBits.Administrator) && msg.channel.id != "999422671794216982" && msg.channel.id != "999755125503561820") return;
    //if (!msg.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return;

    let ChoosenCommand = msg.content.substring((Main.Data.Prefix || "-").length).split(" ")[0].toLowerCase();
    if (Main.Commands[ChoosenCommand]){
        if (Main.Commands[ChoosenCommand].Permission && !msg.member.permissions.has(Main.Commands[ChoosenCommand].Permission)){
            const NoPerm = new Discord.EmbedBuilder()
            .setColor('#ff7369')
            .setTitle('Not enough permissions.')
            .setDescription('You cannot execute this command due to missing permission.')

            return msg.channel.send({embeds: [NoPerm]});
        }

        console.log(msg.author.tag, ">", msg.content)
        Main.Commands[ChoosenCommand].Execute(Main, msg)
    }else{
        const ErrorEmbed = new Discord.EmbedBuilder()
            .setColor('#ff7369')
            .setTitle('Command not found.')
            .setDescription('The commands haven\'t been found')

        msg.channel.send({embeds: [ErrorEmbed]});
    }
});

// SETUP
Main.Bot.login("TOKEN HERE");
