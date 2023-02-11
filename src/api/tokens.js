import axios from 'axios';
import moment from 'moment';

const URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

export const tokensQuery = () => {
  const start = moment().subtract(2, 'day').unix();
  const query = `
    {
      tokens(first: 10, orderBy: totalValueLockedUSD, orderDirection: desc, skip: 2) {
        id
        name
        symbol
        totalValueLockedUSD
        tokenDayData(
          first: 2
          orderDirection: desc
          where: {date_gte: ${start}}
          orderBy: date
        ) {
          priceUSD
        }
      }
    }
  `;
  return axios
    .post(URL, { query })
    .then(({ data }) => data.data.tokens)
    .catch((error) => error);
};
