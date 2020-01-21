const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Top extends Command {
  constructor(client) {
    super(client, {
      name: "top",
      description: language => language.get("TOP_DESCRIPTION"),
      usage: language => language.get("TOP_USAGE"),
      examples: language => language.get("TOP_EXEMPLES"),
      enabled: true,
      aliases: [],
      clientPermissions: [],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    const key = `${message.guild.id}-${message.author.id}`;
    const filtered = this.client.economy
      .filter(p => p.guild === message.guild.id)
      .array();
    const sorted = filtered.sort(function(a, b) {
      return b.money - a.money;
    });
    const classement = sorted.splice(0, 10);
       const { MessageEmbed } = require("discord.js");
      const embed = new MessageEmbed()
        .setColor("2bfafa")
        .setThumbnail(message.guild.iconURL({ format: "png" }))
        .setTitle("•__Top__•");
      classement.forEach((data, index) => {
        embed.addField(
          "[#**" + (index + 1) + "**] " + message.guild.members.get(data.user).user.username+"#"+message.guild.members.get(data.user).user.discriminator,
          `\`${data.money} Perryen\``
        );
      });

      message.channel.send(embed);
  }
}
module.exports = Top;