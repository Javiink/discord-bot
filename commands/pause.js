const {GuildMember} = require('discord.js');

module.exports = {
  icon: '⏸️',
  name: 'pause',
  description: 'Pausa lo que se esté reproduciendo. Un descansito.',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: '❌ Tienes que estar en el canal de voz para pausar la música!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: '❌ Tienes que estar en el canal de voz para pausar la música!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '❌ No hay nada que pueda pausar',
      });
    const success = queue.setPaused(true);
    return void interaction.followUp({
      content: success ? '✅ ⏸ | Vale, pausamos un momentito' : '❌ Ups, ha pasado algo chungo 😵‍💫',
    });
  },
};
