const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});﻿
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't Find Commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  })
  
})


bot.on("ready", async () => {
  console.log(`${bot.user.username}is online!`);
  bot.user.setActivity("Being Coded by Toxic On Atom", {type: "Playing"});
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

});

bot.on("guildMemberAdd", async member =>{
  console.log(`${member.id} joined the Server!`);

  let welcomechannel = member.guild.channels.find(`name`, "welcome_left");
  welcomechannel.send(`${member} has just Joined the Server.Have a Good Time Here!`);

});

bot.on("guildMemberRemove", async member =>{
  console.log(`${member.id} left the Server!`);

  let welcomechannel = member.guild.channels.find(`name`, "welcome_left");
  welcomechannel.send(`${member} has just left the Server.Bye Bye ${member} :frowning: ...`);

});


bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = botconfig.prefix
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1)
  if(!message.content.startsWith(botconfig.prefix)) return;


  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);



  // if(cmd === `${prefix}server`){
  //
  //   let sicon = message.guild.iconURL;
  //   let serverembed = new Discord.RichEmbed()
  //   .setDescription("Server Information")
  //   .setColor("#7d42f4")
  //   .setThumbnail(sicon)
  //   .addField("Server Name", message.guild.name)
  //   .addField("Created On", message.guild.createdAt)
  //   .addField("You Joined", message.member.joinedAt)
  //   .addField("Total Members", message.guild.memberCount);
  //
  //
  //
  //   return message.channel.send(serverembed);
  // }


  // if(cmd === `${prefix}kick`){
  //
  //   let kUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  //   if(!kUser) return message.channel.send("Couldn't Find User!");
  //   let kReason = args.join(" ").slice(22);
  //   if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You Can't do this Command!");
  //   if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Can't kick this Person!");
  //
  //   let kickEmbed = new Discord.RichEmbed()
  //   .setDescription("~Kick~")
  //   .setColor("#7d42f4")
  //   .addField("Kicked User", `${kUser} Who Has An Id Of: ${kUser.id}`)
  //   .addField("Kicked By", `<@${message.author.id}> Who Has An Id of: ${message.author.id}`)
  //   .addField("Kicked In", message.channel)
  //   .addField("Time of Crime", message.createdAt)
  //   .addField("Reason", kReason)
  //
  //   let kickChannel = message.guild.channels.find(`name`, "reports");
  //
  //   message.guild.member(kUser).kick(kReason)
  //   kickChannel.send(kickEmbed)
  //   message.channel.send(kickEmbed);
  //
  //
  //
  //   return;
  // };
  //
  // if(cmd === `${prefix}ban`){
  //
  //   let bUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  //   if(!bUser) return message.channel.send("Couldn't Find User!");
  //   let bReason = args.join(" ").slice(22);
  //   if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You Can't do this Command!");
  //   if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Can't ban this Person!");
  //
  //   let banEmbed = new Discord.RichEmbed()
  //   .setDescription("~Ban~")
  //   .setColor("#f20404")
  //   .addField("Banned User", `${bUser} Who Has An Id Of: ${bUser.id}`)
  //   .addField("Banned By", `<@${message.author.id}> Who Has An Id of: ${message.author.id}`)
  //   .addField("Banned In", message.channel)
  //   .addField("Time of Crime", message.createdAt)
  //   .addField("Reason", bReason)
  //
  //   let banChannel = message.guild.channels.find(`name`, "reports");
  //
  //   message.guild.member(bUser).ban(bReason)
  //   banChannel.send(banEmbed)
  //   message.channel.send(banEmbed);
  //
  //
  //
  //   return;
  // };
  //
  //
  //
  // if(cmd === `${prefix}botinfo`){
  //
  //   let bicon = bot.user.displayAvatarURL
  //   let botembed = new Discord.RichEmbed()
  //   .setDescription("Bot Information")
  //   .setColor("#7d42f4")
  //   .setThumbnail(bicon)
  //   .addField("Bot Name", bot.user.username)
  //   .addField("Created On", bot.user.createdAt);
  //
  //   return message.channel.send(botembed);
  //
  // };
});
bot.login(botconfig.token);
