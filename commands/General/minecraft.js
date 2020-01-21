const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Minecraft extends Command {
  constructor(client) {
    super(client, {
      name: "minecraft",
      description: language => language.get("MINECRAFT_DESCRIPTION"),
      usage: language => language.get("MINECRAFT_USAGE"),
      examples: language => language.get("MINECRAFT_EXEMPLES"),
      enabled: true,
      aliases: ["mc"],
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
    const embed = new Discord.MessageEmbed();
    const ip = args.join(" ");
    if (!ip)
      return message.reply(
        message.language.get("MINECRAFT_NO_IP")
      );
    axios({
      method: "get",
      url: `https://api.mcsrvstat.us/2/${ip}`,
      responseType: "application/JSON"
    }).then(data => {
      //      console.log(data.data.icon.data)
      const r = data.data.description;
      embed
        //.setThumbnail(data.data.icon)
        .setColor("2bfafa")
        .addField(message.language.get("MINECRAFT_HEADING")[0], "```\n" + ip + "```")
        .addField(
          message.language.get("MINECRAFT_HEADING")[1],
          "```\n" +
            data.data.players.online +
            "/" +
            data.data.players.max +
            "```"
        )
        //.addField(":ping_pong: Ping", data.data.took.toString() + "ms")
        .addField(":gear: Version", "```\n" + data.data.version + "```");

      embed.addField("Motd", "```\n" + data.data.motd.clean + "```");
      message.channel.send(embed);
    }).catch(err => message.reply(message.language.get("MINECRAFT_ERROR")));
  }
}
module.exports = Minecraft;
