module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(member) {
    const channel = member.channel.find(
      c => c.id === this.client.settings.get(member.guild.id, "logschannel")
    );
    if (!channel) return;
    channel.send({
      embed: {
        color: 0x2BFAFA,
        title: member.language.get("BOOSTER_TITLE"),
        description: member.language.get("BOOSTER_MESSAGE",member,member.guild.name)
      }
    });
  }
};
