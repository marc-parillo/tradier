const config = {
    "useSandboxAccount": true,
    "description": "Tradier API Token. Always use SANDBOX account until you're ready to trade real money.  All SANDBOX quotes are delayed 15 minutes.",
    "account": "",
    "token": "",
    "sandbox_account": "",
    "sandbox_token": ""
}

/**
 * Account credentials
 *
 */
function getAPIToken(useProd = false) {

    if (useProd) {

        console.info('WARNING! USING REAL MONEY!');

        return {
            accountId: config.account,
            token: config.token,
            apiUrl: 'https://api.tradier.com/v1'
        }

    } else {

        if (config.useSandboxAccount) {

            console.info('USING SANDBOX ACCOUNT');

            return {
                accountId: config['sandbox_account'],
                token: config['sandbox_token'],
                apiUrl: 'https://sandbox.tradier.com/v1'

            }

        } else {

            console.info('WARNING! USING REAL MONEY!');

            return {
                accountId: config.account,
                token: config.token,
                apiUrl: 'https://api.tradier.com/v1'
            }

        }

    }

}

module.exports = {
    config,
    getAPIToken
}
