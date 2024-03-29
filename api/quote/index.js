const request = require('request');
const fs = require("fs");

const {getAPIToken} = require('../api-keys');
const {token, apiUrl} = getAPIToken();

const exchangeCodes = {
    'A': 'NYSE MKT',
    'B': 'NASDAQ OMX BX',
    'C': 'National Stock Exchange',
    'D': 'FINRA ADF',
    'E': 'Market Independent (Generated by Nasdaq SIP)',
    'F': 'Mutual Funds/Money Markets (NASDAQ)',
    'I': 'International Securities Exchange',
    'J': 'Direct Edge A',
    'K': 'Direct Edge X',
    'L': 'Long Term Stock Exchange',
    'M': 'Chicago Stock Exchange',
    'N': 'NYSE',
    'P': 'NYSE Arca',
    'Q': 'NASDAQ OMX',
    'S': 'NASDAQ Small Cap',
    'T': 'NASDAQ Int',
    'U': 'OTCBB',
    'V': 'OTC other',
    'W': 'CBOE',
    'X': 'NASDAQ OMX PSX',
    'G': 'GLOBEX',
    'Y': 'BATS Y-Exchange',
    'Z': 'BATS'
}

/**
 * Quote for a symbol or option
 *
 */

const args = process.argv.join('');
const s = args.match(/--symbol=(\w+)/)
let symbol = 'SPY'

if (s && s.length) {
    symbol = s[1];
}

request({
    method: 'get',
    url: `${apiUrl}/markets/quotes`,
    qs: {
        'symbols': symbol,
        'greeks': 'false'
    },
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
}, (error, response, body) => {
    if (response.statusCode === 200) {
        console.log(`Success: see quote.json`);
        const res = JSON.parse(body);
        const quote = res.quotes.quote.last;
        const exch = res.quotes.quote.exch;
        console.log(quote, exchangeCodes[exch]);
        fs.writeFileSync(`${__dirname}/../../data/quote.json`, body);
    } else {
        console.log({body, error});
    }

});