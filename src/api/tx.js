import axios from 'axios';

const URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

const query = `
{
  transactions(first: 50, orderBy: timestamp, orderDirection: desc) {
    id
    timestamp
    swaps {
      sender
      recipient
      amount1
    }
  }
}
`;

const txQuery = () => {
  return axios
    .post(URL, { query })
    .then(({ data }) => data.data.transactions)
    .catch((error) => error);
};

export default txQuery;
