const Command = require("../../structures/Command.js"),
  Discord = require("discord.js"),
  fetch = require("node-fetch"),
  { stripIndents } = require("common-tags");

class Insta extends Command {
  constructor(client) {
    super(client, {
      name: "instagram",
      description: language => language.get("INSTAGRAM_DESCRIPTION"),
      usage: language => language.get("INSTAGRAM_USAGE"),
      examples: language => language.get("INSTAGRAM_EXEMPLES"),
      enabled: true,
      aliases: ["insta"],
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
    const insta = message.language.get("INSTAGRAM_HEADING");
    const account = res.graphql.user;
    const embed = new Discord.MessageEmbed()
      .setColor("2BFAFA")
      .setTitle(account.full_name)
      .setURL(`https://instagram.com/${name}`)
      .setThumbnail(account.profile_pic_url_hd)
      .addField(
        "Informations",
        stripIndents`${insta[0]}${account.username}
            ${insta[1]}${
          account.full_name.length == 0
            ? message.language.get("INSTAGRAM_NOT_PROVIDED")
            : account.full_name
        }
            ${insta[2]}${
          account.biography.length == 0
            ? message.language.get("INSTAGRAM_NOT_PROVIDED")
            : account.biography
        }
            ${insta[3]}${account.edge_owner_to_timeline_media.count}
            ${insta[4]}${account.edge_followed_by.count}
            ${insta[5]}${account.edge_follow.count}
            ${insta[6]}${account.is_private ? insta[7] : insta[8]}`
      );

    message.channel.send(embed);
  }
}
module.exports = Insta;
