const Discord = require("discord.js")

module.exports.run = async (bot, message, args) =>{
   let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
   if(!wUser) return message.channel.send("Couldn't Find User!");
   let reason = args.join(" ").slice(22);

   let warnEmbed = new Discord.RichEmbed()
   .setDescription("Warn")
   .setColor("#7d42f4")
   .addField("Warned User", `${wUser} Who Has An Id Of: ${wUser.id}`)
   .addField("Warned By", `${message.author} Who Has An Id of: ${message.author.id}`)
   .addField("Channel", message.channel)
   .addField("Time of Crime", message.createdAt)
   .addField("Reason", reason)

     message.channel.send(warnEmbed);

     let warnchannel = message.guild.channels.find(`name`, "reports");

     warnchannel.send(warnEmbed);

}

module.exports.help = {
  name: "warn"
}
