const util = require("util"),
  fs = require("fs"),
  mongoose = require("mongoose"),
  readdir = util.promisify(fs.readdir),
  permissions = require("./helpers/permissions");

// Load Client class
const Client = require("./structures/Client"),
  client = new Client(),
  logs = require("discord-logs");
logs(client);
const http = require("http");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(3000);
setInterval(() => {
  http.get(`https://superficial-monday-fujrnj7456.glitch.me`);
}, 280000);

const init = async () => {
  // Searches and loads all commands in all categories
  let categories = await readdir("./commands/");
  client.logger.log(`Chargement de ${categories.length} categories.`, "log");
  categories.forEach(async cat => {
    let commands = await readdir(`./commands/${cat}/`);
    commands
      .filter(cmd => cmd.split(".").pop() === "js")
      .forEach(cmd => {
        const response = client.loadCommand(`./commands/${cat}`, cmd);
        if (response) client.logger.log(response, "error");
      });
  });

  // Searches and loads all events, like the ready event
  const evtFiles = await readdir("./events/");
  client.logger.log(`Chargement de : ${evtFiles.length} events.`, "log");
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Chargement des events : ${eventName}`);
    const event = new (require(`./events/${file}`))(client);
    client.on(eventName, (...args) => event.run(...args));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  client.login(client.config.token);
};

init();

client
  .on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
  .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
  .on("error", e => client.logger.log(e, "error"))
  .on("warn", info => client.logger.log(info, "warn"));
process.on("unhandledRejection", err => {
  client.logger.log("Uncaught Promise Error: " + err, "error");
});
