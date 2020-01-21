const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Fortnite extends Command {
  constructor(client) {
    super(client, {
      name: "fnstats",
      description: language => language.get("FNSTATS_DESCRIPTION"),
      usage: language => language.get("FNSTATS_USAGE"),
      examples: language => language.get("FNSTATS_EXEMPLES"),
      enabled: true,
      aliases: ["ft","fortnite"],
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
    const Client = require("fortnite");
    const fortnite = new Client("8e3e5c23-3560-4ad0-8986-8c21821e6245");

    let username = args.slice(1).join(" ");
    let platform = args[0];
    if (platform == "PC") platform = args[0].replace("PC", "pc");
    if (platform == "PSN") platform = args[0].replace("PSN", "psn");
    if (platform == "XBL") platform = args[0].replace("XBL", "xbl");
    let e = ["psn", "pc", "xbl", "PC", "PSN", "XBL"];

    if (!args[0])
      return message.channel.send(
        message.language.get("FN_STATS_NO_PLATFORM")
      );

    if (
      platform &&
      !["psn", "PSN", "pc", "PC", "xbl", "XBL"].includes(platform)
    )
      return message.reply(message.language.get("FN_STATS_PLATFORM_NOT_FOUND",args[0]));
    if (!args.slice(1).join(" "))
      return message.channel.send(
       message.language.get("FN_STATS_NO_USER")
      );
    fortnite
      .user(username, platform)
      .then(data => {
         const categories = message.language.get("FN_STATS_HEADING")
        let stats = data.stats;
        let lifetime = stats.lifetime;
        let solo = stats.solo;
        let duo = stats.duo;
        let squad = stats.squad;

        let t = (100 * solo.wins || 0) / solo.matches || 0;
        let swinrate = Math.round(t * 10) / 10;
        let u = (100 * duo.wins || 0) / duo.matches || 0;
        let dwinrate = Math.round(u * 10) / 10;
        let r = (100 * squad.wins || 0) / squad.matches || 0;
        let sqwinrate = Math.round(t * 10) / 10;
        let embed = new Discord.MessageEmbed()
          .addField(
            "👤 Solo ❯",
            `\n **${solo.wins || 0}** ${categories[0]}\n**${swinrate ||
              0} %** ${categories[0]}\n**${solo.kills ||
              0}** ${categories[1]}\n**${solo.matches || 0}** ${categories[2]}\n**${solo.kd ||
              0}** ${categories[3]}`,
            true
          )
          .addField(
            "👥 Duo ❯",
            `\n **${duo.wins || 0}** ${categories[0]}\n**${dwinrate ||
              0} %** ${categories[0]}\n**${duo.kills ||
              0}** ${categories[1]}\n**${duo.matches || 0}** ${categories[2]}\n**${duo.kd ||
              0}** ${categories[3]}`,
            true
          )
          .addField(
            "👨‍👨‍👧‍👦 Squad ❯",
            `\n **${squad.wins || 0}** ${categories[0]}\n**${sqwinrate ||
              0} %** ${categories[0]}\n**${squad.kills ||
              0}** ${categories[1]}\n**${squad.matches || 0}** ${categories[2]}\n**${squad.kd ||
              0}** ${categories[3]}`,
            true
          )
          .setTitle(message.language.get("FN_STATS_TITLE",data.username))
          .setColor(0x2bfafa)
          .setThumbnail(
            "https://cdn.glitch.com/dbf12b4c-377e-44c3-97b7-8c3c83dcd80e%2F8e1abc97-2117-4406-946c-517b52daf2b0.image.jpeg?v=1575899784269"
          )
          .setTimestamp()
          .setFooter(
            this.client.user.username,
            this.client.user.avatarURL({ format: "png" })
          );

        message.channel.send(embed);
      })
      .catch(err => {
        message.reply(message.language.get("FN_STATS_USER_NOT_FOUND"));
        console.error(err);
      });
  }
}
module.exports = Fortnite;
