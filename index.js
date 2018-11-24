// Load up the discord.js library
const Discord = require("discord.js");
const tocken = process.env.token
// Ceci est votre client. Certaines personnes l'appellent `bot`, d'autres l'appellent` soi-même`,
// certains pourraient l'appeler `cootchie`. De toute façon, quand vous voyez `client.something`, ou` bot.something`,
// c'est ce à quoi nous nous référons. Votre client
const client = new Discord.Client();

// Ici nous chargeons le fichier config.json qui contient notre jeton et nos valeurs de préfixe.
const config = require("./kb.json");
// config.token contient le jeton du bot
// config.prefix contient le préfixe du message.

client.on("ready", () => {

    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

    client.user.setActivity(`~help  pour avoir de l'aide`);
});

client.on("guildCreate", guild => {

    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`~help pour avoir de l'aide`);
});

client.on("guildDelete", guild => {

    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`~help  pour avoir de l'aide`);
});

client.on('messageDelete', async(message) => {
    const logs = message.guild.channels.find('name', 'logs');
    if (message.guild.me.hasPermission('administrateurs') && !logs) {
        message.guild.createChannel('logs', 'text');
    }
    if (!message.guild.me.hasPermission('administrateurs') && !logs) {
        console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
    }
    let user = ""
    if (entry.extra.channel.id === message.channel.id &&
        (entry.target.id === message.author.id) &&
        (entry.createdTimestamp > (Date.now() - 5000)) &&
        (entry.extra.count >= 1)) {
        user = entry.executor.username
    } else {
        user = message.author.username
    }
    logs.send(`A message was deleted in ${message.channel.name} by ${user}`);
})

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        // Calcule le ping entre l'envoi d'un message et sa modification, donnant une belle latence aller-retour.
        // Le second ping est une latence moyenne entre le bot et le serveur websocket (aller simple, pas aller-retour)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! La latence est${m.createdTimestamp - message.createdTimestamp}Ms. API Latency est ${Math.round(client.ping)}ms`);
    }
    if (command === "help") {
        // Calcule le ping entre l'envoi d'un message et sa modification, donnant une belle latence aller-retour.
        // Le second ping est une latence moyenne entre le bot et le serveur websocket (aller simple, pas aller-retour)
        const m = await message.channel.send("ban,kick,say,ping= te dit la latence entre ton msg et sa modif,cl= sert a éfacé es massage maximume jusqua 14jours avant (depuis son ajoute au serveur.),");
    }
    if (command === "say") {
        // fait en sorte que le bot dise quelque chose et supprime le message. Par exemple, il est ouvert à tout le monde.
        // Pour obtenir le "message" lui-même, nous rejoignons le `args` dans une chaîne avec des espaces: 
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => {});
        // Ensuite, nous supprimons le message de commande (sournois, non?). La prise ignore simplement l'erreur avec un truc mignon smiley.
        // Et on demande au bot de dire la chose:
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

    if (command === "cl", "clear", "purge", "delmessage") {

        const deleteCount = parseInt(args[0], 10);

        if (!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Veuillez indiquer un nombre compris entre 2 et 100 pour le nombre de messages à supprimer");

        const fetched = await message.channel.fetchMessages({ limit: deleteCount });
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(` Impossible de supprimer les messages à cause de: ${error}`));
    }
});



client.login(config.token);
