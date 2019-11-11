const Commando = require('discord.js-commando')
const discord = require('discord.js');
const random = require('random');
const fs = require('fs');
const jsonfile = require('jsonfile');


const bot = new Commando.Client();

var stats = {};
if (fs.existsSync('stats.json')) {
    stats = jsonfile.readFileSync('stats.json');
}

bot.on('message', (message) => {
    if (message.author.id == bot.user.id)
        return;

    if (message.guild.id in stats === false) {
        stats[message.guild.id] = {};
    }

    const guildStats = stats[message.guild.id];
    if (message.author.id in guildStats === false) {
        guildStats[message.author.id] = {
            xp: 0,
            level: 0,
            last_message: 0,
            last_boost: 0,
            last_random_xp: 0
        };
    }

    const userStats = guildStats[message.author.id];
    if (Date.now() - userStats.last_message > 15000) {
        userStats.xp += random.int(15, 25);
        userStats.last_message = Date.now();
    }
        

    const xpToNextLevel = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100;
    if (userStats.xp >= xpToNextLevel) {
        userStats.level ++;
        userStats.xp = userStats.xp - xpToNextLevel;
        message.channel.send(message.author + ' a atteint le niveau ' + userStats.level);
    }

    jsonfile.writeFileSync('stats.json', stats);

    console.log(message.author.username + ' a maintenant ' + userStats.xp + ' d\'xp');
    console.log(xpToNextLevel + ' XP restant pour passer au prochain niveau! ;)');

    const parts = message.content.split(' ');

    if (parts[0] === '?#boost') {
        if (Date.now() - userStats.last_boost > 43200000) {
            message.channel.send(message.author + ' a réclamé son boost quotidien!');
            userStats.xp += random.int(75, 100);
            userStats.last_boost = Date.now();
        }
    }
    
    if (parts[0] === '?#random') {
        if (Date.now() - userStats.last_random_xp > 7257600000) {
            let random_xp = random.int(10, 1000);
            message.channel.send(message.author + ' a gagné ***' + random_xp + ' xp*** grâce à la commande ?#random !');
            userStats.xp += random_xp;
            userStats.last_random_xp = Date.now();
        }
    }
    if (parts[0] === '?#stats') {
        message.channel.send('Vos statistiques sont  : Niveaux : ' + userStats.level + ' ***/*** XP : ' + userStats.xp);
    }
    
});

bot.login('/*Put bot token here*/');
