const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NicknameCommand extends BaseCommand {
  constructor() {
    super('nickname', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send("You do not have permission to change nicknames.");
    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("I do not do have permission to do that.");

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nickName = args.slice(1).join(" ");

    if (!args[0]) return message.channel.send("You must state a member to change a nickname.");
    if (!mentionedMember) return message.channel.send("The member stated is not in the server.");
    if (!nickName) return message.channel.send("You must state a nickname for the member.");
    if(!mentionedMember.kickable) return message.channel.send("You cannot change the nickname of this member.");

    await mentionedMember.setNickname(nickName).catch(err => console.log(err) && message.channel.send("I cannot change the nickname due to an error. Make sure the nickname is within 3 to 32 characters."));
  }
}