const paginationEmbed = require('discord.js-pagination');
const { MessageEmbed } = require('discord.js');
const embed1 = new MessageEmbed()
.setTitle("cc")

const embed2 = new MessageEmbed()
.setTitle("Sa va ?")

const pages = [ embed1,embed2]

paginationEmbed(message, pages, emojiList, timeout);