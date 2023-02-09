const axios = require('axios');

const URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

const query = `
  {
    tokens(orderDirection: desc) {
      id
      name
      symbol
      derivedETH
      totalValueLocked
    }
  }
`;

const tokensQuery = () => {
  return axios
    .post(URL, { query })
    .then(({ data }) => console.log(data.data))
    .catch((error) => error);
};

export default tokensQuery;
