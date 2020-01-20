const Command = require("../../structures/Command.js"),
  Discord = require("discord.js"),
  ascii = require("ascii-art");

class Ascii extends Command {
  constructor(client) {
    super(client, {
      name: "ascii",
      description: language => language.get("ASCII_DESCRIPTION"),
      usage: language => language.get("ASCII_USAGE"),
      examples: language => language.get("ASCII_EXEMPLES"),
      enabled: true,
      aliases: [],
      clientPermissions: [],
      memberPermissions: [],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    let text = args
      .join(" ")
      .split("")
      .filter(r =>
        "abcdefghijklmnopqrstuvwxyz1234567890-/:;()&@\".,?!'[]#%^*+=_\\<>$ ".includes(
          r.toLowerCase()
        )
      )
      .join("");

    if (!text) {
      return message.reply(message.language.get("ASCII_NO_TEXT"));
    }

    if (text.length > 14) {
      return message.reply(message.language.get("ASCII_TEXT_LENGTH"));
    }
    ascii.font(text, "Doom", function(err, ascii) {
      if (err) {
        return message.reply(message.language.get("ASCII_ERROR")); //lettres ou/et des chiffres."));
      }
      message.channel.send("```" + ascii + "```");
    }).catch(err => message.reply(message.language.get("ASCII_ERROR")));
  }
}
module.exports = Ascii;
