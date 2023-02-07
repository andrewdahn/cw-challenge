const axios = require('axios');

const URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

const query = `
{
  transactions(orderBy: timestamp, orderDirection: desc) {
    id
    swaps {
      sender
      recipient
      amountUSD
    }
    timestamp
  }
}
`;

axios
  .post(URL, { query })
  .then((data) => console.log(data.data.data))
  .catch((error) => console.log(error));
