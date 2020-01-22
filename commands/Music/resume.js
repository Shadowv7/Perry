const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Resume extends Command {
  constructor(client) {
    super(client, {
      name: "resume",
      description: language => language.get("RESUME_DESCRIPTION"),
      usage: language => language.get("RESUME_USAGE"),
      examples: language => language.get("RESUME_EXEMPLES"),
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
      let song = await this.client.player.resume(message.guild.id);
    message.reply(message.language.get("RESUME_SUCCESS"))
    
  }
}
module.exports = Resume;