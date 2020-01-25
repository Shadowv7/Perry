const Command = require("../../structures/Command.js"),
  Discord = require("discord.js"),
  Pagination = require("discord.js-pagination");

class Queue extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      description: language => language.get("QUEUE_DESCRIPTION"),
      usage: language => language.get("QUEUE_USAGE"),
      examples: language => language.get("QUEUE_EXEMPLES"),
      enabled: true,
      aliases: [],
      clientPermissions: ["EMBED_LINKS"],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    if (!this.client.player.isPlaying(message.guild.id))
      return message.reply(message.language.get("NOT_PLAYING"));
    let queue = await this.client.player.getQueue(message.guild.id);
    if (message.member.voice.channel.id !== queue.connection.channel.id) {
      return message.reply(message.language.get("SAME_CHANNEL"));
    }
    if (queue.songs.length < 1) {
      return message.reply(message.language.get("QUEUE_END"));
    }
    const GuildQueue = queue.songs
      .splice(0, 20)
      .map((song, i) => {
        return `${`#${i + 1}`} - ${song.name} | ${song.author}`;
      })
      .join("\n");
    const embed = new Discord.MessageEmbed()
      .setColor(data.config.embed.color)
      .setTitle("•__Queue__•")
      .setDescription(GuildQueue);
    message.channel.send(embed);
  }
}
module.exports = Queue;
