const Command = require("../../structures/Command.js"),
  Discord = require("discord.js"),
  { inspect } = require("util");

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      description: language => language.get("EVAL_DESCRIPTION"),
      usage: language => language.get("EVAL_USAGE"),
      examples: language => language.get("EVAL_EXEMPLES"),
      enabled: true,
      aliases: ["e"],
      clientPermissions: [],
      permLevel: 5,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    const clean = text => {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
    try {
      const code = args.join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {
        code: "xl"
      });
      console.log(clean(evaled));
    } catch (err) {
      message.channel.send(`\`ERREUR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
}
module.exports = Eval;
