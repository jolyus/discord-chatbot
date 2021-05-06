const request = require('request');
const { WEATHER_API_KEY } = require('../config.json');

module.exports = {
	name: 'weather',
	description: 'The current weather.',
    guildOnly: true,
    cooldown: 5,
    usage: '{city}',
	execute(message, args) {
        let apiKey = WEATHER_API_KEY;
        let city = args[0];
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

		request(url, function (err, response, body) {
            if(err){
              console.log('error:', error);
            } else {
              console.log('body:', body);
            }
        });
	}
};