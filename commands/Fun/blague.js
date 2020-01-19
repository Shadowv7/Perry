const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Joke extends Command {
  constructor(client) {
    super(client, {
      name: "joke",
      description: language => language.get("BOTINFOS_DESCRIPTION"),
      usage: language => language.get("BOTINFOS_USAGE"),
      examples: language => language.get("BOTINFOS_EXEMPLES"),
      enabled: true,
      aliases: ["blague"],
      clientPermissions: [],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    const axios = require("axios");
    const token =
      "hXQhg8DAkcqnmTSQYDZSXzHcJ2PooNmFIMSMb6jaya_eTjfCHu2SB4UiW0Lcu-S-";
    const { MessageEmbed } = require("discord.js");
    const embed = new MessageEmbed().setColor("2BFAFA");
    if (this.client.settings.get(message.guild.id, "language") === "french") {
      axios({
        method: "get",
        url: "https://blague.xyz/api/joke/random",
        responseType: "application/JSON",
        headers: {
          Authorization: token
        }
      }).then(joke => {
        if (joke.data.status === 200) {
          embed
            .setTitle("•__Blague__•")
            .setDescription(
              joke.data.joke.question + "\n||" + joke.data.joke.answer + "||"
            )
            .setTimestamp()
            .setFooter(
              this.client.user.username,
              this.client.user.avatarURL({ format: "png" })
            );
          message.channel.send(embed);
        } else {
          message.reply("Une erreur est survenue!");
        }
      });
    } else {
      axios({
        method: "get",
        url: "https://blague.xyz/api/joke/random?lang=en",
        responseType: "application/JSON",
        headers: {
          Authorization: token
        }
      }).then(joke => {
        if (joke.data.status === 200) {
          embed
            .setTitle("•__Joke__•")
            .setDescription(
              joke.data.joke.question + "\n||" + joke.data.joke.answer + "||"
            )
            .setTimestamp()
            .setFooter(
              this.client.user.username,
              this.client.user.avatarURL({ format: "png" })
            );
          message.channel.send(embed);
        } else {
          message.reply("Une erreur est survenue!");
        }
      });
    }
  }
}
module.exports = Joke;
