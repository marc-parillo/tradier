const request = require('request');
const fs = require('fs');

const {getAPIToken} = require('../api-keys');
const {token, apiUrl} = getAPIToken();

const args = process.argv.join('');
const s = args.match(/--symbol=(\w+)/)

let symbol = 'SPY'

if (s && s.length) {
    symbol = s[1];
}

/**
 * Get Option chain for a symbol
 *
 */
request({
    method: 'get',
    url: `${apiUrl}/markets/options/expirations`,
    qs: {
        symbol
    },
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
}, (error, response, body) => {
    if (response.statusCode === 200) {
        console.log(`Success: see expirations.json`);
        fs.writeFileSync(`${__dirname}/../../data/expirations.json`, body);
    } else {
        console.log({body, error});
    }
});