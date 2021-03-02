const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have permission to kick members.")
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I do not have permission to do that.")
   const mentionedMember = message.mentions.members.first();
   let reason = args.slice(1).join(" ");
   if (!reason) reason = "No reason given";
   const  kickEmbed = new Discord.MessageEmbed()
     .setTitle(`You were kicked from ${message.guild.name}`)
     .setDescription(`Reason for being kicked: ${reason}`)
     .setColor("#D76060")
     .setTimestamp()
     .setFooter(client.user.tag, client.user.displayAvatarURL());

    if (!args[0]) return message.channel.send("You need to state a user to kick. \`-kick @user reason\`");
    if (!mentionedMember) return message.channel.send("The member mentioned is not in the server.");
    if (!mentionedMember.kickable) return message.channel.send("I cannot kick that member");
    try{
      await mentionedMember.send(kickEmbed);
    } catch (err) {
      console.log('I was unable to message the member.');
    }

    try{
      await mentionedMember.kick(reason)
    } catch (err) {
      console.Log(err);
      return message.channel.send("I was unnable to kick the member mentioned.")
    }
  }
}