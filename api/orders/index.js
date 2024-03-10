const request = require('request');
const fs = require("fs");

const {getAPIToken, config} = require('../api-keys');
const {token, accountId, apiUrl} = getAPIToken();

if (config.useSandboxAccount) {
    console.info('SANDBOX ACCOUNT');
}

/**
 * Get open orders
 *
 */
request({
    method: 'get',
    url: `${apiUrl}/accounts/${accountId}/orders?includeTags=true`,
    responseType: 'json',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
}, (error, response, body) => {
    if (response.statusCode === 200) {
        console.log(`Success: see orders.json`);
        fs.writeFileSync(`${__dirname}/../../data/orders.json`, body);
    } else {
        console.log({body, error});
    }
});