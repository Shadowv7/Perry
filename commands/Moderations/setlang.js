const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Lang extends Command {
  constructor(client) {
    super(client, {
      name: "setlang",
      description: language => language.get("LANG_DESCRIPTION"),
      usage: language => language.get("LANG_USAGE"),
      examples: language => language.get("LANG_EXEMPLES"),
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
    if (!args[0] || !["fr", "en", "français","anglais","french","english"].includes(args[0]))
      return message.reply(message.language.get("LANG_NO_ARGS"));
    const languages = {
      fr: "french",
      français: "french",
      en: "english",
      english: "english",
      anglais: "english",
      french: "french"
    };

    if (this.client.settings.get(message.guild.id, "language") === languages[args[0]])
      return message.reply(message.language.get("LANG_ALREADY", languages[args[0]]));
    this.client.settings.set(message.guild.id, languages[args[0]], "language");
    message.reply(message.language.get("LANG_SUCCESS", args[0]));
  }
}
module.exports = Lang;
