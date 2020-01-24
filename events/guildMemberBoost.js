module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(member) {
    const channel = member.guild.channels.get(
      this.client.settings.get(member.guild.id, "logs-channel")
    );
    if (!channel) return;
    channel.send({
      embed: {
        color: 0x2bfafa,
        title: member.language.get("BOOSTER_TITLE"),
        description: member.language.get(
          "BOOSTER_MESSAGE",
          member
        )
      }
    });
  }
};
  
