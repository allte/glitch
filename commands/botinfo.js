exports.run = (client, message, Discord, prefix) => {
	var embed = new Discord.RichEmbed()
	.setTitle("Bot Info")
	.setDescription("Here is some information about me")
	.addField("Developers", "allte#4008 & MysticB#9712")
	.addField("Library", "Discord.js")
	.addField("Uptime", uptime())
	return message.channel.send(embed);	
function uptime() { 
    var date = new Date(client.uptime);
    var strDate = '';
     strDate += date.getUTCDate() - 1 + " days, ";
    strDate += date.getUTCHours() + " hours, ";
    strDate += date.getUTCMinutes() + " minutes, ";
    strDate += date.getUTCSeconds() + " seconds";
    return strDate;
}
}
