const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'information', []);
  }

  async run(client, message, args) {
    const helpEmbed = new Discord.MessageEmbed()
      .setTitle ('Help')
      .setColor ('RANDOM')
      .addFields(
        {name: 'Prefix', value: `-`},
        {name: 'Dev Social', value: `social`},
        {name: 'Ban', value: `ban @member reason`},
        {name: 'Unban', value: `unban @member`},
        {name: 'Nickname', value: `nickname @member`},
        {name: 'Nuke', value: `nuke reigion`},
        {name: 'Purge', value: `purge [number of messages]`},
        {name: 'Kick', value: `kick @user reason`},
        {name: 'Mute', value: `mute @user reason`},
        {name: 'Verify', value: `verify`},
        {name: 'Lock', value: `lock`},
        {name: 'Unlock', value: `unlock`},
        {name: 'Help', value: `help`},
        {name: 'Ping', value: `ping`},
        {name: 'Tempban', value: `tempban @user reason`},
      );
    
    await message.channel.send(helpEmbed).catch(err => console.log(err));
  }
}