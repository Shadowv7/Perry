const currentLanguage = "french",
  c = require("../config.js"),
  e = c.emojis;

// This class is used to store languages strings

module.exports = class {
  constructor() {
    this.language = {
      PERM_LEVELS: [
        "Utilisateur",
        "Modérateur",
        "Administrateur",
        "Fondateur",
        "Suprême"
      ],

      ERR_CMD_CLIENT_PERMISSIONS: perms =>
        `${
          e.error
        } __**Permissions manquantes**__\n\nJ'ai besoin des permissions suivantes pour le bon fonctionnement de cette commande : ${perms
          .map(p => "`" + p + "`")
          .join(", ")}`,
      ERR_CMD_USER_PERMISSIONS: (levelName, userLevel) =>
        `${e.error} | Cette commande nécessite le niveau de permissions \`${levelName}\` (vous êtes \`${userLevel}\`) !`,
      ERR_CMD_COOLDOWN: time =>
        `${e.error} | Hey, restez calme ! Attendez **${time}** seconde(s) avant d'effectuer de nouveau cette commande !`,
      ERR_CMD_NSFW: `${e.error} | Cette commande doit être exécutée dans un salon NSFW !`,
      ERR_CMD_DISABLED: `${e.error} | Cette commande est actuellement désactivée !`,
      ERR_OCCURRED: `${e.error} | Une erreur est survenue. Veuillez réessayez dans quelques minutes !`,
      ERR_CMD_GUILDONLY: `${e.error} | Cette commande n'est pas disponible en messages privés !`,

      PREFIX_INFO: prefix =>
        `${e.success} | Le préfixe de ce serveur est \`${prefix}\` !`,

      /* PING COMMAND */
      PING_DESCRIPTION: "Affiche la latence du bot !",
      PING_USAGE: "ping",
      PING_EXAMPLES: "$ping",
      PING_WAIT: `${e.loading} | Ping en cours...`,
      PING_RESULT: ms => `${e.success} | Pong ! Latence: \`${ms}\` ms !`,

      /* EVAL COMMAND */
      EVAL_DESCRIPTION: "Evalue un code !",
      EVAL_USAGE: "eval <code>",
      EVAL_EXAMPLES: "$eval message.reply('eval')",

      /* BUILD EMOJIS COMMAND */
      BUILD_EMOJIS_DESCRIPTION:
        "Ajoute automatiquement les émojis nécessaires au bon fonctionnement du bot et génère une configuration !",
      BUILD_EMOJIS_USAGE: "build-emojis",
      BUILD_EMOJIS_EXAMPLES: "$build-emojis",
      BUILD_EMOJIS_IN_PROGRESS: `${e.success} | Ajout des émojis en cours...`,
      BUILD_EMOJIS_INFOS: `${e.success} | Copiez-collez ceci dans votre configuration !`,

      /* HELP COMMAND */
      HELP_TITLE: "Liste des commandes",
      HELP_SUBTITLE: prefix =>
        `● Pour avoir de l'aide sur une commande tapez \`${prefix}help <commande>\` !`,
      HELP_HEADINGS: [
        "Aide :",
        "Utilisation :",
        "Exemples :",
        "Groupe :",
        "Description :",
        "Alias :",
        "Permissions :"
      ],
      HELP_NO_ALIASES: "Aucun alias.",
      HELP_ERR_NOT_FOUND: cmd =>
        `${e.error} | Commande \`${cmd}\` introuvable !`,

      /* BOTINFOS */
      BOTINFOS_DESCRIPTION: "Affiche des informations sur Perry",
      BOTINFOS_USAGE: "botinfos",
      BOTINFOS_EXEMPLES: "$botinfos",
      BOTINFOS_HEADING: [
        "•__Voici des informations sur Perry__•",
        ":computer: Développeur :",
        "📊 Statistiques : ",
        "Seveurs",
        "Utilisateurs"
      ],
      /* PERMS */
      PERMS_DESCRIPTION: "Affiche les permissions que vous possédez!",
      PERMS_USAGE: "permissions",
      PERMS_EXEMPLES: "$permissions",
      PERMS_TITLE: user => `•__Voici les permissions de ${user}__•`,
      /* USERINFOS */
      USERINFOS_DESCRIPTION: "Affiche les informations d'un membre!",
      USERINFOS_USAGE: "userinfos [id | mention | pseudo | discriminateur]",
      USERINFOS_EXEMPLES:
        "$userinfos ShadowV\n$userinfos @ShadowV#9338\n$userinfos 9338",
      USERINFOS_HEADING: [
        ":bust_in_silhouette: Pseudo",
        ":id: ID",
        ":hash: Discriminateur",
        ":robot: Robot",
        ":busts_in_silhouette: Surnom",
        ":calendar: A rejoint Discord le",
        "🔐 Rôles"
      ],
      USERINFOS_ERROR : "Ce membre possède trop de rôles!",
      /* FN_CHALLENGE */
      FN_CHALLENGE_DESCRIPTION : "Affiche les défis de fortnite!" ,
      FN_CHALLENGE_USAGE: "fnchallenge",
      FN_CHALLENGE_EXEMPLES: "$fnchallenge"
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
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre"
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
        ? "{days} jours, "
        : "{days} jours et ") +
      (!isHours ? "" : isMinutes ? "{hours} heures, " : "{hours} heures et ") +
      (!isMinutes ? "" : "{minutes} minutes et ") +
      "{seconds} secondes";
    let sentence = pattern
      .replace("{duration}", pattern)
      .replace("{days}", days)
      .replace("{hours}", hours)
      .replace("{minutes}", minutes)
      .replace("{seconds}", seconds);
    return sentence;
  }
};
