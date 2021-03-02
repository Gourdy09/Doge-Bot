const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class VerifyCommand extends BaseCommand {
  constructor() {
    super('verify', 'tool', []);
  }

  async run(client, message, args) {
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I require the manage roles permission")

    let memberRole = message.guild.roles.cache.find(role => role.name === 'Member');

    if(!memberRole) return message,channel.send('There is no member role, make sure its spelled: Member. If you are trying to be verified contact the owner or admins.')

    await message.member.roles.add(memberRole).catch(err => console.log(err));

    const verifyEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been verified in ${message.guild.name}.`)
      .setTimestamp();

    await message.member.send(verifyEmbed).catch(err => console.log(err));
  }
}