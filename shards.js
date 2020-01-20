
const {ShardingManager} = require('discord.js');
const config = require("./config.js")
const Shard = new ShardingManager('./discbot.js', {
    totalShards: 'auto',
    respawn    : true,
    token      : config.token
})
