const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const Client = require("fortnite");
const ft = new Client("8e3e5c23-3560-4ad0-8986-8c21821e6245");
const Command = require("../../structures/Command.js");
class Shop extends Command {
  constructor(client) {
    super(client, {
      name: "fnshop",
      description: language => language.get("FN_STORE_DESCRIPTION"),
      usage: language => language.get("FN_STORE_USAGE"),
      examples: language => language.get("FN_STORE_EXEMPLES"),
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
    const store = await ft.store();
    
    const embed = new MessageEmbed()
      .setColor("#2BFAFA")
      .setTitle("•__Fortnite Store__•")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp();

    store.sort((a, b) => {
      return b.vbucks - a.vbucks;
    });

    store.forEach(el => {
      embed.addField(
        el.name,
        stripIndents`- \`${message.language.get("FN_STORE_HEADING")[0]}\` : ${el.rarity}
                - \`${message.language.get("FN_STORE_HEADING")[1]}\` :  ${el.vbucks} v-bucks
                - \`${message.language.get("FN_STORE_HEADING")[2]}:\` [${message.language.get("FN_STORE_HEADING")[3]}](${el.image})`,
        true 
      );
    });

    message.channel.send(embed);
  }
}
module.exports = Shop;