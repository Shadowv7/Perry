const Discord = require("discord.js"),
  cmdCooldown = {};

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    const data = {};

    if (message.author.bot) return;

    if (message.guild && !message.member)
      await message.guild.members.fetch(message.author.id);

    data.config = this.client.config;

    
    

    let Language = require(`../languages/${this.client.settings.get(
      message.guild.id,
      "language"
    )}.js`);
    message.language = new Language();
    this.client.economy.ensure(`${message.guild.id}-${message.author.id}`, {
      guild: message.guild.id,
      user: message.author.id,
      money: 0,
      cooldown: 0,
      crimecooldown: 0
    });
    if (this.client.level.get(message.guild.id, "option") !== "off") {
      this.client.level.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      xp: 0,
      level: 0
    });
      const key = `${message.guild.id}-${message.author.id}`;
      const xp = Math.floor(Math.random() * 10 + 1);
      this.client.level.math(key, "+", xp, "xp");

      const curLevel = Math.floor(
        0.1 *
          Math.sqrt(
            this.client.level.get(
              `${message.guild.id}-${message.author.id}`,
              "xp"
            )
          )
      );
      if (this.client.level.get(key, "level") < curLevel) {
        message.channel.send(
          message.language.get("LEVELUP_MESSAGE", message.author.id, curLevel)
        );
        this.client.level.set(key, curLevel, "level");
      }
    }

    const prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
    if (message.content.match(prefixMention))
      return message.reply(
        message.language.get(
          "PREFIX_INFO",
          this.client.settings.get(message.guild.id, "prefix")
        )
      );

    let prefix = this.client.settings.get(message.guild.id, "prefix");
    if (!message.content.startsWith(prefix)) return;
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    let cmd =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));

    if (!cmd) return;
    data.cmd = cmd;

    if (cmd.conf.guildOnly && !message.guild) {
      return message.channel.send(message.language.get("ERR_CMD_GUILDONLY"));
    }

    if (message.guild) {
      /* Client permissions */
      const neededPermissions = [];
      cmd.conf.clientPermissions.forEach(permission => {
        if (!message.channel.permissionsFor(message.guild.me).has(permission)) {
          neededPermissions.push(permission);
        }
      });
      if (neededPermissions.length > 0)
        return message.channel.send(
          message.language.get("ERR_CMD_CLIENT_PERMISSIONS", neededPermissions)
        );
      /* Member permissions */
      const needPermissions = [];
      cmd.conf.memberPermissions.forEach(permission => {
        if (!message.channel.permissionsFor(message.member).has(permission)) {
          needPermissions.push(permission);
        }
      });
      if (needPermissions.length > 0)
        return message.channel.send(
          message.language.get("ERR_CMD_CLIENT_PERMISSIONS", needPermissions)
        );
      /* User permissions */
      const permLevel = await this.client.getLevel(message);
      if (permLevel < cmd.conf.permLevel) {
        let levelName = message.language.get("PERM_LEVELS")[cmd.conf.permLevel];
        let userLevel = message.language.get("PERM_LEVELS")[permLevel];
        return message.channel.send(
          message.language.get("ERR_CMD_USER_PERMISSIONS", levelName, userLevel)
        );
      }

      /* NSFW */
      if (!message.channel.nsfw && cmd.conf.nsfw) {
        return message.channel.send(language.get("ERR_CMD_NSFW"));
      }
    }

    if (!cmd.conf.enabled) {
      return message.channel.send(language.get("ERR_CMD_DISABLED"));
    }

    /* Cooldown */
    let uCooldown = cmdCooldown[message.author.id];
    if (!uCooldown) {
      cmdCooldown[message.author.id] = {};
      uCooldown = cmdCooldown[message.author.id];
    }
    let time = uCooldown[cmd.help.name] || 0;
    if (time && time > Date.now()) {
      return message.channel.send(
        message.language.get(
          "ERR_CMD_COOLDOWN",
          Math.ceil((time - Date.now()) / 1000)
        )
      );
    }
    cmdCooldown[message.author.id][cmd.help.name] =
      Date.now() + cmd.conf.cooldown;

    this.client.logger.log(
      `${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`,
      "cmd"
    );
    try {
      cmd.run(message, args, data);
    } catch (e) {
      console.error(e);
      return message.channel.send(message.language.get("ERR_OCCURRED"));
    }
  }
};
