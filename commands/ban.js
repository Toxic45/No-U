const Discord = require("discord.js")

module.exports.run = async (bot, message, args) =>{
  let bUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
     if(!bUser) return message.channel.send("Couldn't Find User!");
     let bReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You Can't do this Command!");
     if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Can't ban this Person!");

     let banEmbed = new Discord.RichEmbed()
     .setDescription("~Ban~")
     .setColor("#f20404")
     .addField("Banned User", `${bUser} Who Has An Id Of: ${bUser.id}`)
     .addField("Banned By", `<@${message.author.id}> Who Has An Id of: ${message.author.id}`)
     .addField("Banned In", message.channel)
     .addField("Time of Crime", message.createdAt)
     .addField("Reason", bReason)

     let banChannel = message.guild.channels.find(`name`, "reports");

     message.guild.member(bUser).ban(bReason)
     banChannel.send(banEmbed)
     message.channel.send(banEmbed);

}

module.exports.help = {
  name: "ban"
}
