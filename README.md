## Tradier API Tests

### Never trade with real money until you're ready.

Requirements:

1. Node
2. Update api-keys.js file with Tradier account number and API keys for sandbox and real money accounts.

Examples to run in Terminal:

Market Calendar  
`node api/calendar`

Current Balances  
`node api/balances`

Buy Option  
`node api/buy`

Option Price History  
`node api/history`

Option Expiration Dates for a symbol  
`node api/expirations --symbol=SPY --date=2025-01-17`

Options Chain
`node api/options-chain`

Current Orders  
`node api/orders`

Current Positions  
`node api/positions`

Quote  
`node api/quote --symbol=NVDA`

