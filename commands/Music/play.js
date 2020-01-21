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
      clientPermissions: ["CONNECT","SPEAK","EMBED_LINKS"],
      permLevel: 0,
      cooldown: 5000,
      commandPath: __dirname,
      guildOnly: true,
      nsfw: false
    });
  }

  async run(message, args, data) {
    if(!args.join(" ")) return message.reply(message.language.get("PLAY_NO_MUSIQUE"))
    if (!this.client.player.isPlaying(message.guild.id)) {
      this.client.player
        .play(message.member.voice.channel, args.join(" "))
        .then(song => {
          message.channel.send({embed: {color: "2bfafa",thumbnail:{url: song.thumbnail},description:`Je joue actuelement [\`${song.name}\`](${song.url}).`}});
          song.queue

            .on("end", () => {
              message.channel.send("Il n'y a plus de musique dans la queue!");
            })
            .on("songChanged", (oldSong, newSong) => {
            
              message.channel.send({embed: {color: "2bfafa",thumbnail:{url: newSong.thumbnail},description:`Je joue actuelement [\`${newSong.name}\`](${newSong.url}).`}});
         
            });
        })
        .catch(e => {
          console.log(e);
          message.reply("Je ne trouve pas la musique " + args.join(" ") + ".");
        });
    } else {
      this.client.player
        .addToQueue(message.guild.id, args.join(" "))
        .then(song => {
          message.channel.send({embed: {color: "2bfafa",thumbnail:{url: song.thumbnail},description:`[\`${song.name}\`](${song.url}) a été ajouté à la queue!`}});
         
        })
        .catch(err =>
          message.reply("Je ne trouve pas la musique `" + args.join(" ") + "`.")
        );
    }
  }
}
module.exports = Play;