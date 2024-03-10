const request = require('request');
const fs = require("fs");

const {getAPIToken} = require('../api-keys');
const {token, apiUrl} = getAPIToken();

/**
 * Historical stock prices
 *
 */

request({
    method: 'get',
    url: `${apiUrl}/markets/timesales`,
    qs: {
        symbol: 'NVDA',
        interval: '1min',
        start: '2024-03-01 15:00',
        end: '2024-03-01 15:10',
    },
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
}, (error, response, body) => {
    if (response.statusCode === 200) {
        console.log(`Success: see history.json`);
        fs.writeFileSync(`${__dirname}/../../data/history.json`, body);
    } else {
        console.log({body, error});
    }
});