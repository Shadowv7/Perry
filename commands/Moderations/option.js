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
      permLevel: 3,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    if (!args[0] || !["on", "off"].includes(args[0]))
      return message.reply(message.language.get("OPTION_NO_ARGS"));
    if (this.client.level.get(message.guild.id, "option") === args[0])
      return message.reply(message.language.get("OPTION_ALREADY", args[0]));
    this.client.level.set(message.guild.id, args[0], "option");
    message.reply(message.language.get("OPTION_SUCCESS", args[0]));
  }
}
module.exports = Option;
