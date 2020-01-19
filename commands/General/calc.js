const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Calcul extends Command {
  constructor(client) {
    super(client, {
      name: "calcul",
      description: language => language.get("CALCUL_DESCRIPTION"),
      usage: language => language.get("CALCUL_USAGE"),
      examples: language => language.get("CALCUL_EXEMPLES"),
      enabled: true,
      aliases: ["calc"],
      clientPermissions: [],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    const math = require("math-expression-evaluator");
    try {
      if (!args.join(" "))
        return message.reply(message.language.get("CALCUL_NO_CALCUL"));
      let result = math.eval(args.join(" "));
      result = Math.round(result * 1000);
      result = result / 1000;
      if (Number.isNaN(result))
        return message.reply(message.langage.get("CALCUL_/0"));
      let embed = new Discord.MessageEmbed()
        .setColor(0x2BFAFA)
        .setAuthor(
          this.client.user.username,
          this.client.user.displayAvatarURL({ format: "png" })
        )
        .addField(
          "•__Calcul__•",
          `\`\`\`Js\n${args
            .join("")
            .replace(/[x]/gi, "*")
            .replace(/[,]/g, ".")
            .replace(/[÷]/gi, "/")}\`\`\``
        )
        .addField(message.language.get("CALCUL_RESULT"), `\`\`\`Js\n${result}\`\`\``);
      message.reply(embed);
    } catch (e) {
      message.reply(message.language.get("CALCUL_ERROR"));
    }
  }
}
module.exports = Calcul;