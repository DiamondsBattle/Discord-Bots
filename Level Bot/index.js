const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', (message) => {

    if(message.content == '//help') {
        message.channel.send('Pas encore disponible');

    }else if(message.content == '//repo'); {
        message.channel.send('Vous pouvez trouvez la dernière version des fichiers de Blade à : https://github.com/diamondsbattle/blade-browser');

    }//else if(message.content == '//cookie'); {
//        message.channel.sendMessage(':cookie:');

//    }else if(message.content == '//logo'); {
//        message.channel.sendMessage(':blade_logo:');
//    }

});

bot.login('/*Put token here*/');
