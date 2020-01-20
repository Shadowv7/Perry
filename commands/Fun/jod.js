const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class JokeDay extends Command {
  constructor(client) {
    super(client, {
      name: "jod",
      description: language => language.get("JOD_DESCRIPTION"),
      usage: language => language.get("JOD_USAGE"),
      examples: language => language.get("JOD_EXEMPLES"),
      enabled: true,
      aliases: ["bdj"],
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
    const axios = require("axios");
    const token =
      "hXQhg8DAkcqnmTSQYDZSXzHcJ2PooNmFIMSMb6jaya_eTjfCHu2SB4UiW0Lcu-S-";
    const { MessageEmbed } = require("discord.js");
    const embed = new MessageEmbed().setColor("2BFAFA");
    if (this.client.settings.get(message.guild.id, "language") === "french") {
      axios({
        method: "get",
        url: "https://blague.xyz/api/joke/day",
        responseType: "application/JSON",
        headers: {
          Authorization: token
        }
      }).then(joke => {
        if (joke.data.status === 200) {
          embed
            .setTitle("•__Blague du jour__•")
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
          message.reply(`${this.client.config.emojis.error} | Une erreur est survenue !`);
        }
      });
    } else {
      axios({
        method: "get",
        url: "https://blague.xyz/api/joke/day?lang=en",
        responseType: "application/JSON",
        headers: {
          Authorization: token
        }
      }).then(joke => {
        if (joke.data.status === 200) {
          embed
            .setTitle("•__Joke of day__•")
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
          message.reply(`${this.client.config.emojis.error} | An error has occurred !`);
        }
      });
    }
  }
}
module.exports = JokeDay;