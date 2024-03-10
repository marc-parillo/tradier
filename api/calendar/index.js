const request = require('request');
const fs = require("fs");

const {getAPIToken} = require('../api-keys');
const {token, apiUrl} = getAPIToken();

/**
 * Get market calendar
 *
 */
request({
    method: 'get',
    url: `${apiUrl}/markets/calendar`,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
}, (error, response, body) => {
    if (response.statusCode === 200) {
        console.log(`Success: see calendar.json`);
        fs.writeFileSync(`${__dirname}/../../data/calendar.json`, body);
    } else {
        console.log({body, error});
    }
});