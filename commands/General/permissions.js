
const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Perm extends Command {
  constructor(client) {
    super(client, {
      name: "permissions",
      description: language => language.get("PERMS_DESCRIPTION"),
      usage: language => language.get("PERMS_USAGE"),
      examples: language => language.get("PERMS_EXEMPLES"),
      enabled: true,
      aliases: ["perms"],
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
    const { getMember } = require("../../functions.js")
    const membre = getMember(message,args.join(" "))
    const object = message.channel.permissionsFor(membre).serialize();
    const array = Object.entries(object);
    const permission = array
      .map(e => e[0] + " :" + (e[1] ? " ☑️ " : " ❌ "))
      .join("\n");

    message.channel.send({
      embed: {
        color: 0x2bfafa,
        description: permission,
        title: message.language.get("PERMS_TITLE",membre.user.username)
      }
    })
  }
}
module.exports = Perm;