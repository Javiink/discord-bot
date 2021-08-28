const fs = require('fs');
const {prefix} = require('../config.json');

module.exports = {
  icon: '❓',
  name: 'help',
  description: 'Te dice qué puedo hacer y cómo. (Esto mismo que estás leyendo, vaya)',
  execute(interaction) {
    let str = '';
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`./${file}`);
      str += `\n\n${command.icon}\t**${prefix}${command.name}**\n\t${command.description}`;
    }
    return void interaction.reply({
      embeds: [
        {
          title: '👋 Hola! Soy Musiink Bot y esto es lo que puedo hacer:',
          description: str,
          color: 0xffffff,
        },
      ],
      ephemeral: true,
    });
  },
};
