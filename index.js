const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/Client');
const {token} = require('./config.json');
const {Player} = require('discord-player');

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

console.log(client.commands);

const player = new Player(client);

player.on('error', (queue, error) => {
  console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
});

player.on('connectionError', (queue, error) => {
  console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
});

player.on('trackStart', (queue, track) => {
  queue.metadata.send(`✅ 🎵 Vamos con **${track.title}**, estamos en **${queue.connection.channel.name}**!`);
});

player.on('trackAdd', (queue, track) => {
  queue.metadata.send(`✅ 🎵 Agregada **${track.title}** a la lista de reproducción!`);
});

player.on('botDisconnect', queue => {
  queue.metadata.send('⚠️ Me habéis echado del canal! 😢 Como venganza os borro la lista de reproducción, ');
});

player.on('channelEmpty', queue => {
  queue.metadata.send('⚠️ Me habéis dejado solito así que marcho que teño que marchar');
});

player.on('queueEnd', queue => {
  queue.metadata.send('ℹ️ Hemos acabado la lista de reproducción!');
});

client.once('ready', async () => {
  console.log('Ready!');
});

client.once('reconnecting', () => {
  console.log('Reconnecting!');
});

client.once('disconnect', () => {
  console.log('Disconnect!');
});

client.on("guildCreate", guild => {
     console.log(`[BOT AÑADIDO A UN SERVIDOR]: ${guild.name} (id: ${guild.id}). Este servidor tiene ${guild.memberCount} miembros!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  if (!client.application?.owner) await client.application?.fetch();

  if (message.content === "!deploy" && message.author.id === client.application?.owner?.id) {
      await message.guild.commands.set(client.commands).then(() => {
        message.reply("✅ Comandos instalados!");
      })
      .catch((err) => {
        message.reply("❌ No he podido instalar los comandos 😕 Comprueba que tengo el permiso application.commands");
        console.error(err)
      });
  }
});

client.on('interactionCreate', async interaction => {
  const command = client.commands.get(interaction.commandName.toLowerCase());
  date = interaction.createdAt;
  console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\t[${interaction.guild.name}]: User ${interaction.user.username} - ${interaction.commandName.toLowerCase()}`);

  try {
    command.execute(interaction, player);
  } catch (error) {
    console.error(error);
    interaction.followUp({
      content: '❌ Ups, ha pasado algo chungo 😵‍💫',
    });
  }
});

client.login(token);
