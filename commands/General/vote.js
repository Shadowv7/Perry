const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Vote extends Command {
  constructor(client) {
    super(client, {
      name: "vote",
      description: language => language.get("BOTINFOS_DESCRIPTION"),
      usage: language => language.get("BOTINFOS_USAGE"),
      examples: language => language.get("BOTINFOS_EXEMPLES"),
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
    const { MessageEmbed } = require("discord.js");
    const embed = new MessageEmbed()

      .setColor("2BFAFA")
      .setTitle("•__Vote__•")
      .setDescription(
        "<:arcane:568162416274440202> [Arcane Bot Center](https://arcane-botcenter.xyz/bot/658579503135588392)" +
          "\n" +
          "<:logo:459634405183586304> [Divine Discord Bot List](https://divinediscordbots.com/bot/658579503135588392/vote)" +
          "\n" +
          "<:discordbotlist:338808864352763904> [Top.gg](https://top.gg/bot/658579503135588392/vote)"
      )
      .setTimestamp()
      .setFooter(
        this.client.user.username,
        this.client.user.avatarURL({ format: "png" })
      );
    message.channel.send(embed);
  }
}

module.exports = Vote;
