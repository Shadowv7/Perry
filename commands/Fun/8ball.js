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
      clientPermissions: [],
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
        "votre question doit être composée d'au moins 2 mots."
      );

    if (!message.content.includes("?"))
      return message.reply("Vous devez poser une **question**.");
    const réponse = [
      "Bien sûr.",
      "Je ne sais pas.",
      "Oui.",
      "Non.",
      "Impossible !"
    ];
    const a = réponse[Math.floor(Math.random() * réponse.lenght)];
    message.reply(
      `:8ball: | ${réponse[Math.floor(Math.random() * réponse.length)]}`
    );
  }
}
module.exports = Ball;
