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
    const BOT_HEADING = message.language.get("BOTINFOS_HEADING")
    const embed = new Discord.MessageEmbed()
      .setColor("2BFAFA")
      .setTitle(message.language.get("BOTINFOS_HEADING")[0])
      .addField(
        BOT_HEADING[1],
        "<@652145085999349791>(`ShadowV#9339`)"
      )
      .addField(
        BOT_HEADING[2],
        `- \`${BOT_HEADING[3]}\` : ${this.client.guilds.size}\n- \`${BOT_HEADING[4]}\` : ${this.client.users.size}`
      )
      .addField(
        "⚙️ Version",
        `- \`Perry\` : 0.0.1-beta\n- \`NodeJS\` : 12.5.0\n- \`discord.js\` : 12.0.0-dev`
      )
      .setThumbnail(this.client.user.displayAvatarURL({ format: "png" }))
      .setTimestamp()
      .setFooter(
        this.client.user.username,
        this.client.user.displayAvatarURL({ format: "png" })
      );
    message.channel.send(embed);
  }
}
module.exports = Bot;