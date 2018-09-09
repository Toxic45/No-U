exports.run = (client, message, args) => {
  const messagecount = parseInt(args.join(' '));
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You Can't do this Command!");
  const user = args[0];
  if (!user) return message.reply('You must say how much messages you want deleted!').catch(console.error);
  
message.channel.fetchMessages({
  limit: messagecount
}).then(messages => message.channel.bulkDelete(messages));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'prune',
  description: 'Prunes X amount of messages from a given channel.',
  usage: 'prune <number>'
};
