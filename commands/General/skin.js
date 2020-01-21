const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Skin extends Command {
  constructor(client) {
    super(client, {
      name: "skin",
      description: language => language.get("SKIN_DESCRIPTION"),
     usage: language => language.get("SKIN_USAGE"),
      examples: language => language.get("SKIN_EXEMPLES"),
      enabled: true,
      aliases: [],
      clientPermissions: ["EMBED_LINKS"],
      memberPermissions: [],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    const text = args
      .join(" ")
      .split("")
      .filter(r =>
        "abcdefghijklmnopqrstuvwxyz1234567890_- ".includes(
          r.toLowerCase()
        )
      )
      .join("")
    if(!text) return message.reply(message.language.get("SKIN_NO_NICKNAME"))
    if(text.length > 20) return message.reply(message.language.get("SKIN_NICKNAME_LENGTH"))
    const embed = new Discord.MessageEmbed()
    .setColor(0x2BFAFA)
    .setImage(`https://minotar.net/armor/body/${text}/100.png`)
    .setTitle("•__"+text+"__•")
    message.channel.send(embed)
     .catch(err => message.reply(message.language.get("SKIN_ERROR")))
  }
}
module.exports = Skin;