const Discord = require("discord.js");
const client = new Discord.Client();
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const sql = require("sqlite");
sql.open("./descriptions.sqlite");
const prefix = "l!";

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 2800);

client.on("ready", () => {
	console.log("Successfully booted and ready for action!");
	client.user.setGame(prefix + "help / LoE")
	const tableSource = new EnmapLevel({name: "descriptions"});
	const descriptions = new Enmap({provider: tableSource});
	client.descriptions = new Enmap({name: "descriptions"});
});

client.on("guildMemberAdd", member => {
    const welcomechannel = member.guild.channels.find('name', 'bot-log');
     if (welcomechannel) {
         welcomechannel.send({embed: {
            color: 0xFC0000,
            author: {
              name: member.user.username,
              icon_url: member.user.avatarURL
            },
            title: "Join Message",
            description: `The user ${member.user} has joined the server.`,
            fields: [{
              name:"Info",
              value:"Please PM a CM if ya need help"
            }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: member.user.avatarURL,
              text: "Member Joined!"
            }
        }
    });
            }
});

  
client.on("guildMemberRemove", member => {
    const welcomechannel = member.guild.channels.find('name', 'bot-log');
     if (welcomechannel) {
         welcomechannel.send({embed: {
            color: 0xFC0000,
            author: {
              name: member.user.username,
              icon_url: member.user.avatarURL
            },
            title: "Leave Message",
            description: `Noo!! ${member.user} has left the server.`,
            fields: [{
              name:"Info",
              value:"Can anyone please go see why he/she has left the server"
            }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: member.user.avatarURL,
              text: "Member Left!"
            }
        }
    });
            }
});


client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type !== "dm"){
  var role = message.guild.roles.find(`name`, `LoESoft`);
  if(message.channel.id !== "376899677846765578" && !message.member.roles.has(role.id)) return;
  }
  if(message.content.startsWith(prefix)){
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    
        if (message.content.includes('https://discord.gg/')) { 
    message.delete(); // Delete the message
      message.reply('NO INVITE LINKS') // Sends this message
  }
    
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, Discord, prefix);
  } catch (err) {
    message.delete();
    console.error(err);
  }
 }
});




client.login(process.env.SECRET);
