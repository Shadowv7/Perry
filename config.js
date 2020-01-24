module.exports = {
  /* YOUR DISCORD BOT TOKEN */
  token: "NjU4NTc5NTAzMTM1NTg4Mzky.XiqGDQ.0OYE2qBpoaqyO4dNYnwRjpa8gYU",

  /* DEFAULT GUILD CONFIGURATION */
  guildConf: {
    language: "english",
    prefix: "p!"
  },

  /* THE MONGODB URL */
  mongoDB: "mongodb://localhost:27017/Discbot",

  /* EMOJIS STRINGS LIKE <:emojiName:emojiID> */
  emojis: {
    success: "<:success:668110577947770894>",
    error: "<:error:668110576660250636>",
    loading: "<a:loading:668110577163304966>",
    categories: {
      fun: "<:fun:667627121107271681>",
      general: "<:general:667626887014514698>",
      images: "<:picture:667629000708980785>",
      owner: "<:owner:667627445830156298>",
      moderations: ":rotating_light:",
      economy: "<:coins:667642903254007828>",
      music:"<:musique:667627814027264000>"
    }
  },

  /* ARRAY OF BOT'S OWNERS IDs */
  owners: ["652145085999349791"],

  /* EMBED CONFIGURATION */
  embed: {
    color: "#2BFAFA",
    footer: "Perry | Discord Bot"
  },

  /* STATUS LIST (Playing to... or listen to...) */
  status: {
    updateEvery: 20000,
    list: [
      {
        type: "PLAYING",
        content: "On {guildsCount} servers!"
      },
      {
        type: "LISTENING",
        content: "{usersCount} users"
      }
    ]
  }
};
