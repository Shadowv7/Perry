const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Ball extends Command {
  constructor(client) {
    super(client, {
      name: "8ball",
      description: language => language.get("BALL_DESCRIPTION"),
      usage: language => language.get("BALL_USAGE"),
      examples: language => language.get("BALL_EXEMPLES"),
      enabled: true,
      aliases: ["bi"],
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
    let i = args.join(" ");
    if (!args.slice(1).join(" "))
      return message.reply(
        message.language.get("BALL_NO_TEXT") );

    if (!message.content.includes("?"))
      return message.reply(message.language.get("BALL_NO_QUESTION"));
    const réponse =message.language.get("BALL_RESPONSE")
    const a = réponse[Math.floor(Math.random() * réponse.lenght)];
    message.reply(
      `:8ball: | ${réponse[Math.floor(Math.random() * réponse.length)]}`
    );
  }
}
module.exports = Ball;
