const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You do not have permission to delete messages');
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('I do not have permission to do that');
    if (!args[0]) return message.channel.send("You must state a number of messages to purge \`-purge [number]\`");
    const amountToDelete = Number(args[0], 10);

    if (isNaN(amountToDelete)) return message.channel.send('Number stated is not a valid number.');
    if (!Number.isInteger(amountToDelete)) return message.channel.send("Number stated must be a whole number.");
    if(!amountToDelete || amountToDelete <2 || amountToDelete > 100) return message.channel.send('The number must be between 2 and 100.');
    const fetched = await message.channel.messages.fetch({
      Limit: amountToDelete
    });

    try{
      await message.channel.bulkDelete(fetched)
      .then(messages =>message.channel.send(`Deleted ${amountToDelete} messages!`));
    } catch (err) {
      console.Log(err);
      message.channel.send(`I was unable to delete the amount stated, make sure they are younger than 14 days old.`);
    }
  }
}