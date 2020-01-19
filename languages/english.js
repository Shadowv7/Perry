const currentLanguage = "english",
  c = require("../config.js"),
  e = c.emojis;

// This class is used to store languages strings

module.exports = class {
  constructor() {
    this.language = {
      PERM_LEVELS: [
        "User",
        "Moderator",
        "Administrator",
        "Founder",
        "Ultimate"
      ],

      ERR_CMD_CLIENT_PERMISSIONS: perms =>
        `${
          e.error
        } __**Missing permissions**__\n\nI need the following permissions for this command to work properly: ${perms
          .map(p => "`" + p + "`")
          .join(", ")}`,
      ERR_CMD_USER_PERMISSIONS: (levelName, userLevel) =>
        `${e.error} | This command requires the level of permissions \`${levelName}\` (you are \`${userLevel}\`) !`,
      ERR_CMD_COOLDOWN: time =>
        `${e.error} | Hey, keep calm! Wait **${time}** second(s) before performing this command again!`,
      ERR_CMD_NSFW: `${e.error} | This command must be executed in a NSFW channel!`,
      ERR_CMD_DISABLED: `${e.error} | This command is currently disabled!`,
      ERR_OCCURRED: `${e.error} | An error has occurred. Please try again in a few minutes!`,
      ERR_CMD_GUILDONLY: `${e.error} | This command is not available in private messages!`,

      PREFIX_INFO: prefix =>
        `${e.success} | The prefix of this server is \`${prefix}\`!`,

      /* PING COMMAND */
      PING_DESCRIPTION: "Displays the bot latency!",
      PING_USAGE: "ping",
      PING_EXEMPLES: "$ping",
      PING_WAIT: `${e.loading} | Pinging...`,
      PING_RESULT: ms => `${e.success} | Pong! Latency: \`${ms}\` ms!`,

      /* EVAL COMMAND */
      EVAL_DESCRIPTION: "Evaluate a code !",
      EVAL_USAGE: "eval <code>",
      EVAL_EXEMPLES: "$eval message.reply('eval')",

      /* BUILD EMOJIS COMMAND */
      BUILD_EMOJIS_DESCRIPTION:
        "Automatically adds the emojis necessary for the bot to work properly and generates a configuration!",
      BUILD_EMOJIS_USAGE: "build-emojis",
      BUILD_EMOJIS_EXAMPLES: "$build-emojis",
      BUILD_EMOJIS_IN_PROGRESS: `${e.success} | Adding emojis is in progress...-`,
      BUILD_EMOJIS_INFOS: `${e.success} | Copy and paste this into your configuration!`,

      /* HELP COMMAND */
      HELP_TITLE: "List of commands",
      HELP_SUBTITLE: prefix =>
        `● To get help on a command type \`${prefix}help <command>\` !`,
      HELP_HEADINGS: [
        "Help:",
        "Usage:",
        "Examples:",
        "Group:",
        "Description:",
        "Aliases:",
        "Permissions:"
      ],
      HELP_NO_ALIASES: "No alias.",
      HELP_ERR_NOT_FOUND: cmd => `${e.error} | Command \`${cmd}\` not found!`,

      /* BOTINFOS */
      BOTINFOS_DESCRIPTION: "Displays information about Perry !",
      BOTINFOS_USAGE: "botinfos",
      BOTINFOS_EXEMPLES: "$botinfos",
      BOTINFOS_HEADING: [
        "•__Here is some information about Perry__•",
        ":computer: Développer :",
        "📊 Statistics : ",
        "Servers",
        "Users"
      ],
      /* PERMS */
      PERMS_DESCRIPTION: "Show the permissions you have!",
      PERMS_USAGE: "permissions",
      PERMS_EXEMPLES: "$permissions",
      PERMS_TITLE: user => `•__Here are the permissions of ${user}__•`,
      /* USERINFOS */
      USERINFOS_DESCRIPTION: "Show member information!",
      USERINFOS_USAGE: "userinfos [id | mention | pseudo | discriminateur]",
      USERINFOS_EXEMPLES:
        "$userinfos ShadowV\n$userinfos @ShadowV#9338\n$userinfos 9338",
      USERINFOS_HEADING: [
        ":bust_in_silhouette: Username",
        ":id: ID",
        ":hash: Discriminator",
        ":robot: Bot",
        ":busts_in_silhouette: Nickname",
        ":calendar: Joined Discord at",
        "🔐 Roles"
      ],
      USERINFOS_ERROR: `${e.error} | This member has too many roles!`,
      /* FN_CHALLENGE */
      FN_CHALLENGE_DESCRIPTION: "Show fortnite challenges!",
      FN_CHALLENGE_USAGE: "fnchallenge",
      FN_CHALLENGE_EXEMPLES: "$fnchallenge",
      /* FN_STORE*/
      FN_STORE_DESCRIPTION: "Show the Fortnite Store!",
      FN_STORE_USAGE: "fnshop",
      FN_STORE_EXEMPLES: "$fnshop",
      FN_STORE_HEADING: ["Rarity", "Price", "Image", "Tap here"],
      /* FN_STATS*/

      FN_STATS_DESCRIPTION: "Displays statistics for a Fortnite player!",
      FN_STATS_USAGE: "fnstats <platform> <pseudo>",
      FN_STATS_EXEMPLES: "fnstats psn Shadow",
      FN_STATS_NO_USER: `${e.error} | Please enter the nickname of a Fortnite player!`,
      FN_STATS_NO_PLATFORM: `${e.error} | Please enter the platform!`,
      FN_STATS_USER_NOT_FOUND: `${e.error} | I can't find this player!`,
      FN_STATS_PLATFORM_NOT_FOUND: platform =>
        `${e.error} | The platform \`${platform}\` is not correct!`,
      FN_STATS_TITLE: user => `Statistics Fortnite of ${user}`,
      FN_STATS_HEADING: ["Win(s)", "Kill(s)", "Game(s) played", "K/D"],
      /* MINECRAFT */
      MINECRAFT_DESCRIPTION: "Displays informations for a Minecraft server !",
      MINECRAFT_USAGE: "minecraft <ip>",
      MINECRAFT_EXEMPLES: "$minecraft funcraft.fr",
      MINECRAFT_NO_IP: `${e.error} | Please enter the adress ip of a Minecraft server!`,
      MINECRAFT_ERROR: `${e.error} | I can't find thid server !`,
      MINECRAFT_HEADING: [":star: Adress IP", "👨‍👩‍👧‍👦 Players"],
      /* SKIN */
      SKIN_DESCRIPTION: "Show the skin of a Minecraft player !",
      SKIN_USAGE: "skin <nickname>",
      SKIN_EXEMPLES: "$skin Shadow",
      SKIN_NICKNAME_LENGTH: `${e.error} | The nickname is too long !`,
      SKIN_NO_NICKNAME: `${e.error} | Please enter the nickname of a Minecraft player !`,
      SKIN_ERROR: `${e.error} | I can't find this skin !`,
      /* ASCII */
      ASCII_DESCRIPTION: "Put your message in ascii !",
      ASCII_USAGE: "ascii <texte>",
      ASCII_EXEMPLES: "$ascii Shadow is the best!",
      ASCII_NO_TEXT: `${e.error} | Please enter a message !`,
      ASCII_TEXT_LENGTH: `${e.error} | Your message is too long !`,
      ASCII_ERROR: `${e.error} | Check that your message contains only UTF-8 characters! `,
      /* CALCUL */
      CALCUL_DESCRIPTION: "Solve your expression!",
      CALCUL_USAGE: "calcul <calculation>",
      CALCUL_EXEMPLES: "$calcul 1+1",
      CALCUL_NO_CALCUL: `${e.error} | Please enter the calculation to solve!`,
      CALCUL_ZERO: `${e.error} | It is impossible to divide a number by 0!`,
      CALCUL_ERROR: `${e.error} | I can't solve your calculation !`,
      CALCUL_RESULT: "•__Result__•",
      CALCUL_CALCUL: "•__Calculation__•",
      /* 8BALL */ BALL_DESCRIPTION: "Randomly answers your question !",
      BALL_USAGE: "8ball <question>",
      BALL_EXEMPLES: "$8ball Hello , how are you ?",
      BALL_RESPONSE: [
        "Of course.",
        "I don't know.",
        "Yes.",
        "No.",
        "Impossible !"
      ],
      BALL_NO_TEXT: `${e.error} | Please ask a question containing at least two words !`,
      BALL_NO_QUESTION: `${e.error} | Please ask a question **question** !`,
      /* JOKE */
      JOKE_DESCRIPTION: "Make a joke at random !",
      JOKE_USAGE: "joke",
      JOKE_EXEMPLES: "$joke",
      /* JOKE OF DAY */
      JOD_DESCRIPTION: "Make the joke at the day !",
      JOD_USAGE: "jod",
      JOD_EXEMPLES: "jod",
      /* VDM */
      VDM_DESCRIPTION: "Tell a shit of life!",
      VDM_USAGE: "shitoflife",
      VDM_EXEMPLES: "shitoflife",
       /* IMAGE */
      IMAGE_DESCRIPTION: (endpoint) => `Generate an image ${endpoint} !`,
      IMAGE_USAGE: (endpoint) => `${endpoint} [ username | id | mention | discriminator]`,
      IMAGE_EXEMPLES: (endpoint) => `$${endpoint} ShadowV`
    };
  }

  /**
   * The method to get language strings
   * @param {string} term The string or function to look up
   * @param {...*} args Any arguments to pass to the lookup
   * @returns {string|Function}
   */
  get(term, ...args) {
    const value = this.language[term];
    switch (typeof value) {
      case "function":
        return value(...args);
      default:
        return value;
    }
  }

  getLang() {
    return lang;
  }

  printDate(pdate, isLongDate) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let day = pdate.getDate(),
      monthIndex = pdate.getMonth(),
      year = pdate.getFullYear(),
      hour = pdate.getHours() < 10 ? "0" + pdate.getHours() : pdate.getHours(),
      minute =
        pdate.getMinutes() < 10 ? "0" + pdate.getMinutes() : pdate.getMinutes();

    let thedate = isLongDate
      ? day +
        " " +
        monthNames[monthIndex] +
        " " +
        year +
        " at " +
        hour +
        "h" +
        minute
      : day + " " + monthNames[monthIndex] + " " + year;
    return thedate;
  }

  /**
   * Parse ms and returns a string
   * @param {number} milliseconds The amount of milliseconds
   * @returns The parsed milliseconds
   */
  convertMs(milliseconds) {
    let roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
    let days = roundTowardsZero(milliseconds / 86400000),
      hours = roundTowardsZero(milliseconds / 3600000) % 24,
      minutes = roundTowardsZero(milliseconds / 60000) % 60,
      seconds = roundTowardsZero(milliseconds / 1000) % 60;
    if (seconds === 0) seconds++;
    let isDays = days > 0,
      isHours = hours > 0,
      isMinutes = minutes > 0;
    let pattern =
      (!isDays
        ? ""
        : isMinutes || isHours
        ? "{days} days, "
        : "{days} days and ") +
      (!isHours ? "" : isMinutes ? "{hours} hours, " : "{hours} hours and ") +
      (!isMinutes ? "" : "{minutes} minutes and ") +
      "{seconds} seconds";
    let sentence = pattern
      .replace("{duration}", pattern)
      .replace("{days}", days)
      .replace("{hours}", hours)
      .replace("{minutes}", minutes)
      .replace("{seconds}", seconds);
    return sentence;
  }
};
