const Command = require("../../structures/Command.js"),
  Discord = require("discord.js"),
  { getMember } = require("../../functions.js");

class Rank extends Command {
  constructor(client) {
    super(client, {
      name: "rank",
      description: language => language.get("RANK_DESCRIPTION"),
      usage: language => language.get("RANK_USAGE"),
      examples: language => language.get("RANK_EXEMPLES"),
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
    const member = getMember(message, args.join(" "));

    if (this.client.level.get(message.guild.id, "option") !== "off") {
      const key = `${message.guild.id}-${member.id}`;
      const UserXp = this.client.level.get(key, "xp");
      const UserLevel = this.client.level.get(key, "level") + 1;
      const MissingXp = UserLevel * 10 * (UserLevel * 10);
      const embed = new Discord.MessageEmbed().setColor(
        data.config.embed.color
      );

      function xprod(n, start1, stop1, start2, stop2) {
        return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
      }

      const xp = UserXp,
        nextLevel = MissingXp,
        barSize = 10;

      const Bar = xprod(xp, 0, nextLevel, 0, barSize);
      const ProgressBar = `${"<:dblCertified:392249976639455232>".repeat(
        Bar
      )}${"<:dblAdmin:483994951961673738>".repeat(barSize - Bar)}`;
      embed.setTitle("•__Rank__•");
      embed.setDescription(
        message.language.get(
          "RANK_PROGRESSBAR",
          UserLevel,
          ProgressBar,
          UserLevel + 1
        )
      );
      message.channel.send(embed);
    } else {
      message.reply(message.language.get("LEVEL_NOT_ON"));
    }
  }
}
module.exports = Rank;
