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
      clientPermissions: [],
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
        `Avez-vous saisit la plateform ? Utilisation: \`${this.client.settings.get(message.guild.id,"prefix")}fortnite <platform> <pseudo>\``
      );

    if (
      platform &&
      !["psn", "PSN", "pc", "PC", "xbl", "XBL"].includes(platform)
    )
      return message.reply(":x: | Veuillez saisir une plateform correcte!");
    if (!args.slice(1).join(" "))
      return message.channel.send(
        ":x: | Veuillez préciser le nom d'un joueur de Fortnite"
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
            `\n **${solo.wins || 0}** ${categories[0]}\n**${swinrate ||
              0} %** ${categories[0]}\n**${solo.kills ||
              0}** ${categories[1]}\n**${solo.matches || 0}** ${categories[2]}\n**${solo.kd ||
              0}** ${categories[3]}`,
            true
          )
          .addField(
            "👨‍👨‍👧‍👦 Squad ❯",
            `\n **${squad.wins || 0}** Victoire(s)\n**${sqwinrate ||
              0} %** Victoire(s)\n**${squad.kills ||
              0}** Kill(s)\n**${squad.matches || 0}** Partie(s)\n**${squad.kd ||
              0}** K/D`,
            true
          )
          .setTitle("Statistique Fortnite de " + data.username)
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
        message.reply(":x: | Ce joueur est introuvable.");
        console.error(err);
      });
  }
}
module.exports = Fortnite;
