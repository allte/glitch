exports.run = (client, message, Discord, prefix) => {
    var role = message.guild.roles.find(`name`, `LoESoft`);
    const ownerID = "228349229230325760";
    const aID = "257351188310130698";
    const args = message.content.split(" ").slice(1);
    if(message.member.roles.has(role.id)) {
      try {
        const code = args.join(" ");
        let evaled = eval(code);
  
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
  
        var ans = (clean(evaled), {code:"xl"});
        var embed = new Discord.RichEmbed()
        .setDescription("Eval")
        .setColor(0xff5148)
        .addField("Input", "```"+code+"```")
        .addField("Output", "```"+evaled+"```")
        return message.channel.send(embed);
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
  }
  function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
      }
  }
