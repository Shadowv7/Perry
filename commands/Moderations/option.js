const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Option extends Command {
  constructor(client) {
    super(client, {
      name: "option",
      description: language => language.get("OPTION_DESCRIPTION"),
      usage: language => language.get("OPTION_USAGE"),
      examples: language => language.get("OPTION_EXEMPLES"),
      enabled: true,
      aliases: [],
      clientPermissions: [],
      memberPermissions: ["MANAGE_GUILD"],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    const options = { on: true, off: false };
    const option = options[args[1]];
    if (!args[1] || !["on", "off"].includes(args[1]))
      return message.reply(message.language.get("OPTION_NO_ARGS"));
    if (!args[0] || !["level", "welcome", "logs"])
      return message.reply(message.language.get("OPTION_NO_NAME"));
    if (args[0] === "level") {
      if (this.client.level.get(message.guild.id, "option") === args[1])
        return message.reply(
          message.language.get("OPTION_LEVEL_ALREADY", args[1])
        );

      this.client.level.set(message.guild.id, option, "option");
      message.reply(message.language.get("OPTION_LEVEL_SUCCESS", args[1]));
    } else if (args[0] === "welcome") {
      this.client.settings.set(message.guild.id, option, "welcome");
      
      message.reply(message.language.get("OPTION_WELCOME_SUCCESS",args[1]));
    } else if (args[0] === "logs") {
      this.client.settings.set(message.guild.id,option,"logs")
      message.reply(message.language.get("OPTION_LOGS_SUCCESS",args[1]))
    }
  }
}
module.exports = Option;
