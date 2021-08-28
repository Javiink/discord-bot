const {GuildMember} = require('discord.js');

module.exports = {
  icon: '⏯️',
  name: 'resume',
  description: 'Continúa la reproducción donde se dejó',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: '❌ Tienes que estar en el canal de voz para eso!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: '❌ Tienes que estar en el canal de voz para eso!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '❌ No hay nada reproduciéndose, igual lo has soñado 😕',
      });
    const success = queue.setPaused(false);
    return void interaction.followUp({
      content: success ? '✅ ▶ Seguimos!' : 'Ups, ha pasado algo chungo 😵‍💫',
    });
  },
};
