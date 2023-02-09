import axios from 'axios';

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

const poolsQuery = () => {
  return axios
    .post(URL, { query })
    .then(({ data }) => data.data.pools)
    .catch((error) => error);
};

export default poolsQuery;
