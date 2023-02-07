const axios = require('axios');

const URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

const query = `
  {
    pools(orderDirection: desc, orderBy: createdAtTimestamp) {
      id
      totalValueLockedUSD
      totalValueLockedETH
    }
  }
`;

axios
  .post(URL, { query })
  .then((data) => console.log(data.data.data))
  .catch((error) => console.log(error));
