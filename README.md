# CM Full Stack Challange (1)

Note: I used `window.ethereum` as the provider for the web3 calls so please have MetaMask or another web3 wallet extension installed so data is fetched.

# Project Setup

### `npm install`

To install packages

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

To run basic tests I wrote for the API calls using GraphQl queries

# Check List

- [x] Inspect what data / queries will be required using [hosted V3 subgraph explorer](https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3)

- [x] Setup data model, queries, and fetch data from Uniswap V3 Subgraph
- [x] Add a tabular visualization for “Top Pools” that displays total volume locked (TVL), and 24Hr volume
- [x] Add a tabular visualization for “Tokens” that displays price point, price change, and TVL
- [x] Add a tabular visualization for “Transactions” that displays total value, token amounts, linked account to Etherscan, and time (e.g. 15 mins ago)
- [x] Add a button which the user can click to refresh data in the views
- [x] Update readme to outline how to serve the frontend locally
- [x] Include in-line documentation
