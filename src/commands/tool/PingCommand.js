const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'tools', []);
  }

  async run(client, message, args) {
    message.reply('Calculating Ping...').then((resultMessage) =>{
      const ping = resultMessage.createdTimestamp - message.createdTimestamp

      resultMessage.edit(`Bot latency: ${ping}ms`)
    })
  }
}