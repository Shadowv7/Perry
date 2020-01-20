const Command = require("../../structures/Command.js"),
  Discord = require("discord.js"),
  { getMember } = require("common-tags");

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
      const embed = new Discord.MessageEmbed().setColor(data.embed.color);

      function xprod(n, start1, stop1, start2, stop2) {
        return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
      }
      const number = 50 / 5;
      const max = 100 / 5;
      const ProgressBar = xprod(number, 0, max, 0, max);
      const barStr = `\`\`\`[${"■".repeat(ProgressBar)}${"-".repeat(
        max - ProgressBar
      )}]\`\`\``;
    }
  }
}
module.exports = Rank;
