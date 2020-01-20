const Command = require("../../structures/Command.js"),
  Discord = require("discord.js"),
  fetch = require("node-fetch"),
  { stripIndents } = require("common-tags")

class Insta extends Command {
  constructor(client) {
    super(client, {
      name: "instagram",
      description: language => language.get("INSTAGRAM_DESCRIPTION"),
      usage: language => language.get("INSTAGRAM_USAGE"),
      examples: language => language.get("INSTAGRAM_EXEMPLES"),
      enabled: true,
      aliases: ["insta"],
      clientPermissions: [],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    const name = args.join(" ");

    if (!name) {
      return message.reply(message.language.get("INSTAGRAM_NO_NAME"));
    }
    if (
      args
        .join(" ")
        .split("")
        .join(" ").length <= 2
    ) {
      return message.reply(message.language.get("INSTAGRAM_NAME_NOLONG"));
    }
    const url = `https://instagram.com/${name}/?__a=1`;

    let res;

    try {
      res = await fetch(url).then(url => url.json());
    } catch (e) {
      return message.reply(message.language.get("INSTAGRAM_ERROR"));
    }

    const account = res.graphql.user;
    const embed = new Discord.MessageEmbed()
      .setColor("2BFAFA")
      .setTitle(account.full_name)
      .setURL(`https://instagram.com/${name}`)
      .setThumbnail(account.profile_pic_url_hd)
      .addField(
        "Informations",
        stripIndents`- \`Pseudo\` : ${account.username}
            - \`Nom\` : ${
              account.full_name.length == 0 ? "Non fournis" : account.full_name
            }
            - \`Bio\` : ${
              account.biography.length == 0 ? "Non fournis" : account.biography
            }
            - \`Publications\` : ${account.edge_owner_to_timeline_media.count}
            - \`Abonnés\` : ${account.edge_followed_by.count}
            - \`Abonnement\` :  ${account.edge_follow.count}
            - \`Compte privé\` : ${account.is_private ? "Oui 🔐" : "Non 🔓"}`
      );

    message.channel.send(embed);
  }
}
module.exports = Insta;