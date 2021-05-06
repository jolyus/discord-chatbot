const fs = require('fs');
const Discord = require("discord.js");
const {BOT_TOKEN, prefix} = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.aliases = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const { cooldowns, aliases } = client;

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    client.channels.fetch('839670114709798956')
        .then(channel => {
            channel.send(`Hi, I'm ${client.user.username}. Type a command e.g. !ping to get started.`);
        });
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
        message.reply('I can\'t find that command.');
        return;
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (command.guildOnly && message.channel.type === 'dm') {
        message.reply('I can\'t execute that command inside DMs!');
        return;
    }   

	try {
		command.execute(message, args);
	} catch (error) {
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(BOT_TOKEN);