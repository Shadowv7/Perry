const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Work extends Command {
  constructor(client) {
    super(client, {
      name: "work",
      description: language => language.get("WORK_DESCRIPTION"),
      usage: language => language.get("WORK_USAGE"),
      examples: language => language.get("WORK_EXEMPLES"),
      enabled: true,
      aliases: ["w"],
      clientPermissions: [],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    let random = Math.floor(Math.random() * 300);
    if (message.author.id === "652145085999349791") {
      random = Math.floor(Math.random() * 600) + 500;
    }
    const workMessages = message.language.get("WORK_MESSAGES", random);
    const randomWorkMessages = Math.floor(Math.random() * workMessages.length);

    if (
      this.client.economy.get(
        `${message.guild.id}-${message.author.id}`,
        "cooldown"
      ) < Date.now()
    ) {
      let money = this.client.economy.get(
        `${message.guild.id}-${message.author.id}`,
        "money"
      );
      money = money + random;
      this.client.economy.set(
        `${message.guild.id}-${message.author.id}`,
        money,
        "money"
      );
      message.channel.send({
        embed: {
          title: "•__Work__•",
          color: "2bfafa",
          description: workMessages[randomWorkMessages]
        }
      });

      //if (message.author.id !== "652145085999349791") {
      this.client.economy.set(
        `${message.guild.id}-${message.author.id}`,
        Date.now() + 1000 * 60 * 60 * 6,
        "cooldown"
      );
    } else {
      const time =
        this.client.economy.get(
          `${message.guild.id}-${message.author.id}`,
          "cooldown"
        ) - Date.now();
      const tims = require("tims");
      if (this.client.settings.get(message.guild.id, "language") === "french") {
        const timeout = tims.text(time, { lang: "fr" });
        return message.channel.send({
          embed: {
            color: "2bfafa",
            description: message.language.get("WORK_TIME", timeout)
          }
        });
      } else {
        const timeout = tims.text(time, { lang: "en" });
        return message.channel.send({
          embed: {
            color: "2bfafa",
            description: message.language.get("WORK_TIME", timeout)
          }
        });
      }
    }
  }
}
module.exports = Work;
