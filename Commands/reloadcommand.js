// Global Variables
var Command = {};
const {PermissionsBitField} = require("discord.js");
const fs = require('fs');

// Variables
Command.Name = "ReloadCommand";
Command.Description = "Reload the bot's commands.";

Command.Permission = PermissionsBitField.Flags.Administrator;
Command.Alias = ["rlcommand", "rlc"];

// Function
Command.Reload = function(tbl){
    tbl.Commands = {};
    let err, files = fs.readdirSync("./Commands");
    let ReloadedFilesNb = 0;
    for (let file of files){
    //files.forEach(function(file){
        try {
            // Delete require cache
            let Cached = require.cache[require.resolve("../Commands/" + file)];
            if (Cached){delete require.cache[require.resolve("../Commands/" + file)]}

            // Try loading
            let CmdTbl = require("../Commands/" + file);

            // Overwrite old function
            if (CmdTbl.Alias !== undefined) {
                for(let cmd of CmdTbl.Alias){
                    tbl.Commands[cmd] = CmdTbl;
                }
            }

            // Add 1 to the reloaded file counter
            ReloadedFilesNb++;
        }catch(e){
            console.log(`[Reload] Error reloading file ${file}: ` + e.message);
        }
    }
    console.log(`Reloaded ${ReloadedFilesNb} commands`);

    tbl.Functions = {}
    let err2, files2 = fs.readdirSync("./Functions");
    let ReloadedFnNb = 0;
    for (let file of files2){
        try {
            // Delete require cache
            let Cached = require.cache[require.resolve("../Functions/" + file)];
            if (Cached){delete require.cache[require.resolve("../Functions/" + file)]}

            // Try loading
            let Fn = require("../Functions/" + file);
            tbl.Functions[file.substring(0, file.length-3)] = Fn(tbl)

            // Add 1 to the reloaded file counter
            ReloadedFnNb++;
        }catch(e){
            console.log(`[Reload] Error reloading file ${file}: ` + e.message);
        }
    }
    console.log(`Reloaded ${ReloadedFnNb} functions`);

    return ReloadedFilesNb+ReloadedFnNb;
}

Command.Execute = async function(Main, msg){
    let Message = await msg.channel.send(`Reloading commands...`);
    let Nb = Command.Reload(Main);
    Message.edit(`Reloaded \`\`${Nb}\`\` commands successfully!`);
}

// Export
module.exports = Command;
