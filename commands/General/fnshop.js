const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const Client = require("fortnite");
const ft = new Client("8e3e5c23-3560-4ad0-8986-8c21821e6245");
const Command = require("../../structures/Command.js");
class Challenge extends Command {
  constructor(client) {
    super(client, {
      name: "fnchallenge",
      description: language => language.get("FN_CHALLENGE_DESCRIPTION"),
      usage: language => language.get("FN_CHALLENGE_USAGE"),
      examples: language => language.get("FN_CHALLENGE_EXAMPLES"),
      enabled: true,
      aliases: [],
      clientPermissions: [],
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
      .setTitle("•__Boutique de Fortnite__•")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp();

    store.sort((a, b) => {
      return b.vbucks - a.vbucks;
    });

    store.forEach(el => {
      embed.addField(
        el.name,
        stripIndents`- \`Rareté\` : ${el.rarity}
                - \`Prix\` :  ${el.vbucks} v-bucks
                - \`Image:\` [Cliquez ici](${el.image})`,
        true 
      );
    });

    message.channel.send(embed);
  }
}
