module.exports = {
	name: 'ping',
	description: 'Ping!',
    guildOnly: true,
    cooldown: 5,
    usage: '!ping',
	execute(message, args) {
		message.channel.send('Pong.');
	}
};