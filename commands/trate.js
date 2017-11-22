exports.run = (client, message, Discord, prefix) => {
  const sql = require("sqlite");
  sql.open("./rates.sqlite");
  var split = message.content.split(" ")
  var mentioned = message.mentions.members.first();
  var rate = split[2];
  var week = split[3];

    let modRole = message.guild.roles.find('name', 'LoESoft')
    let member = message.mentions.users.first();


    if(!message.member.roles.has(modRole.id)) {
        var embed = new Discord.RichEmbed()
        .setDescription('**Invalid:**\nYou do not have the role `Server Admin` to rate anyone.')
        return message.channel.send(embed);
      if(message.content) return;
    }

    if(!mentioned) {
        var embed = new Discord.RichEmbed()
        .setDescription('**Invalid:**\nYou did not mention a member to rate.')
        return message.channel.send(embed);
      if(message.content) return;
    }
  
    if(!rate){
      var embed = new Discord.RichEmbed()
      .setDescription('**Invalid**\nYou did not provide a proper rate.')
      return message.channel.send(embed);
      if(message.content) return
    }
    if(!week){
      var embed = new Discord.RichEmbed()
      .setDescription('**Invalid**\nYou did not provide a proper week.')
      return message.channel.send(embed);
      if(message.content) return;
    }
  var A = 4;
  var B = 3;
  var C = 2;
  var D = 1;
  var points = 0
  if(rate == "A" || rate == "B" || rate == "C" || rate == "D"){
    if(rate == "A"){
      points = A;
    } else if(rate == "B"){
      points = B;
    } else if(rate == "C"){
      points = C;
    } else {
      points = D;
    }
  sql.get(`SELECT * FROM rates WHERE userId ="${mentioned.user.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO rates (userId, rate, week, points) VALUES (?, ?, ?, ?)", [mentioned.user.id, rate, week, points]);
    } else {
      sql.run(`UPDATE rates SET rate = "${rate}" WHERE userId = ${mentioned.user.id}`);
      sql.run(`UPDATE rates SET week = "${week}" WHERE userId = ${mentioned.user.id}`);
      sql.run(`UPDATE rates SET points = ${row.points + points} WHERE userId = ${mentioned.user.id}`);
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS rates (userId TEXT, rate TEXT, week TEXT, points INT)").then(() => {
      sql.run("INSERT INTO rates (userId, rate, week, points) VALUES (?, ?, ?, ?)", [mentioned.user.id, rate, week, points]);
    });
  });
  message.channel.send(mentioned.user.tag + " has been rated successfully.");
  }
}