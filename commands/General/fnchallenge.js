const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const Client = require("fortnite");
const ft = new Client("8e3e5c23-3560-4ad0-8986-8c21821e6245");
const Command = require("../../structures/Command.js")
class Challenge extends Command {
  constructor(client) {
    super(client, {
      name: "fnchallenge",
      description: language => language.get("FN_CHALLENGE_DESCRIPTION"),
      usage: language => language.get("FN_CHALLENGE_USAGE"),
      examples: language => language.get("FN_CHALLENGE_EXEMPLES"),
      enabled: true,
      aliases: [],
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
    const c = await ft.challenges();
    console.log(c)
    const embed = new MessageEmbed()
      .setColor("#2BFAFA")
      .setTitle("•__Fortnite Challenge__•")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp()
      
    c.forEach(el => {
      embed.setThumbnail(el.reward_picture_url)
      embed.addField("- `"+ el.name+ "`","━━━━━━━━━━━━━━━━━━━━",true);
      
    });

    message.channel.send(embed);
  }
}
module.exports = Challenge;