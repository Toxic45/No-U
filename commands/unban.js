const Discord = require("discord.js")

module.exports.run = (client, message, args) => {
  let ubUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  const reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  const user = args[0];
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You Can't do this Command!");
  if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
  if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
  let ubReason = args.join(" ").slice(22);
  message.guild.unban(user);

let unbanEmbed = new Discord.RichEmbed()
.setDescription("~Unban~")
.setColor("#f20404")
.addField("Unbanned User", `${ubUser} Who Has An Id Of: ${ubUser.id}`)
.addField("Unbanned By", `<@${message.author.id}> Who Has An Id of: ${message.author.id}`)
.addField("Unanned In", message.channel)
.addField("Time of Crime", message.createdAt)
.addField("Reason", ubReason)

let unbanChannel = message.guild.channels.find(`name`, "reports");

unbanChannel.send(unbanEmbed)
message.channel.send(unbanEmbed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'Unbans the user.',
  usage: 'unban [mention] [reason]'
};
