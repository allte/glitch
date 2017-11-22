exports.run = (client, message, Discord, prefix) => {
  const cookies = require('cookiesdb');
  const MysticB = "228349229230325760";

  
  if (message.author.id !== MysticB) {
    message.channel.send('Secret Command. Only used by `GM MysticB`');
    if(message.content == message.content) return;
  }
  
  
  cookies.updateCookies(message.author.id, 100).then(i => {
    var embed = new Discord.RichEmbed()
    .setDescription('You have been given `$100`')
    return message.channel.send(embed)
  })
}