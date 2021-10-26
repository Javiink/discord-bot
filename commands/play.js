const {GuildMember} = require('discord.js');
const {QueryType} = require('discord-player');

module.exports = {
  icon: '▶️',
  name: 'play',
  description: 'Usa esto para reproducir algo. Creo que así funciona.',
  options: [
    {
      name: 'query',
      type: 3, // 'STRING' Type
      description: 'Lo que quieres reproducir',
      required: true,
    },
  ],
  async execute(interaction, player) {
    try {
      if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        return void interaction.reply({
          content: '❌ Debes estar en un canal de voz para poder usar esto!',
          ephemeral: true,
        });
      }

      if (
        interaction.guild.me.voice.channelId &&
        interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
      ) {
        return void interaction.reply({
          content: '❌ Debes estar en un canal de voz para poder usar esto!',
          ephemeral: true,
        });
      }

      await interaction.deferReply();

      const query = interaction.options.get('query').value;
      const searchResult = await player
        .search(query, {
          requestedBy: interaction.user,
          searchEngine: QueryType.AUTO,
        })
        .catch(() => {});
      if (!searchResult || !searchResult.tracks.length)
        return void interaction.followUp({content: '⚠️ No he encontrado nada que reproducir, sorry 😓'});

      const queue = await player.createQueue(interaction.guild, {
        ytdlOptions: {
          quality: "highest",
          filter: "audioonly",
          highWaterMark: 1 << 25,
          dlChunkSize: 0,
        },
        metadata: interaction.channel,
      });
      queue.setVolume(3);

      try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
      } catch {
        void player.deleteQueue(interaction.guildId);
        return void interaction.followUp({
          content: '❌ No puedo entrar a ese canal de voz 🥺',
        });
      }

      await interaction.followUp({
        content: `✅ Cargando tu ${searchResult.playlist ? 'lista de reproducción' : 'canción'}...`,
      });
      searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
      if (!queue.playing) await queue.play();
    } catch (error) {
      console.log(error);
      interaction.followUp({
        content: '❌ Ups, ha pasado algo chungo 😵‍💫 - El servidor dice: ${error}: ' + error.message,
      });
    }
  },
};
