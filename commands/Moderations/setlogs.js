const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Logs extends Command {
  constructor(client) {
    super(client, {
      name: "setlogs",
      description: language => language.get("LOGS_DESCRIPTION"),
      usage: language => language.get("LOGS_USAGE"),
      examples: language => language.get("LOGS_EXEMPLES"),
      enabled: true,
      aliases: ["sl"],
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
module.exports = Logs;