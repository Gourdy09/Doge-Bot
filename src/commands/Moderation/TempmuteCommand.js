const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('tempmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have permission to mute members.');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I do not have permission to do that.');

    
    let memberRole = message.guild.roles.cache.find(role => role.name === 'Member');
    let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let time = args[1];
    let reason = args.slice(2).join(" ");
    const tempmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in${message.guild.name}.`)
      .addField(`Duration: ${time}`, `Reason: ${reason}`)
      .setTimestamp();

    if(!memberRole) return message.channel.send('There is no member role, make sure it is spelled: Member.');
    if(!muteRole) return message.channel.send('There is no mute role, make sure its spelled: Muted.');
    if (!args[0]) return message.channel.send('You must state a member to tempmute with a duration of time. \`-tempmute @member [Time]\`');
    if (!mentionedMember) return message.channel.send('The member stated is not in the server.');
    if (!mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You cannot tempute this member as they are the same role or higher than you.');
    if (!time) return message.channel.send('You must state a duration of time for that member to be tempmuted. \`-tempmute @member [Time]\`');
    if (!reason) reason = 'No reason given.';
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err));
    await mentionedMember.send(tempmuteEmbed).catch(err => console.log(err));

    setTimeout(async function () {
      await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err));
      await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err));
      await mentionedMember.send(`Your mute has been lifted ${message.guild.name}`).catch(err => console.log(err));

    }, ms(time));
  }
}