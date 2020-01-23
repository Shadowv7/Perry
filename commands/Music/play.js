const Command = require("../../structures/Command.js"),
  Discord = require("discord.js");

class Play extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      description: language => language.get("PLAY_DESCRIPTION"),
      usage: language => language.get("PLAY_USAGE"),
      examples: language => language.get("PLAY_EXEMPLES"),
      enabled: true,
      aliases: ["p"],
      clientPermissions: ["EMBED_LINKS"],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    process.on("unhandledRejection", e => {
      console.error(e);
    });
    if (!args.join(" "))
      return message.reply(message.language.get("PLAY_NO_MUSIC"));
    let voice = message.member.voice.channel;
    if (!voice) return message.reply(message.language.get("JOIN_CHANNEL"));
    let perms = voice.permissionsFor(message.client.user);
    if (!perms.has("CONNECT") || !perms.has("SPEAK")) {
      return message.channel.send(
        message.language.get("ERR_CMD_USERS_PERMISSIONS", ["SPEAK", "CONNECT"])
      );
    }
  
    if (!this.client.player.isPlaying(message.guild.id)) {
      this.client.player
        .play(message.member.voice.channel, args.join(" "))
        .then(song => {
          message.channel.send({
            embed: {
              color: "2bfafa",
              thumbnail: { url: song.thumbnail },
              description: message.language.get(
                "NOW_PLAYING",
                `[\`${song.name}\`](${song.url})`
              )
            }
          });
          song.queue

            .on("end", () => {
              message.channel.send(message.language.get("QUEUE_END"));
            })
            .on("songChanged", (oldSong, newSong) => {
              message.channel.send({
                embed: {
                  color: "2bfafa",
                  thumbnail: { url: newSong.thumbnail },
                  description: message.language.get(
                    "NOW_PLAYING",
                    `[\`${song.name}\`](${song.url})`
                  )
                }
              });
            });
        })
        .catch(e => {
          console.log(e);
          message.reply(message.language.get("CANT_FIND_MUSIC"));
        });
    } else {
      let queue = await this.client.player.getQueue(message.guild.id);
      if (message.member.voice.channel.id !== queue.connection.channel.id) {
        return message.channel.send(message.language.get("SAME_CHANNEL"));
      }
      if(queue.songs.length > 20) return message.reply(message.language.get("QUEUE_MAX"))
      this.client.player
        .addToQueue(message.guild.id, args.join(" "))
        .then(song => {
          message.channel.send({
            embed: {
              color: "2bfafa",
              thumbnail: { url: song.thumbnail },
              description: message.language.get(
                "ADD_TO_QUEUE",
                `[\`${song.name}\`](${song.url})`
              )
            }
          });
        })
        .catch(err => message.reply(message.language.get("CANT_FIND_MUSIC")));
    }
  }
}
module.exports = Play;
