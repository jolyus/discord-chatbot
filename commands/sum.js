module.exports = {
	name: 'sum',
	description: 'Sum all the numbers you enter.',
    aliases: ['add'],
    usage: '1 2 3',
	execute(message, args) {
        const numArgs = args.map(x => parseFloat(x));
        if(!numArgs.length) {
            message.channel.send(`Please include the numbers you want to add! e.g. !sum 1 2 3`);
        } else {
            const sum = numArgs.reduce((counter, x) => counter += x);
            message.channel.send(`The sum of all the arguments you provided is ${sum}!`);
        }
	},
};