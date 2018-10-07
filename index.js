// Load up the discord.js library
const Discord = require("discord.js");
const token = process.env.token
// Ceci est votre client. Certaines personnes l'appellent `bot`, d'autres l'appellent` soi-même`,
// certains pourraient l'appeler `cootchie`. De toute façon, quand vous voyez `client.something`, ou` bot.something`,
// c'est ce à quoi nous nous référons. Votre client
const client = new Discord.Client();

// Ici nous chargeons le fichier config.json qui contient notre jeton et nos valeurs de préfixe.
const config = require("./kb.json");
// config.token contient le jeton du bot
// config.prefix contient le préfixe du message.

client.on("pret", () => {
    // Cet événement sera exécuté si le bot démarre et se connecte avec succès.
    console.log(`le bote et pret ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    // Exemple de changer le jeu du bot en quelque chose d'utile.
    // docs se réfère à "ClientUser".
    client.user.setActivity(`répondre au serveur ${client.guilds.size} servers`);
});

client.on("gc", guild => {
    // Cet événement se déclenche lorsque le bot rejoint une guilde.
    console.log(`Nouvelles guilde rejoint: ${guild.name} (id: ${guild.id}). cette guilde a ${guild.memberCount} membre!`);
    client.user.setActivity(`se faire utilisé${client.guilds.size} servers`);
});

client.on("gd", guild => {
    // cet événement se déclenche lorsque le bot est supprimé d'une guilde.
    console.log(`J'ai été retiré de: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`répondre au serveur ${client.guilds.size} servers`);
});


client.on("message", async message => {
    // Cet événement sera exécuté sur chaque message reçu, quel que soit le canal ou le DM.

    // C'est une bonne pratique d'ignorer les autres robots. Cela fait aussi que votre bot s'ignore
    // et ne pas entrer dans une boucle de spam (on appelle cela "botception").
    if (message.author.bot) return;

    // C'est aussi une bonne pratique d'ignorer tout message qui ne commence pas par notre préfixe,
    // qui est défini dans le fichier de configuration.
    if (message.content.indexOf(config.prefix) !== 0) return;

    // Nous séparons ici notre nom de "commande" et nos "arguments" pour la commande.
    // par exemple. si nous avons le message "+ dire Est-ce la vraie vie?" , nous aurons le suivant:
    // commande = dire
    // args = ["Est-ce que", "ceci", "le", "réel", "la vie?"]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Allons-y avec quelques exemples de commandes courantes! N'hésitez pas à les supprimer ou à les modifier.

    if (command === "ping") {
        // Calcule le ping entre l'envoi d'un message et sa modification, donnant une belle latence aller-retour.
        // Le second ping est une latence moyenne entre le bot et le serveur websocket (aller simple, pas aller-retour)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! La latence est${m.createdTimestamp - message.createdTimestamp}Ms. API Latency est ${Math.round(client.ping)}ms`);
    }
    if (command === "help") {
        // Calcule le ping entre l'envoi d'un message et sa modification, donnant une belle latence aller-retour.
        // Le second ping est une latence moyenne entre le bot et le serveur websocket (aller simple, pas aller-retour)
        const m = await message.channel.send("ban,kick,say,ping= te dit la latence entre ton msg et sa modif,purge= sert a éfacé es massage maximume jusqua 14jours avant (depuis son ajoute au serveur.),");
    }
    if (command === "say") {
        // fait en sorte que le bot dise quelque chose et supprime le message. Par exemple, il est ouvert à tout le monde.
        // Pour obtenir le "message" lui-même, nous rejoignons le `args` dans une chaîne avec des espaces: 
        const sayMessage = args.join(" ");

        // Ensuite, nous supprimons le message de commande (sournois, non?). La prise ignore simplement l'erreur avec un truc mignon smiley.
        message.delete().catch(O_o => {});
        // Et on demande au bot de dire la chose:
        if (!message.member.roles.some(r => ["Administrateur", "Moderateur", "kurama"].includes(r.name)))
            message.channel.send(sayMessage);
    }
    if (command === "kick") {
        // Cette commande doit être limitée aux mods et aux administrateurs. Dans cet exemple, nous venons de coder en dur les noms de rôle.
        // S'il vous plaît lire sur Array.some () pour comprendre ce bit:
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
        return message.reply("désolé tu n'a pas la pérmission");

        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.reply("Merci de mentionner un membre valide de ce serveur");
        if (!member.kickable)
            return message.reply("Je ne peux pas éjécté à cet utilisateur! Ont-ils un rôle plus élevé? Ai-je des autorisations de coup?");

        // slice (1) supprime la première partie, qui devrait être ici la mention ou l'identifiant de l'utilisateur
        // join ('') prend toutes les différentes parties pour en faire une chaîne unique.
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "aucune réson aprouvé";

        // Le moment est venu de donner un coup de pied rapide!
        await member.kick(reason)
            .catch(error => message.reply(`désolé ${message.author}Je ne pouvais pas éjécté à cause de: ${error}`));
        message.reply(`${member.user.tag}a été éjécté par ${message.author.tag} car: ${reason}`);

    }

    if (command === "ban") {
        if (!message.member.roles.some(r => ["Administrator", "kurama"].includes(r.name)))
            return message.reply("Désolé, vous n'avez pas les autorisations pour utiliser ceci!");

        let member = message.mentions.members.first();
        if (!member)
            return message.reply("Merci de mentionner un membre valide de ce serveur");
        if (!member.bannable)
            return message.reply("Je ne peux pas bannire cet utilisateur! Ont-ils un rôle plus élevé? Ai-je des autorisations d'interdiction?");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "il faut ecrire la raison";

        await member.ban(reason)
            .catch(error => message.reply(`désolé ${message.author}Impossible de bannire cette pérsonne à cause de: ${error}`));
        message.reply(`${member.user.tag} a était bannie par ${message.author.tag} car: ${reason}`);
    }

    if (command === "cl") {
        const deleteCount = parseInt(args[0], 100);
        if (!deleteCount || deleteCount < 2 || deleteCount > 100000000)
            return message.reply("écrit un nombre de 2 jusqua 100000000 maximum /le nombre de message a efacé compte pour les 14jours pas plus/");
        const fetched = await message.channel.fetchMessages({ limit: deleteCount });
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Impossible de supprimer des messages à cause de: ${error}`));
    }
});


client.login(token);
