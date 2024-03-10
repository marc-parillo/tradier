const request = require('request');
const fs = require("fs");

const {getAPIToken} = require('../api-keys');
const {token, accountId, apiUrl} = getAPIToken();

/**
 * Get open positions
 *
 */
request({
    method: 'get',
    url: `${apiUrl}/accounts/${accountId}/positions`,
    params: {
        account_id: accountId
    },
    responseType: 'json',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
}, (error, response, body) => {
    if (response.statusCode === 200) {
        console.log(`Success: see positions.json`);
        fs.writeFileSync(`${__dirname}/../../data/positions.json`, body);
    } else {
        console.log({body, error});
    }
});