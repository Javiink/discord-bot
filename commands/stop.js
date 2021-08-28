const {GuildMember} = require('discord.js');

module.exports = {
  icon: '⏹️',
  name: 'stop',
  description: 'Para la reproducción y elimina la lista de reproducción',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: '❌ Debes estar en el canal de voz para parar la reproducción!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: '❌ Debes estar en el canal de voz para parar la reproducción!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '❌ La lista de reproducción está vacía!',
      });
    queue.destroy();
    return void interaction.followUp({content: '✅ ⏹️ Okey, paramos!'});
  },
};
