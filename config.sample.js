module.exports = {

    /* YOUR DISCORD BOT TOKEN */
    token: "Your Discord Bot Token here",

    /* DEFAULT GUILD CONFIGURATION */
    guildConf: {
        language: "english",
        prefix: "p!"
    },
    
    /* THE MONGODB URL */
    mongoDB: "mongodb://localhost:27017/Discbot",

    /* EMOJIS STRINGS LIKE <:emojiName:emojiID> */
    emojis: {
        success: "XXXXXXXXX",
        error: "XXXXXXXXX",
        loading: "XXXXXXXXX"
    },

    /* ARRAY OF BOT'S OWNERS IDs */
    owners: [],

    /* EMBED CONFIGURATION */
    embed: {
        color: "#2BFAFA",
        footer: "Perry | By ShadowV"
    },

    /* STATUS LIST (Playing to... or listen to...) */
    status: {
        updateEvery: 20000,
        list: [
            {
                type: "PLAYING",
                content: "sur {guildsCount} serveurs!"
            },
            {
                type: "LISTENING",
                content: "{usersCount} utilisateurs"
            }
        ]
    }

};