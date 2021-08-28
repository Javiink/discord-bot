const {GuildMember} = require('discord.js');

module.exports = {
  icon: '🔀',
  name: 'shuffle',
  description: 'Escuchar las listas de reproducción siempre en el mismo orden cansa... Si quieres puedes mezclarla!',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: '❌ Tienes que estar en el canal de voz para poder mezclar la lista!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: '❌ Tienes que estar en el canal de voz para poder mezclar la lista!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: '❌ No hay canciones que mezclar en la lista!'});
    const success = queue.shuffle();
    return void interaction.followUp({
      content: success ? `✅ 🔀 He hecho una ensaladilla con las canciones de la lista, que disfrutes del caos 🤪` : 'Ups, ha pasado algo chungo 😵‍💫',
    });
  },
};
