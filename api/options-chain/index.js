const request = require('request');
const fs = require('fs');
const moment = require('moment-timezone');

const {getAPIToken, config} = require('../api-keys');
const {token, apiUrl} = getAPIToken();

if (config.useSandboxAccount) {
    console.info('SANDBOX ACCOUNT');
}

let symbol = 'SPY'
let date = moment().format('YYYY-MM-DD');

const args = process.argv.join('');
const s = args.match(/--symbol=(\w+)/)
const d = args.match(/--date=(\d{4}-\d{2}-\d{2})/)

if (s && s.length) {
    symbol = s[1];
}

if (d && d.length) {
    date = d[1];
}

/**
 * Get option chain for a symbol
 *
 */

request({
    method: 'get',
    url: `${apiUrl}/markets/options/chains`,
    qs: {
        symbol: symbol,
        // Must be set to a date when the option is being offered
        // See api/expirations
        expiration: date,
        greeks: 'true'
    },
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
}, (error, response, body) => {
    if (response.statusCode === 200) {
        console.log(`Success: see options-chain.json`);
        fs.writeFileSync(`${__dirname}/../../data/options-chain.json`, body);
    } else {
        console.log({body, error});
    }
});