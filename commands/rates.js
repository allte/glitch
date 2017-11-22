exports.run = (client, message, Discord, prefix) => {
  var  lb = [];
  var i = 1;
const sql = require("sqlite");
  sql.open("./rates.sqlite");
  message.channel.send("Please wait a moment...")
  sql.each(`SELECT * FROM rates ORDER BY week DESC LIMIT 20`, (err, row) =>{
    lb.push(`${i++}. <@${row.userId}> - Rate: ${row.rate}, Week: ${row.week}, Total Points: ${row.points}`);
  })
    setTimeout(() => {
      let embed = new Discord.RichEmbed()
              .addField("Here is a list of how the team is currently doing", lb.join("\n\n")); 
              console.log(lb)
              return message.channel.send(embed);
          }, 3500);
    
}