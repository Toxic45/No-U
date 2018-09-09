const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You Dont Have Permissions to do This Command!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user!");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Please Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role!");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`You have been given the role ${gRole.name}!`)
  }catch(e){
    message.channel.send(`<@${rMember.id}> has been given the role ${gRole.name}. We tried to DM them, but their DMs are locked!`)
  }
}

module.exports.help = {
  name: "addrole"
}