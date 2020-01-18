module.exports = {

    /* YOUR DISCORD BOT TOKEN */
    token: "NjYzNDYzNzUyNTE1MTkwNzk1.XiM_mg.7WGzF2JvTjc0zCEIcBhKoK2tRUo",

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
        loading: "<a:loading:668110577163304966>"
    },

    /* ARRAY OF BOT'S OWNERS IDs */
    owners: [],

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
