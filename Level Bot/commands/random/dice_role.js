const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
    contructor(client) {
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'roll',
            description: 'Rolls a dice'
        });
    }

    async run(message, args) {
        var roll = Math.floor(Math.random() * 6) + 1;
        message.reply("Votre lancé de dé à faits un " + roll);
    }
}

module.exports = DiceRollCommand;
