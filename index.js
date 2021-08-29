const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/Client');
const {token} = require('./config.json');
const {Player} = require('discord-player');
const logger = require('./logger')
const chalk = require('chalk');

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const player = new Player(client);

player.on('error', (queue, error) => {
  logger.error(chalk.greenBright(`[${queue.guild.name}] `)+` Error emitted from the queue: ${error.message}`);
});

player.on('connectionError', (queue, error) => {
  logger.error(chalk.greenBright(`[${queue.guild.name}] `)+` Error emitted from the connection: ${error.message}`);
});

player.on('trackStart', (queue, track) => {
  queue.metadata.send(`✅ 🎵 Vamos con **${track.title}**, estamos en **${queue.connection.channel.name}**!`);
  logger.log(chalk.greenBright(`[${queue.guild.name}] `)+`Started playing ${track.title}`);
});

player.on('trackAdd', (queue, track) => {
  queue.metadata.send(`✅ 🎵 Agregada **${track.title}** a la lista de reproducción!`);
  logger.log(chalk.greenBright(`[${queue.guild.name}] `)+`Queued ${track.title}`);
});

player.on('botDisconnect', queue => {
  queue.metadata.send('⚠️ Me habéis echado del canal! 😢 Sois mala gente...');
  logger.info(chalk.greenBright(`[${queue.guild.name}] `)+`Manually removed from channel`);
});

player.on('channelEmpty', queue => {
  queue.metadata.send('⚠️ Me habéis dejado solito, así que marcho');
  logger.info(chalk.greenBright(`[${queue.guild.name}] `)+`Exiting, last one in voice channel`);
});

player.on('queueEnd', queue => {
  queue.metadata.send('ℹ️ Hemos acabado la lista de reproducción!');
  logger.info(chalk.greenBright(`[${queue.guild.name}] `)+`Finished playing queue`);
});

client.once('ready', async () => {
  logger.info(chalk.cyan.bold('[STARTUP]')+' Listo!');
});

client.once('reconnecting', () => {
  logger.warn('Reconectando...');
});

client.once('disconnect', () => {
  logger.warn('Desconectado!');
});

client.on("guildCreate", guild => {
    guild.systemChannel.send({
      embeds: [
        {
          title: '👋 Hola!',
          description: `Gracias por agregarme al servidor 🥰\nPara que a todo el mundo le sea más fácil usar mis funciones, **es necesario que instale mis comandos de barra** en el servidor.\nAsí, cuando alguien escriba / en el chat, aparecerán mis comandos y su descripción.\nPara esto **escribe !install en el chat** y comenzaré a instalarlos.\n\nSi necesitas ayuda sobre cómo usarme, usa mi comando /help y si tienes algún problema, escribe a Javiink#6285\n\n 🎵 Que empiece la fiesta! 🎵`,
          color: 0xffffff,
        },
      ],
    });
    logger.highlight(chalk.magenta.bold('BOT ADDED TO SERVER! ')+chalk.greenBright.bold(`[${guild.name}]`)+` (id: ${guild.id}) - Members: ${guild.memberCount}}`);
});

client.on("guildDelete", guild => {
    logger.highlight(chalk.red.bold('BOT --REMOVED-- FROM SERVER! ')+chalk.greenBright.bold(`[${guild.name}]`)+` (id: ${guild.id})`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  if (!client.application?.owner) await client.application?.fetch();

  if (message.content === "!install" && message.author.id === client.application?.owner?.id) {
      await message.guild.commands.set(client.commands).then(() => {
        message.reply("✅ Comandos instalados! Ahora se puede escribir / en el chat para que aparezcan mis comandos y su descripción.");
        logger.success(`[${message.guild.name}] - Commands installed!!`)
      })
      .catch((err) => {
        message.reply("❌ No he podido instalar los comandos 😕 Comprueba que tengo el permiso application.commands");
        logger.error(err);
      });
  }
});

client.on('interactionCreate', async interaction => {
  const command = client.commands.get(interaction.commandName.toLowerCase());
  date = interaction.createdAt;
  logger.info(chalk.greenBright(`[${interaction.guild.name}] `)+`User ${chalk.yellowBright(interaction.user.username)} issued ${chalk.bold(interaction.commandName.toLowerCase())} `+(interaction.options.get('query')?chalk.bold(interaction.options.get('query').value):''));

  try {
    command.execute(interaction, player);
  } catch (error) {
    logger.error(error);
    interaction.followUp({
      content: '❌ Ups, ha pasado algo chungo 😵‍💫',
    });
  }
});

client.login(token);
