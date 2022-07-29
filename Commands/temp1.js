// Global Variables
const {PermissionsBitField} = require("discord.js");
var Command = {};

// Variables
Command.Name = "temp1";
Command.Permission = PermissionsBitField.Flags.Administrator;

Command.Alias = ["temp1"];

// Function
Command.Execute = async function(Main, msg){
    if (msg.author.id != "178131193768706048") return;
    
    //let notify = await msg.channel.send("Auto joining all users inside manual teams: ``0``");
    let channel = await Main.Bot.channels.fetch("999381286185603082");
    let msg1 = await channel.messages.fetch("999390880240783400");
    let msg2 = await channel.messages.fetch("999391906121404556");

    let num = 0
    console.log(msg1.mentions.members.size, msg2.mentions.members.size)
    msg1.mentions.users.each(member => {
        Main.Data[member.id] = {}
        num++;
        console.log("Managed " + num + " > " + member.tag);
    })

    msg2.mentions.users.each(member => {
        Main.Data[member.id] = {}
        num++;
        console.log("Managed " + num + " > " + member.tag);
    })
}

// Export
module.exports = Command;