const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SocialCommand extends BaseCommand {
  constructor() {
    super('social', 'information', []);
  }

  async run(client, message, args) {
    const youtubeEmbed = new Discord.MessageEmbed()
      .setTitle('Dogeerdog')
      .setURL('https://www.youtube.com/channel/UCmtIH9re_4lue-dFc7MuETw')
      .setThumbnail('https://pngimg.com/uploads/youtube/youtube_PNG14.png')
      .setColor('RED')
      .addField('Check Out Dogeerdog\'s YouTube Channel', 'I play videogames so subscribe')
      .setTimestamp()
      .setFooter("Dogeerdog", "https://yt3.ggpht.com/yti/ANoDKi70psqJZ2kXcDI-9Yy8Y2WaXM1QQ8ySiPaWJY0y=s88-c-k-c0x00ffffff-no-rj-mo");
    
    await message.channel.send(youtubeEmbed).catch(err => console.log(err));
  }
}