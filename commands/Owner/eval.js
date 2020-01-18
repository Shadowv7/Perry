//€
const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Eval extends Command {
  constructor(client) {
    super(client, {
      // The name of the command
      name: "eval",
      // Whether the command is enabled, or not
      enabled: true,
      // Some command informations to display in the help command
      description: language => language.get("EVAL_DESCRIPTION"),
      usage: language => language.get("EVAL_USAGE"),
      examples: language => language.get("EVAL_EXAMPLES"),
      // The other names that can trigger the command
      aliases: ["e"],
      // The permissions needed by the bot to run the command
      clientPermissions: [],
      // The level of permissions required by the user to run the command.
      permLevel: 4,
      // // The time it will take a user before he can execute the command again
      cooldown: 1000,
      // The file path of the command. It will be used to determine what's the command category
      commandPath: __dirname,
      // Whether the command can only be run in a guild, or not
      guildOnly: true,
      // Whether the command needs to be run in a NSFW channel
      nsfw: false
          });
  }

  async run(message, args) {
    const key = `${message.guild.id}-${message.author.id}`;
    const ms = require("ms");
    const backup = require("discord-backup");
    const tims = require("tims");
    const clean = text => {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    };
    const Client = require("fortnite");
    const fortnite = new Client("8e3e5c23-3560-4ad0-8986-8c21821e6245");
    const ID = ["652145085999349791"];
    const { inspect } = require("util");
    if (!ID.includes(message.author.id)) return;
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