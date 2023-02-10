import { Pool } from '../../types';
import Hyperlink from '../../common/Hyperlink';
import { poolInfo } from '../../utils';

interface Props {
  pools: Pool[];
}

const PoolsTable: React.FC<Props> = ({ pools }) => {
  const HEADERS: string[] = ['Pool', 'Total Value Locked', '24 HR Volume'];

  const format = (value: any) => {
    if (!value) return '0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(value));
  };

  return (
    <div className='py-5'>
      <table className='min-w-full'>
        {/* Headers */}
        <thead>
          <tr className='bg-gray-100'>
            {HEADERS.map((header, index) => {
              return (
                <th key={index} className='border px-4 py-6'>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        {/* Row entries */}
        <tbody>
          {pools.map((pool, index) => {
            return (
              <tr key={index} className='even:bg-gray-100 odd:bg-white'>
                <td className='border px-4 py-2'>
                  <Hyperlink
                    link={poolInfo(pool.id)}
                    label={pool.id}
                    styling='text-blue-400'
                  />
                </td>
                <td className='border px-4 py-2'>
                  {format(pool.totalValueLockedUSD)}
                </td>

                <td className='border px-4 py-2'>{format(pool.volumeUSD)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PoolsTable;
