module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {
    this.client.settings.ensure(`${guild.id}`, {
      prefix: "p!",
      language: "english",
      logs: false,
      logs_channel: null,
      welcome: false,
      welcome_image: null,
      welcome_channel: null
    });
    this.client.level.ensure(guild.id, { option: "off" });
  }
}