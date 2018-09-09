const Discord = require("discord.js")

module.exports.run = async (bot, message, args) =>{
     let kUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
     if(!kUser) return message.channel.send("Couldn't Find User!");
     let kReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You Can't do this Command!");
     if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Can't kick this Person!");

     let kickEmbed = new Discord.RichEmbed()
     .setDescription("~Kick~")
     .setColor("#7d42f4")
     .addField("Kicked User", `${kUser} Who Has An Id Of: ${kUser.id}`)
     .addField("Kicked By", `<@${message.author.id}> Who Has An Id of: ${message.author.id}`)
     .addField("Kicked In", message.channel)
     .addField("Time of Crime", message.createdAt)
     .addField("Reason", kReason)

     let kickChannel = message.guild.channels.find(`name`, "reports");

     message.guild.member(kUser).kick(kReason)
     kickChannel.send(kickEmbed)
     message.channel.send(kickEmbed);
  }

  module.exports.help = {
    name: "kick"
  }
