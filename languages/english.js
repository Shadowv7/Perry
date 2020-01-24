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
        "Super-Moderator",
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
      ERR_CMD_USERS_PERMISSIONS: perms =>
        `${
          e.error
        } __**Missing permissions**__\n\nYou need the following permissions for this command to work properly: ${perms
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
      USERINFOS_EXEMPLES: "$userinfos ShadowV", //$userinfos @ShadowV#9338 $userinfos 9338",
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
      IMAGE_DESCRIPTION: endpoint => `Generate an image ${endpoint} !`,
      IMAGE_USAGE: endpoint =>
        `${endpoint} [ username | id | mention | discriminator]`,
      IMAGE_EXEMPLES: endpoint => `$${endpoint} ShadowV`,
      /* INSTAGRAM */
      INSTAGRAM_DESCRIPTION: "Displays information on an Instagram account !",
      INSTAGRAM_USAGE: "instagram <username>",
      INSTAGRAM_EXEMPLES: "$instagram Ninja",
      INSTAGRAM_NO_NAME: `${e.error} | Please specify the name of the Instagram account.`,
      INSTAGRAM_NAME_NOLONG: `${e.error} | Put a bigger nickname !`,
      INSTAGRAM_ERROR: `${e.error} | I can't find this account!`,
      INSTAGRAM_HEADING: [
        "- `Username` : ",
        "- `Name` : ",
        "- `Biography` : ",
        "- `Publications` : ",
        "- `Followers` : ",
        "- `Subscription` : ",
        "- `Private account` : ",
        "Yes :closed_lock_with_key:",
        "No :unlock:"
      ],
      INSTAGRAM_NOT_PROVIDED: "Not provided",
      /* SHORTURL COMMAND */

      // Utils
      SHORTURL_DESCRIPTION: "Shorten your link!",
      SHORTURL_USAGE: "shorturl [url]",
      SHORTURL_EXAMPLES: "$shorturl https://google.fr",
      // Errors
      SHORTURL_ERR_INVALID_URL: `${e.error} | Please enter a valid URL!`,
      /* OPTION */
      OPTION_DESCRIPTION: "Configurate Perry !",
      OPTION_USAGE: "option <logs/level/welcome> <on/off>",
      OPTION_EXEMPLES: "$option on",
      OPTION_NO_NAME: `${e.error} | Please choose between "welcome","level" and "logs"`,
      OPTION_NO_ARGS: `${e.error} | Please choose an option between "on" and "off" !`,
      OPTION_LEVEL_ALREADY: (choice, config) =>
        `${e.error} | The level system is already ${choice} !`,
      OPTION_LEVEL_SUCCESS: (choice, config) =>
        `${e.success} | The level system is ${choice} !`,
      OPTION_WELCOME_SUCCESS: (choice) => `${e.success} | The welcome-image is ${choice} !`,
      OPTION_WELCOME_ALREADY: (choice) => `${e.error} | The welcome-image is already ${choice} !`,
      OPTION_LOGS_SUCCESS: (choice) => `${e.success} | The logs are ${choice} !`,
      OPTION_LOGS_ALREADY: (choice) => `${e.error} | The logs are already ${choice} !`,
      /* LEVEL */
      LEVELUP_MESSAGE: (user, level) =>
        `Congratulations, <@${user}> you are now at the level ${level} !`,
      LEVEL_NOT_ON: `${e.error} | The level system is not activate in this server !`,
      /* RANK */

      RANK_DESCRITION: "Displays your stats !",
      RANK_USAGE: "rank [username | id | mention | discriminator]",
      RANK_EXEMPLES: "$rank ShadowV\n$rank",
      RANK_PROGRESSBAR: (curLevel, ProgressBar, nextLevel) => `${ProgressBar}`,
      /* LANG */
      LANG_DESCRIPTION: "Change Perry's language !",
      LANG_USAGE: "setlang <french/english>",
      LANG_EXEMPLES: "$setlang french\n$setlang english",
      LANG_NO_ARGS: `${e.error} | Please choose a language between "french" and "english"!`,
      LANG_ALREADY: choice => `${e.error} | I already ${choice} !`,
      LANG_SUCCESS: choice => `${e.success} | Now I speak ${choice} !`,
      /* GIVEAWAY COMMAND */

      // Utils
      GIVEAWAY_DESCRIPTION: "Manage your giveaways simply!",
      GIVEAWAY_USAGE:
        "giveaway [create/reroll/delete/end] (time) (winners count) (prize)",
      GIVEAWAY_EXAMPLES:
        "$giveaway create 10m 2 5$ PayPal !\n$giveaway reroll 597812898022031374",
      // Errors
      GIVEAWAY_ERR_STATUS: `${e.error} | You must specify \`create\`, \`reroll\` ou \`delete\`!`,
      GIVEAWAY_ERR_CREATE: prefix =>
        `${e.error} | You must enter the information in this format: \n\n\`${prefix}giveaway create [time] [winners count] [prize]\``,
      GIVEAWAY_ERR_REROLL: `${e.error} | You must enter the ID of the giveaway message a re-rolled!`,
      GIVEAWAY_ERR_DELETE: `${e.error} | You must enter the ID of the giveaway message to be deleted!`,
      GIVEAWAY_ERR_END: `${e.error} | You must enter the ID of the giveaway message to be ended!`,
      GIVEAWAY_ERR_REROLL_MSG_ENDED: messageID =>
        `${e.error} | No giveaway **ended** found with message ID \`${messageID}\``,
      GIVEAWAY_ERR_MESSAGE_NOT_FOUND: messageID =>
        `${e.error} | No giveaway found with message ID \`${messageID}\``,
      GIVEAWAY_ERR_15_DAYS: `${e.error} | The maximum length of a giveaway is 15 days.`,
      GIVEAWAY_ERR_MAX: `${e.error} | A maximum of 4 Giveaways can be launched on the same server.`,
      // Content
      GIVEAWAY_CREATED: `${e.success} | Giveaway launched!`,
      GIVEAWAY_REROLLED: `${e.success} | New draw done!`,
      GIVEAWAY_DELETED: `${e.success} | Giveaway deleted!`,
      GIVEAWAY_ENDED: `${e.success} | Giveaway in stop mode (-15 seconds)!`,
      // Messages
      GIVEAWAY_CREATE_MESSAGES: {
        giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
        giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
        timeRemaining: "Time remaining: **{duration}** !",
        inviteToParticipate: "React with 🎉 to participate!",
        winMessage: "Congratulations, {winners} ! You won **{prize}** !",
        embedFooter: "Giveaways",
        noWinner: "Giveaway cancelled, no valid participation.",
        winners: "winner(s)",
        endedAt: "End at",
        units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days"
        }
      },
      GIVEAWAY_REROLL_MESSAGES: {
        congrat: ":tada: New winner(s) : {winners}! Congratulations!",
        error: "No valid entries, no winners can be chosen!"
      },
      /* WORK */
      WORK_DESCRIPTION: "You work!",
      WORK_USAGE: "work",
      WORK_EXEMPLES: "$work\n $w",
      WORK_TIME: time => `You're too tired to work, come back to ${time} !`,
      WORK_MESSAGES: random => [
        `You arrested 2 dealers, you got ${random} Perryen!`,
        `The gangsters gave you $ {random} Perryen!`,
        `You sold 3 sachets of drugs for ${random} Perryen!`,
        `You just won ${random} Perryen in poker!`,
        `A lawyer gave you ${random} Perryen so you wouldn't charge his client!`,
        `You are helping the police arrest a corrupt lawyer. By doing so you got ${random} Perryen! `,
        `You are faking evidence for a mafia leader accused of gangsterism.They gave you ${random} Perryen!`
      ],
      /* TOP */
      TOP_DESCRIPTION: "Displays members classement !",
      TOP_USAGE: "top",
      TOP_EXEMPLES: "$top",
      /* PLAY */
      PLAY_DESCRIPTION: "Play muisic !",
      PLAY_USAGE: "play <music>",
      PLAY_EXEMPLES: "play falling",
      NOW_PLAYING: song => `${e.success} | I'm playing ${song} !`,
      PLAY_NO_MUSIC: `${e.error} | Please enter the song name !`,
      ADD_TO_QUEUE: song => `${e.success} | ${song} as been add to the queue !`,
      QUEUE_END: `${e.error} | There is any song in the queue !`,
      CANT_FIND_MUSIC: `${e.error} | I can't find this music !`,
      JOIN_CHANNEL: `${e.error} | Please join a voice channel !`,
      SAME_CHANNEL: `${e.error} | You must me in the same voice channel as mine !`,
      NOT_PLAYING: `${e.error} | I'm not playing muisc !`,
      PAUSE_DESCRIPTION: `Pause the music!`,
      RESUME_DESCRIPTION: `Resume the music!`,
      SKIP_DESCRIPTION: `Skip the music !`,
      STOP_DESCRIPTION: `Stop the music !`,
      QUEUE_DESCRIPTION: `Displays the server queue !`,
      VOLUME_DESCRIPTION: `Change the volume of music !`,
      PAUSE_USAGE: "pause",
      RESUME_USAGE: "resume",
      SKIP_USAGE: "skip",
      STOP_USAGE: "stop",
      QUEUE_USAGE: "queue",
      VOLUME_USAGE: "volume <1 à 100>",
      RESUME_EXEMPLES: "$resume",
      PAUSE_EXEMPLES: "$pause",
      SKIP_EXEMPLES: "$skip",
      STOP_EXEMPLES: "$stop",
      QUEUE_EXEMPLES: "$queue",
      VOLUME_EXEMPLES: "$volume 80",
      SKIP_SUCCESS: `${e.success} | The music as been skiped !`,
      PAUSE_SUCCESS: `${e.success} | The music as been paused !`,
      RESUME_SUCCESS: `${e.success} | The music as been resumed !`,
      STOP_SUCCESS: `${e.success} | The music as been stoped !`,
      VOLUME_SUCCESS: volume =>
        `${e.success} | The volume is now on \`${volume}\` !`,
      QUEUE_MAX: `${e.error} | The queue is full !`,
      /* WELCOME */
      WELCOME_DESCRIPTION: "Set the welcome image !",
      WELCOME_USAGE: "setwelcome <#channel> <image-url>",
      WELCOME_EXEMPLES: "$setwelcome #join https://image.url/",
      NO_CHANNEL: `${e.error} | Please ping a channel !`,
      NO_URL: `${e.error} | Please include the url image !`,
      WELCOME_SUCCESS: `${e.success} | The welcome image as been set !`,
      WELCOME_IMAGE: member => `Welcome to the server , ${member}`,
      WELCOME_MESSAGE: "Welcome to the server,",
      /* GUILDMEMBERBOOST */
      BOOSTER_TITLE: "•__New Booster__•",
      BOOSTER_MESSAGE: (member, guild) =>
        `<a:boost:670174468320002049> ${member} just boosted the  server ! Thank you ! <a:boost:670174468320002049>`
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
