import axios from 'axios';
import moment from 'moment';
import { find } from 'lodash';
const URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

export const poolsQuery = () => {
  const query = `
    {
      pools(orderBy: totalValueLockedUSD, first: 10, orderDirection: desc, skip: 4) {
        id
        totalValueLockedUSD
      }
    }
  `;
  return axios
    .post(URL, { query })
    .then(({ data }) => {
      let pools = data.data.pools;
      pools.map(async (pool) => {
        let volume = await volumeQuery(pool.id);
        if (volume.length !== 0) {
          const { volumeUSD } = find(volume, 'volumeUSD');
          pool.volumeUSD = volumeUSD;
        }
        return pool;
      });
      return data.data.pools;
    })
    .catch((error) => error);
};

const volumeQuery = (id) => {
  const start = moment().subtract(1, 'day').startOf('day').unix();
  const end = moment().subtract(1, 'day').endOf('day').unix();

  const query = `
    {
      poolDayDatas(
        orderBy: tvlUSD
        orderDirection: desc
        where: {
          pool: "${id}"
          date_gt: ${start},
          date_lt: ${end}}
      ) {
        id
        volumeUSD
      }
    }
  `;

  return axios
    .post(URL, { query })
    .then(({ data }) => data.data.poolDayDatas)
    .catch((error) => error);
};
