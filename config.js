module.exports = {

    /* YOUR DISCORD BOT TOKEN */
    //token: "NjU4NTc5NTAzMTM1NTg4Mzky.XiKy1w.k6HuNDeMbnSwLxQ9enVjuwyUbrY",

    /* DEFAULT GUILD CONFIGURATION */
    guildConf: {
        language: "english",
        prefix: "p!"
    },
    
    /* THE MONGODB URL */
    mongoDB: "mongodb://localhost:27017/Discbot",

    /* EMOJIS STRINGS LIKE <:emojiName:emojiID> */
    emojis: {
        success: "<:success:668013533266575364>",
        error: "<a:loading:668013532612395008>",
        loading: "<:error:668013531483996161>"
    },

    /* ARRAY OF BOT'S OWNERS IDs */
    owners: ["652145085999349791"],

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