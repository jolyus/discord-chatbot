const request = require('request');
const { WEATHER_API_KEY, WEATHER_UNITS } = require('../config.json');

module.exports = {
	name: 'weather',
	description: 'The current weather.',
    guildOnly: true,
    cooldown: 5,
    usage: '{city}',
	execute(message, args) {
        let apiKey = process.env.WEATHER_API_KEY || WEATHER_API_KEY;
        let city = args.join(' ');
        let units = process.env.WEATHER_UNITS || WEATHER_UNITS;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`

		request(url, function (err, response, body) {
            if(err){
            } else {
                let result = JSON.parse(body);
                message.channel.send(
                    `Country: ${result.sys.country}\nCity: ${result.name}\nTimezon: GMT${result.timezone / 3600}\nWeather: ${result.weather[0].main}\nDescription: ${result.weather[0].description}\nTemp: ${result.main.temp} degrees celsius\nPressure: ${result.main.pressure}\nHumidity: ${result.main.humidity}` 
                )
            }
        });
	}
};