const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Skip extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      description: language => language.get("SKIP_DESCRIPTION"),
      usage: language => language.get("SKIP_USAGE"),
      examples: language => language.get("SKIP_EXEMPLES"),
      enabled: true,
      aliases: [],
      clientPermissions: [],
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
    if (queue.songs.length < 2)
      return message.reply(message.language.get("QUEUE_END"));

    let song = await this.client.player.pause(message.guild.id);
    message.reply(message.language.get("SKIP_SUCCESS"));
  }
}
module.exports = Skip;
