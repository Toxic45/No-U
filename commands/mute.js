const Discord = require("discord.js")
const ms = require("ms");

module.exports.run = async (bot, message, args) =>{



let tomute = (message.mentions.members.first() || message.guild.members.get(args[0]));
if(!tomute) return message.reply("Couldn't Find User!")
if(tomute.hasPermission("KICK_MEMBERS")) return message.reply("Can't Mute This User!");
let muterole = message.guild.roles.find(r => r.name == "Muted");



if(!muterole){
  try{
    muterole = await message.guild.createRole({
      name: "Muted",
      color: "#000000",
      permissions:[]
    })
    message.guild.channels.forEach(async (channel, id) =>{
      await channel.overwritePermissions(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false

      });
    });
  }catch(e){
    console.log(e.stack);
  }
}

let mutetime = args[1];
if(!mutetime) return message.reply("Specify a Time of How long You Want the User to be Muted!");

let mTime = args.join(" ").slice(22);
let muteEmbed = new Discord.RichEmbed()
.setDescription("~Mute~")
.setColor("#ffd100")
.addField("Muted User", `${tomute} Who Has An Id Of: ${tomute.id}`)
.addField("Muted By", `<@${message.author.id}> Who Has An Id of: ${message.author.id}`)
.addField("Muted In", message.channel)
.addField("Time of Crime", message.createdAt)
.addField("Time", mTime)

let muteChannel = message.guild.channels.find(`name`, "reports");

muteChannel.send(muteEmbed)
message.channel.send(muteEmbed);

await(tomute.addRole(muterole.id));
message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

setTimeout(function(){
  tomute.removeRole(muterole.id);
  message.channel.send(`<@${tomute.id}> has been unmuted!`);
}, ms(mutetime));

}

module.exports.help = {
  name: "mute"
}
