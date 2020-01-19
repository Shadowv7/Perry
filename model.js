const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Bot extends Command {
  constructor(client) {
    super(client, {
      name: "botinfos",
      description: language => language.get("BOTINFOS_DESCRIPTION"),
      usage: language => language.get("BOTINFOS_USAGE"),
      examples: language => language.get("BOTINFOS_EXEMPLES"),
      enabled: true,
      aliases: ["bi"],
      clientPermissions: [],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    //code
  }
}
module.exports = Bot;