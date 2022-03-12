# 🎶 Musiink

This is a simple but straightforward bot to play music on your Discord server. You only need to add it to your server and use /play command! It supports YouTube (and YT Music), Spotify and SoundCloud media/playlists :)

For example, you can start the party in your voice channel by typing "/play " and then, using the bot command, you can type the name of the song you want to play or paste the link. The bot will join your voice channel and start playing music lightning fast!

Also, you can:

- Manage the playback pausing, resuming or stopping the song
- Skip songs you are not in the mood to listen to
- Ask what song is playing now (and get a pretty nice graphical representation, I must say)
- Shuffling the playlist if you are tired of listening to it always in the same order
- …and more! I’m continuously developing the bot and planning to add more useful commands, but always attached to the idea of a simple and easy to use music bot.

Plus, the bot is very polite, we put our efforts on make it understandable and have a human-friendly interface.

For now, the bot is only available in spanish, but you can use it anyways since there’s not much to read.

## Table of content

* [Requirements](#requirements)
* [Getting started](#getting-started)
* [Contributing](#contributing)
* [Author](#author)
* [License](#license)

## Requirements

- [Node](https://nodejs.org/en/) - Version 16 or higher
- [NPM](https://www.npmjs.com/)
- [FFMPEG](https://www.ffmpeg.org/)

## Getting started

First, make sure you have all the required tools installed on your local machine then continue with these steps.

### Installation

```bash
# Clone the repository
git clone https://github.com/Javiink/musiink-bot.git

# Enter into the directory
cd musiink-bot/

# Install the dependencies
npm install
```

## Required permissions

**Important:** Make sure that your bot has the `applications.commands` application scope enabled, which can be found under the `OAuth2` tap on the [developer portal](https://discord.com/developers/applications/)

## Commands

* ▶️ Play music

`/play URL_OR_SONGTITLE`

* ⏸️ Pause music

`/pause`

* ⏯️ Resume music

`/resume`

* ⏭️ Skip song

`/skip`

* ⏹️ Stop music

`/stop`

* 🔀 Shuffle the playlist

`/shuffle`

* 🎶 What's playing now?

`/nowplaying`


## Contributing

You are welcome to contribute by submitting a Pull Request to the repository.

## Author

Forked from [GabrielTanner's Discord music bot](https://github.com/TannerGabriel/discord-bot), tweaked by [Javiink](https://github.com/Javiink) (Javiink#6285)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
