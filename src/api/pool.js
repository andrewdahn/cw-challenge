import axios from 'axios';
import moment from 'moment';
import { find } from 'lodash';
const URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

// There seems to be something wrong with poolHourData in this query. It keeps returning '0'.
// Others have reported similar issues here:
// https://github.com/Uniswap/v3-subgraph/issues/95
// https://github.com/Uniswap/v3-subgraph/issues/79

// {
//   pools(orderBy: totalValueLockedUSD, first: 10, orderDirection: desc) {
//     id
//     totalValueLockedUSD
//     poolHourData(
//       first: 24
//       orderBy: periodStartUnix
//       where: {periodStartUnix_gte: start}
//     ) {
//       id
//       volumeUSD
//     }
//   }
// }

// I ended up doing a work around solution to get to the closest values possible

const query = `
{
  pools(orderBy: totalValueLockedUSD, first: 10, orderDirection: desc, skip: 4) {
    id
    totalValueLockedUSD
  }
}
`;

export const poolsQuery = () => {
  return axios
    .post(URL, { query })
    .then(({ data }) => {
      let pools = data.data.pools;
      pools.map(async (pool) => {
        let volume = await getVolumes(pool.id);
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

const getVolumes = (id) => {
  const start = moment().subtract(1, 'day').startOf('day').unix();
  const end = moment().subtract(1, 'day').endOf('day').unix();

  const volumeQuery = `
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
    .post(URL, { query: volumeQuery })
    .then(({ data }) => data.data.poolDayDatas)
    .catch((error) => error);
};
