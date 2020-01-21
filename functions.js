module.exports = {
  getMember: function(message, toFind = "") {
    toFind = toFind.toLowerCase();

    let target = message.guild.members.get(toFind);

    if (!target && message.mentions.members)
      target = message.mentions.members.first();

    if (!target && toFind) {
      target = message.guild.members.find(member => {
        return member.user.username.toLowerCase().includes(toFind);
      });
    }
    if (!target && toFind) {
      target = message.guild.members.find(member => {
        return member.user.tag.toLowerCase().includes(toFind);
      });
    }
    if (!target && toFind) {
      target = message.guild.members.find(member => {
        return member.displayName.toLowerCase().includes(toFind);
      });
    }
    if (!target) target = message.member;

    return target;
  },
getMemberR: function(message, toFind = "") {
    toFind = toFind.toLowerCase();

    let target = message.guild.members.get(toFind);

    if (!target && message.mentions.members)
      target = message.mentions.members.first();

    if (!target && toFind) {
      target = message.guild.members.find(member => {
        return member.user.username.toLowerCase().includes(toFind);
      });
    }
    if (!target && toFind) {
      target = message.guild.members.find(member => {
        return member.user.tag.toLowerCase().includes(toFind);
      });
    }
    if (!target && toFind) {
      target = message.guild.members.find(member => {
        return member.displayName.toLowerCase().includes(toFind);
      });
    }
    //if (!target) target = message.member;

    return target;
  },
  formatDate: function(date) {
    return new Intl.DateTimeFormat("fr-FR").format(date);
  },
  promptMessage: async function(message, author, time, validReactions) {
    // We put in the time as seconds, with this it's being transfered to MS
    time *= 1000;

    // For every emoji in the function parameters, react in the good order.
    for (const reaction of validReactions) await message.react(reaction);

    // Only allow reactions from the author,
    // and the emoji must be in the array we provided.
    const filter = (reaction, user) =>
      validReactions.includes(reaction.emoji.name) && user.id === author.id;

    // And ofcourse, await the reactions
    return message
      .awaitReactions(filter, { max: 1, time: time })
      .then(collected => {
        collected.first() && collected.first().emoji.name;
      });
  },
  getRole: function(message, toFind = "") {
    toFind = toFind.toLowerCase();

    let target = message.guild.roles.get(toFind);

    if (!target && message.mentions.roles)
      target = message.mentions.roles.first();

    if (!target && toFind) {
      target = message.guild.roles.find(role => {
        return role.name.toLowerCase().includes(toFind);
      });
    }
    
   
    return target;
  },
  roundDecimal: function(nombre, precision){
    var precision = precision || 2;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}
};