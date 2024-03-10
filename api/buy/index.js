const request = require('request');
const fs = require("fs");

const {getAPIToken, config} = require('../api-keys');
const {token, accountId, apiUrl} = getAPIToken();

if (!config.useSandboxAccount) {
    console.info('WARNING! USING REAL MONEY!');
}

/**
 * Buy option
 *
 */
request({
    method: 'post',
    url: `${apiUrl}/accounts/${accountId}/orders`,
    qs: {
        account_id: accountId,
        class: 'option',
        symbol: 'SPY',
        option_symbol: 'SPY231030C00413000',
        side: 'buy_to_open',
        quantity: 10,
        type: 'market',
        duration: 'day',
        tag: 'my-first-trade'
    },
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
}, (error, response, body) => {
    if (response.statusCode === 200) {
        console.log(`Success: see buy.json`);
        fs.writeFileSync(`${__dirname}/../../data/buy.json`, body);
    } else {
        console.log({body, error});
    }
});