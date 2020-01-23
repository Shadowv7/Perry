const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Welcome extends Command {
  constructor(client) {
    super(client, {
      name: "setwelcome",
      description: language => language.get("WELCOME_DESCRIPTION"),
      usage: language => language.get("WELCOME_USAGE"),
      examples: language => language.get("WELCOME_EXEMPLES"),
      enabled: true,
      aliases: ["sw"],
      clientPermissions: [],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    const channel = message.mentions.channels.first()
    const url = args.slice(1).join(" ")
    if(!channel) return message.reply(message.language.get("NO_CHANNEL"));
    if(!url) return message.reply(message.language.get("NO_URL"))
    this.client.settings.set(message.guild.id,channel.id,"welcome_channel")
    this.client.settings.set(message.guild.id,url,"welcome_image")
    message.reply(message.language.get("WELCOME_SUCCESS"))
  }
}
module.exports = Welcome;