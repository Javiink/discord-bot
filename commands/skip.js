const {GuildMember} = require('discord.js');

module.exports = {
  icon: '⏭️',
  name: 'skip',
  description: 'No te gusta esa canción? No pasa nada, la saltamos',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: '❌ Tienes que estar en el canal de voz para poder saltar la canción!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: '❌ Tienes que estar en el canal de voz para poder saltar la canción!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: '❌ No hay ninguna canción que pueda saltar'});
    const currentTrack = queue.current;
    const success = queue.skip();
    return void interaction.followUp({
      content: success ? `✅ ⏭️ Vale, saltamos **${currentTrack}**!` : 'Ups, ha pasado algo chungo 😵‍💫',
    });
  },
};
