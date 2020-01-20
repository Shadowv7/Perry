const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Help extends Command {
  constructor(client) {
    super(client, {
      // The name of the command
      name: "help",
      //      category: language => language.get("HELP_CATEGORIES")[4],
      // Whether the command is enabled, or not
      enabled: true,
      // Some command informations to display in the help command
      description: language => language.get("HELP_DESCRIPTION"),
      usage: language => language.get("HELP_USAGE"),
      examples: language => language.get("HELP_EXEMPLES"),
      // The other names that can trigger the command
      aliases: ["h"],
      // The permissions needed by the bot to run the command
      clientPermissions: ["EMBED_LINKS"],
      memberPermissions: [],
      // The level of permissions required by the user to run the command.
      permLevel: 0,
      // // The time it will take a user before he can execute the command again
      cooldown: 1000,
      // The file path of the command. It will be used to determine what's the command category
      commandPath: __dirname,
      // Whether the command can only be run in a guild, or not
      guildOnly: false,
      // Whether the command needs to be run in a NSFW channel
      nsfw: false
    });
  }

  async run(message, args, data) {
    if (args[0]) {
      // If the command doesn't exist, displays an error message
      let cmd =
        this.client.commands.get(args[0]) ||
        this.client.commands.get(message.client.aliases.get(args[0]));
      if (!cmd)
        return message.channel.send(
          message.language.get("HELP_CMD_NOT_FOUND", args[0])
        );

      // Replace $ caract with the server prefix
      let examples = cmd.help
        .examples(message.language)
        .replace("$", this.client.settings.get(message.guild.id, "prefix"));

      // Creates the help embed
      let groupEmbed = new Discord.MessageEmbed()
        .setAuthor(
          message.language.get("HELP_HEADINGS")[0] + " " + cmd.help.name
        )
        .addField(
          message.language.get("HELP_HEADINGS")[1],
          this.client.settings.get(message.guild.id, "prefix") +
            cmd.help.usage(message.language),
          true
        )
        .addField(message.language.get("HELP_HEADINGS")[2], examples, true)
        .addField(
          message.language.get("HELP_HEADINGS")[3],
          cmd.help.category,
          true
        )
        .addField(
          message.language.get("HELP_HEADINGS")[4],
          cmd.help.description(message.language),
          true
        )
        .addField(
          message.language.get("HELP_HEADINGS")[5],
          cmd.conf.aliases.length > 0
            ? cmd.conf.aliases.map(a => "`" + a + "`").join("\n")
            : message.language.get("HELP_NO_ALIASES"),
          true
        )
        .addField(
          message.language.get("HELP_HEADINGS")[6],
          message.language.get("PERM_LEVELS")[cmd.conf.permLevel],
          true
        )
        .setColor(data.config.embed.color)
        .setFooter(data.config.embed.footer);

      // and send the embed in the current channel
      return message.channel.send(groupEmbed);
    }

    /* Get the list of categories */
    const categories = [];
    this.client.commands.forEach(cmd => {
      if (!categories.includes(cmd.help.category)) {
        categories.push(cmd.help.category);
      }
    });

    let embed = new Discord.MessageEmbed()
      .setAuthor(
        this.client.user.username + " | " + message.language.get("HELP_TITLE")
      )
      .setDescription(
        message.language.get(
          "HELP_SUBTITLE",
          this.client.settings.get(message.guild.id, "prefix")
        )
      )
      .setColor(data.config.embed.color)
      .setFooter(data.config.embed.footer);

    /* FIELDS GEN */

    const commands = message.client.commands;

    commands.forEach(command => {
      if (!categories.includes(command.help.category)) {
        if (
          command.help.category === "Owner" &&
          message.author.id !== message.client.config.owner.id
        ) {
          return;
        }
        categories.push(command.help.category);
      }
    });

    let emojis = this.client.config.emojis;

    let newembed = new Discord.MessageEmbed()
      .setDescription(
        message.language.get(
          "HELP_SUBTITLE",
          this.client.settings.get(message.guild.id, "prefix")
        )
      )
      .setColor(data.config.embed.color)
      .setFooter(data.config.embed.footer)
      .setAuthor(
        this.client.user.username,
        this.client.user.displayAvatarURL({ format: "png" })
      );
    categories.sort().forEach(cat => {
      let tCommands = commands.filter(cmd => cmd.help.category === cat);
      newembed.addField(
        emojis.categories[cat.toLowerCase()] +
          " " +
          cat +
          " - (" +
          tCommands.size +
          ")",
        tCommands.map(cmd => "`" + cmd.help.name + "`").join(", ")
      );
    });

    message.channel.send(newembed);
  }
}

module.exports = Help;
