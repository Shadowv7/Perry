const Command = require("../../structures/Command.js");
const { get } = require("axios");
const endpoint = "captcha";
const { getMember } = require("../../functions.js");

class Captcha extends Command {
  constructor(client) {
    super(client, {
      name: endpoint,
      description: language => language.get("IMAGE_DESCRIPTION", endpoint),
      usage: language => language.get("IMAGE_USAGE", endpoint),
      examples: language => language.get("IMAGE_EXEMPLES", endpoint),
      enabled: true,
      aliases: [],
      clientPermissions: ["ATTACH_FILES"],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    const member = getMember(message, args.join(" "));
    if (!member)
      return message.reply(
        `${this.client.settings.get(
          message.guild.id,
          "prefix"
        )}${message.language.get("IMAGE_USAGE", endpoint)}`
      );
    let url = member.user.displayAvatarURL({ format: "jpg", size: 2048 });
    let username = member.user.username;
    get(
      `https://eclyssia-api.tk/api/v1/${endpoint}?url=${url}&username=${username}`,
      { responseType: "arraybuffer" }
    ).then(data => {
      message.channel.send({
        files: [
          {
            attachment: data.data,
            name: endpoint + ".png"
          }
        ]
      });
    });
  }
}
module.exports = Captcha;
