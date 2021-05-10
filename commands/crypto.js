const request = require('request');

module.exports = {
	name: 'crypto',
	description: 'Get crypto rates in coins.ph',
    aliases: ['add'],
    usage: '{symbol} e.g. !crypto BTC-PHP, !crypto ETH-PHP https://docs.coins.asia/docs/market-rates-v2',
	execute(message, args) {
        const symbol = args[0];

        const options = {
            method: 'GET',
            url: `https://quote.coins.ph/v2/markets/${symbol}`,
            headers: {
                'Authorization': 'Bearer useraccesstoken',
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json'
            }
        };
		request(options, function (err, response, body) {
            if(err){
                message.channel.send(`Failed to get rates for ${symbol}`);
            } else {
                let result = JSON.parse(body);
                message.channel.send(
                    `Symbol: ${result.symbol}\nCurrency: ${result.currency}\nProduct: ${result.product}\nBid: ${result.bid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\nAsk: ${result.ask.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` 
                )
            }
        });
	},
};