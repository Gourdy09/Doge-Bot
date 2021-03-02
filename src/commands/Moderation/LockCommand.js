const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LockCommand extends BaseCommand {
  constructor() {
    super('lock', 'Moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You do not have permission to manage channels.');
    if (!message.member.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I Don\'t have permission to do that.');

    let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!lockChannel) lockChannel = message.channel;
    let memberRole = message.guild.roles.cache.find(role => role.name === 'Member');

    await lockChannel.updateOverwrite(memberRole,{
      SEND_MESSAGES: false
    }).catch(err => console.log(err));
    message.channel.send('I have locked the channel the channel :lock:');
  } 
}