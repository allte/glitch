exports.run = (client, message, Discord, prefix) => {
	var embed = new Discord.RichEmbed()
	.setTitle("LoESoft")
	.setDescription("Here are all the commands available to the LoESoft Team")
	.addField(prefix + "eval", "Information about the command available on the Internet")
	.addField(prefix + "wipedata", "Wipes the databases the bot uses \nOnly usable by the bot developers and Devwarlt.")
	.addField(prefix + "esay", "Puts whatever you say after the command into an embed")
	.setColor('RANDOM')
	return message.author.send(embed);
}