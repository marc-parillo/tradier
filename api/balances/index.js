const request = require('request');
const fs = require("fs");

const {getAPIToken} = require('../api-keys');
const {token, accountId, apiUrl} = getAPIToken();

/**
 * Get balances balance
 *
 */
request({
    method: 'get',
    url: `${apiUrl}/accounts/${accountId}/balances`,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
}, (error, response, body) => {
    if (response.statusCode === 200) {
        console.log(`Success: see balances.json`);
        fs.writeFileSync(`${__dirname}/../../data/balances.json`, body);
    } else {
        console.log({body, error});
    }
});
