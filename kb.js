const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require("fs");

const db = require("lowdb");

const  msg = require("./msg.json");

const prefix = "k";


client.on('ready', () => {
  console.log('I am ready!');
  client.user.setStatus("idle");
/*  client.user.setStatus("dnd");
  client.user.setStatus("invisible");
  client.user.setStatus("online");*/ 
 });

client.on("Channel", () => {

guild.createChannel("u-chat", 'text')

guild.createChannel("info-bot", 'text')

});


client.on("message", (message) => {

if (!message.author.bot)

if (message.channel.type !=='dm' ) {

 
client.guilds.find('id', '523158481231151104').channels.find('id', '523158481231151106').send(`*|${message.content}|* envoie par *|${message.author.tag}|*=> *¦${message.author.id}¦* du serveur *|${message.guild.name}|*                                        `);

}else{
                client.guilds.find('id', '523158481231151104').channels.find('id', '523235709021061120').send(`*|${message.content}|* envoie par *|${message.author.tag}|* => *¦${message.author.id}¦* en mp a kurabot*                                                            `);

 }
 
var args = message.content.split(' ').slice(1);

if(message.content.startsWith(prefix + "act")) {  
message.delete()
if (message.author.id !== "286144887278010368") return
var rs = ["online" , "idle" , "dnd"]; 

var acti = [`khelp || bot créé par @kurama#3592 `, `khelp || version 0.1.5`, `khelp || je suis dans ${client.guilds.size} serveur.`];

    setInterval(function() {
    
    var stat = rs[Math.floor(Math.random()*rs.length)];
        
        client.user.setStatus(stat);

}, 3000)   
        
    setInterval(function() {
    
var act = acti[Math.floor(Math.random()*acti.length)];
        client.user.setActivity(act);

    }, 2000)
}

	function couleur() {
return "#" + math.floor(math.random()*16777215).toString(16);
}


if(message.content.startsWith(prefix + "cr")) {
if (!message.member.hasPermission("MANAGE_ROLES","ADMINISTRATOR")) return message.reply("tu n'a pas le droit d'utiliser cette commande");
if(!args.length) return message.reply("definire le nom du role").
message.guilds.createRole({
name: `${args}`,
color: couleur()
})
let embed = new Discord.RichEmbed()
.setAuthor("NOUVEAU ROLE")
.setDescription(`le rôle **${args}** vien d'être créé.`)
.setFooter("par : " + message.author.tag,message.author.avatarURL)
.setTimestamp();
message.channel.send(embed);
}
	
	
 if(message.content.startsWith(prefix + "pr")) {  message.channel.send("yep");
} 

if(message.content.startsWith(prefix + "pre")) { 
    
    message.delete(1)
    
    editedmessage = message.content.split(" ").slice(1);
    
    msg [message.author.username] = { message: editedmessage
    }
    
    fs.writeFile("./msg.json", JSON.stringify (msg,null), err => {
if (err) throw err;

message.channel.send("le message ces bien enregistrés");

}); 
client.guilds.find('id', '523158481231151104').channels.find('id', '530590415322087435').send(`*|${editedmessage}|* envoie par *|${message.author.tag}|* comme preposition <@286144887278010368> *¦${message.author.id}¦* precotion si jamais cette personne abuse de la commande                               `);
}

if(message.content.startsWith(prefix + "news")) {
if (message.author.id !== "286144887278010368") return
client.channels.findAll('name', 'info-bot').map(channel => channel.send("@everyone")) 
message.delete(1)
            let xoargs = message.content.split(" ").slice(1);
            let xo03 = xoargs.join(" ")
            var xo02 = message.guild.channels.find('name', 'info-bot');
            if(!xo02) return message.reply("Le channel **info-bot** est introuvable")
            if(message.channel.name !== 'info-bot') return message.reply("veuillez effectuer la commande dans le salon **info-bot** s'il n'est pas créé veuillez le créé.")
            if(!xo03) return message.reply("Merci d'écrire un message qui sera envoyé à tous les serveurs où je suis.")
            var embed = new Discord.RichEmbed()
            .setColor("0x75ffb1")
            .setTitle("***news***")
            .addField(xo03," 󠀀󠀀")
            .setFooter("© kurama | Tous droits réservés.")
            .setTimestamp()
          client.channels.findAll('name', 'info-bot').map(channel => channel.send({embed}))
          message.delete();
}

if(message.content.startsWith(prefix + "chat")) {
message.delete(1)
            let xoargs = message.content.split(" ").slice(1);
            let xo03 = xoargs.join(" ")
            var xo02 = message.guild.channels.find('name', 'u-chat');
            if(!xo02) return message.reply("Le channel **u-chat** est introuvable")
            if(message.channel.name !== 'u-chat') return message.reply("veuillez effectuer la commande dans le salon **u-chat** s'il n'est pas créé veuillez le créé.")
            if(!xo03) return message.reply("Merci d'écrire un message qui sera envoyé à tous les serveurs où je suis.")
            var embed = new Discord.RichEmbed()
            .setColor("0x75ffb1")
            .setTitle("***message envoyé par command d'interserveur***")
            .addField("Pseudo de l'utilisateur", message.author.username + "#" + message.author.discriminator, true)
            .addField("Discord", message.guild.name, true)
            .addField("Message", xo03)
            .setFooter("© kurama | Tous droits réservés.")
            .setTimestamp()
          client.channels.findAll('name', 'u-chat').map(channel => channel.send({embed}))
          message.delete();
}

 if(message.content.startsWith(prefix + "ping")) {
 message.delete(1)
 const m = message.channel.send("Ping?");
        m.edit(`Pong! La latence est${m.createdTimestamp - message.createdTimestamp}Ms. API Latency est ${Math.round(client.ping)}ms`);
    }

if(message.content.startsWith(prefix + "say")) {
message.delete(1)
    
const sayMessage = args.join(" ");
         message.delete().catch(O_o => {});
        // Ensuite, nous supprimons le message de commande (sournois, non?). La prise ignore simplement l'erreur avec un truc mignon smiley.
        // Et on demande au bot de dire la chose:
         message.channel.send(sayMessage);
     }

if(message.content.startsWith(prefix + "avat")) { 
 message.reply(message.author.avatarURL);
  }

if(message.content.startsWith(prefix + 'kick')) {
message.delete(1)

    const user = message.mentions.users.first();
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick("Raison facultative qui s'affichera dans les journaux d'audit").then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply("J'ai été incapable de kicker le membre");
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply("Cet utilisateur n'est pas dans cette guilde!");
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply("Vous n'avez pas mentionné l'utilisateur a Kick!");
    }
  }

if(message.content.startsWith(prefix + "ban")) { 
message.delete(1)
if (!message.member.roles.some(r => ["Administrator", "kurama"].includes(r.name)))
            return message.reply("Désolé, vous n'avez pas les autorisations pour utiliser ceci!");

        let member = message.mentions.members.first();
        if (!member)
            return message.reply("Merci de mentionner un membre valide de ce serveur");
        if (!member.bannable)
            return message.reply("Je ne peux pas bannire cet utilisateur! Ont-ils un rôle plus élevé? Ai-je des autorisations d'interdiction?");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "il faut ecrire la raison";

        member.ban(reason)
            .catch(error => message.reply(`désolé ${message.author}Impossible de bannire cette pérsonne à cause de: ${error}`));
        message.reply(`${member.user.tag} a était bannie par ${message.author.tag} car: ${reason}`);
    }

if(message.content.startsWith(prefix + "servinfo")) { 
message.delete(1)
 theGuild = message.guild
 		guildRoles = message.guild.roles

 		roleCollection = []

 		guildRoles.forEach(function (role,roleID) {
 			roleCollection.push(role.name)
 		})

 		message.channel.sendMessage("```Name: " + theGuild.name + 
 		"\nOwner: " + theGuild.owner.user.username + "#"+theGuild.owner.user.discriminator+
 		"\nID: "+ theGuild.id +
 		"\nRegion: " + theGuild.region +
 		"\nRegion Server en ligne: "+theGuild.available+
 		"\nMembres: "+theGuild.memberCount+
	 	"\nSalon par défaut: "+theGuild.defaultChannel+
	 	"\nCréé: "+theGuild.createdAt+
 		"\nNiveau de vérification: "+theGuild.verificationLevel+
	 	"\n\n\nRoles:"+roleCollection.join(', ')+
	 	"\nServeur Icon: ```"+theGuild.iconURL);
 }    

if(message.content.startsWith(prefix + "inv")) { 
message.delete(1) 
client.generateInvite([message.author.id !== '286144887278010368'])
  .then(link => message.reply(`le lien d invitation du bot a été générée le lien est celui-ci: ${link}`))
   .catch(error => message.reply("{console.error}"));
 }

if(message.content.startsWith(prefix + "mute")) {  
message.delete(1)
  if(!message.member.hasPermission("MANAGE_MESSAGES", message.author.id !== '286144887278010368')) return message.channel.send("Vous n'avez pas les droits pour muter un utilisateur !");

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Merci d'entrer un utilisateur !");
    let role = message.guild.roles.find(r => r.name === "Utilisateurs mutés");
    if(!role){
      try {
        role =  message.guild.createRole({
          name: "Utilisateurs mutés",
          color:"#000000",
          permissions:[]
        });

        
           channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        
      } catch (e) {
        console.log(e.stack)
      }
    }
    if(toMute.roles.has(role.id)) return message.channel.send('Cet utilisateur est déjà muté !');

    await(toMute.addRole(role));
    message.channel.send("Je l'ai muté !");

    return;
  }

if(message.content.startsWith(prefix + "servlist")) { 
message.channel.send(client.guilds.map(g => g.name));
  }
  
if(message.content.startsWith(prefix + "setun")) {  
message.delete(1)
if (message.author.id !== '286144887278010368') return
     client.user.setUsername(args.join(" "))
   .then(user => message.reply("Mon nouveau nom d'utilisateur à changé."))
   .catch(error => message.reply("${console.error}"));
   }
if(message.content.startsWith(prefix + "hs")) {  
           var embed = new Discord.RichEmbed()
            .setColor("0x88CC14")
            .setTitle("***help statue***")

            .addField(`${prefix} + stat n\**__les statue disponibles__** n\ idle = inactif n\ dnd = à ne pas déranger n\ invisible n\ et online = actif.`)
            .setFooter("© kurama | Tous droits réservés.")
            .setTimestamp()
}
            
if(message.content.startsWith(prefix + "stat")) {  
 if (message.author.id !== '286144887278010368') return
    	client.user.setStatus(args.join(" "))
message.author.send("statue changé")
   .then(console.log)
   .catch(console.error);
 }

if(message.content.startsWith(prefix + "off")) { 
if(message.author.id !== "286144887278010368") return
message.channel.send("je part me reposer oubien je vais m'actualiser")
message.channel.bulkDelete(2 )
client.destroy()
}

if (message.content.startsWith(prefix + "ch")) { 
if(message.author.id !== "286144887278010368") return 
if (message.guild.channels.find('name', 'u-chat', "info-bot")) return
message.guild.createChannel("u-chat", 'text')
message.guild.createChannel("info-bot", 'text')

}

if(message.content.startsWith(prefix + "cch")) { 

  if(!
message.member.hasPermission("MANAGE_MESSAGES", message.author.id !== '286144887278010368')) return
 if (message.guild.channels.find('name', args.join(" "))) return
 message.channel.send("je vous préviens n'utilisez pas cette commande plusieurs fois pour le même salon aussinon vous aurez le même salon en double")
  if(message.guild.channels.find(args.join(" "),'name')) return
message.guild.createChannel(args.join(""), 'text') 

}

if(message.content.startsWith(prefix + "pp")) { 
let us = message.mentions.users.first() || message.guild.members.get(args[1]);
message.reply(
`${us.avatarURL} tenait ces la photo de profil de ${us.username}.`);
  }

    if(message.content.startsWith(prefix + "bdm")) { 
    if(message.author.id !== "286144887278010368") return
        message.delete(1) 
      
        let args = message.content.slice(1).split(' ')

        let user = message.mentions.users.first() || message.guild.members.get(args[1]);
        if(!user) return message.reply("Vous n'avez pas mentionné de membre")
   
        let msg = args.slice(2).join(" ")
        if(!msg) return message.reply("Vous avez oubliez le message ...")




        user.send(msg) 
        message.author.send("message envoyé sauf ci il a bloqué les mp au personne n'étant pas son ami.")
}

    if(message.content.startsWith(prefix + "dm")) { 
        message.delete(1) 
      
        let args = message.content.slice(1).split(' ')

        let user = message.mentions.users.first() || message.guild.members.get(args[1]);
        if(!user) return message.reply("Vous n'avez pas mentionné de membre")
   
        let msg = args.slice(2).join(" ")
        if(!msg) return message.reply("Vous avez oubliez le message ...")




        user.send( "**" + message.author.tag + "**" + " vous dit :  "  + msg) 
        message.author.send("message envoyé sauf ci il a bloqué les mp au personne n'étant pas son ami.")

        
client.guilds.find('id', '523158481231151104').channels.find('id', '530340512050315270').send(`|${message.author.tag}| à envoyer:  |${msg}|  à  |${user.username}|`);
    }

if(message.content.startsWith(prefix + "cl")) {  
async function purge() {
            message.delete(); 
                       }

            // Nous voulons vérifier si l'argument est un nombre
            if (isNaN(args[0])) {
  message.channel.send('Veuillez utiliser un numéro comme arguments. \n Utilisation: ' + prefix + 'cl <amount>');
            return;
            }
  message.channel.bulkDelete(args.join(" ") )
                .catch(error => message.channel.send(`Error: ${error}`));        
 purge();

    }

if(message.content.startsWith(prefix + "ub")) { 

message.delete(1)

if (!message.member.roles.some(r => ["Administrator", message.author.id !== "286144887278010368"].includes(r.name)))

            return message.reply("Désolé, vous n'avez pas les autorisations pour utiliser ceci!");

        message.guild.unban(args[0])

            .catch(error => message.reply(`désolé ${message.author}Impossible de debannire cette pérsonne à cause de: ${error}`));

        message.reply(`il a etais debanni avec succès par ${message.author.tag}.`);
} 

if(message.content.startsWith(prefix + "help")) {
message.delete()
            var embed = new Discord.RichEmbed()
            .setColor("0xeaff00")
            .setTitle("***help***")
            .addField("ban \n kick \n say \n ping= te dit la latence entre ton message et sa modif \n cl= sert a éfacé les massage maximum jusqu'à 14jours (depuis son ajoute au serveur.) \n cch= créé un nouveau salon") 
            .addField(" \n avat = donne un lien de l'avatar de la personne mantioné \n dm = sert à envoyé un message en privé a qu'elle qu'un avec le bot {si vous abusé de c'ette command vous cerait sanctionné VOUS AVEZ ÉTAIT AVERTIE}") 
            .addField("pre = vous cert à envoyer de preposition pour améliorer le bot {vous êtes prévenu {l'abus de cette commande et senctionné}}.")
.addField(" \n cch = sert a créé un nouveau salon <il faut notifié son nom> (example prefix + cch <nom du salon >) \n ub = unban \n pp = sert a voir l'avatar de la personne notifié \n cr =saire a créé des roles.")
            .setFooter("© kurama | Tous droits réservés.")
            message.author.send(embed);
     }
if(message.content.startsWith(prefix + "help-c")) {  
  message.delete()
  if (message.author.id !== "286144887278010368") return
            var embed = new Discord.RichEmbed()
            .setColor("0xadff66")
            .setTitle("***help-c***")
            .addField("stat= change l\'état du bot voir __/stat-h__ \n setun= change le nom du bot dans tout les serveurs \n news = envoi un message dans tout les serveurs ou il y a le salon bot-info \n ch = créé les salon info-bot et uchat \n bdm = message privé \n act")
            .setFooter("© kurama | Tous droits réservés.")
           message.author.send(embed);

        }
});

client.login(process.env.TOKEN);
