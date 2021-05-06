const request = require('request');
const { RAPID_API_KEY } = require('../config.json');

module.exports = {
	name: 'astro',
	description: 'Show horoscope.',
    guildOnly: true,
    cooldown: 5,
    usage: '{sign}',
	execute(message, args) {
        let sign = args[0];
        const options = {
            method: 'POST',
            url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
            qs: {sign, day: 'today'},
            headers: {
              'x-rapidapi-key': RAPID_API_KEY,
              'x-rapidapi-host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
              useQueryString: true
            }
        };
		request(options, function (err, response, body) {
            if(err){
                message.channel.send(`Error getting horoscope for ${sign}`);
            } else {
                console.log('body: ', body);
                let result = JSON.parse(body);
                message.channel.send(
                    `Color: ${result.color}\nCompatibility: ${result.compatibility}\nCurrent Date: ${result.current_date}\nDate Range: ${result.date_range}\nDescription: ${result.description}\nLucky Number: ${result.lucky_number} \nLucky Time: ${result.lucky_time}\nMood: ${result.mood}` 
                )
            }
        });
	}
};