const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");
const { getMember, formatDate } = require("../../functions.js");
const moment = require("moment");
class Userinfos extends Command {
  constructor(client) {
    super(client, {
      name: "userinfos",
      description: language => language.get("USERINFOS_DESCRIPTION"),
      usage: language => language.get("USERINFOS_USAGE"),
      examples: language => language.get("USERINFOS_EXEMPLES"),
      enabled: true,
      aliases: ["ui"],
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

    const joined = formatDate(member.joinedAt);
    let roles =
      member.roles
        .filter(r => r.id !== message.guild.id)
        .map(r => r)
        .join(", ") || "None";

    const created = formatDate(member.user.createdAt);
    let user = member;
    const USERINFOS_HEADING = message.language.get("USERINFOS_HEADING")
    const embed = new Discord.MessageEmbed()
      .setFooter(
        member.displayName,
        member.user.displayAvatarURL({ format: "png" })
      )
      .setThumbnail(member.user.displayAvatarURL({ format: "png" }))
      .setColor(0x2bfafa)

      .setTimestamp()

      .addField(USERINFOS_HEADING[0], `${user.user.username}`, true)
      .addField(USERINFOS_HEADING[1], user.id, true)
      .addField(USERINFOS_HEADING[2], `#${user.user.discriminator}`, true)
      .addField(USERINFOS_HEADING[3], member.user.bot ? "- ☑" : "- :x:", true)
      .addField(
        USERINFOS_HEADING[4],
        message.guild.member(user).nickname
          ? message.guild.member(user).nickname
          : "Aucun",
        true
      )

      .addField(
        USERINFOS_HEADING[4],
        `${moment(member.user.createdAt).format("DD/MM/YYYY")}`,
        true
      )

      .addField(USERINFOS_HEADING[6])
      .setThumbnail(member.user.displayAvatarURL({ format: "png" }));
    embed.fields[6].value = message.guild
      .member(user)
      .roles.map(s => s)
      .join(" | ");

    message.channel.send(embed).catch(err => {
      if (err.name == "DiscordAPIError" || err.name == "RangeError") {
        embed.fields[6].value = message.language.get("USERINFOS_ERROR");
        message.channel.send(embed);
      } else console.error(err);
    });
  }
}
module.exports = Userinfos;
