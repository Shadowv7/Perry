
const Canvas = require("canvas");

const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");
  let fontSize = 70;
  do {
    ctx.font = `${(fontSize -= 10)}px Ubuntu Bold}`;
  } while (ctx.measureText(text).width > canvas.width - 300);
  return ctx.font;
};
const snekfetch = require("snekfetch"),
  Discord = require("discord.js");
module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(member) {
    // const Canvas = require("canvas");
    const channel = member.guild.channels.find(
      ch =>
        ch.id === this.client.settings.get(member.guild.id, "welcome_channel")
    );
    const language = new(require(`../languages/${this.client.settings.get(member.guild.id,"language")}.js`))
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
      this.client.settings.get(member.guild.id, "welcome_image")
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = "28px Ubuntu Bold";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
     language.get("WELCOME_MESSAGE"),
      canvas.width / 2.5,
      canvas.height / 3.5
    );

    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `${member.displayName}!`,
      canvas.width / 2.5,
      canvas.height / 1.8
    );

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const { body: buffer } = await snekfetch.get(
      member.user.displayAvatarURL({ format: "png" })
    );
    const avatar = await Canvas.loadImage(buffer);
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "welcome-image.png"
    );

    channel.send(language.get("WELCOME_IMAGE",member), attachment);
  }
};
