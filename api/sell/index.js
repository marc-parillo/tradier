const request = require('request');
const fs = require("fs");

const {getAPIToken} = require('../api-keys');
const {token, accountId, apiUrl} = getAPIToken();

/**
 * Sell option
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
        side: 'sell_to_close',
        quantity: 10,
        type: 'market',
        duration: 'day'
    },
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
}, (error, response, body) => {
    if (response.statusCode === 200) {
        console.log(`Success: see sell.json`);
        fs.writeFileSync(`${__dirname}/../../data/sell.json`, body);
    } else {
        console.log({body, error});
    }
});