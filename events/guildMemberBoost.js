module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(member) {
    const channel = member.guild.channels.get(
      this.client.settings.get(member.guild.id, "logs-channel")
    );
    if (!channel) return;
    const language = new (require(`../languages/${this.client.settings.get(
        member.guild.id,
        "language"
      )}.js`))(),
      title = language.get("BOOSTER_TITLE"),
      message = language.get("BOOSTER_MESSAGE", member);
    channel.send({
      embed: {
        color: 0x2bfafa,
        title: title,
        description: message
      }
    });
  }
};