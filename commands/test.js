exports.run = (client, message, Discord, prefix) => {
  const sql = require("sqlite");
  sql.open("./descriptions.sqlite");
  sql.get(`SELECT * FROM descriptions WHERE userId ="${message.author.id}"`).then(row => {
    message.reply(row.desc);
  });
}
  