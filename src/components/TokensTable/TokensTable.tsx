import { Token } from '../../types';
import { formatFiat } from '../../utils';
import { tokenInfo } from '../../utils';
import Hyperlink from '../../common/Hyperlink';

interface Props {
  tokens: Token[];
}

const TokensTable: React.FC<Props> = ({ tokens }) => {
  const HEADERS: string[] = [
    'Token',
    'Price ($)',
    'Change (%)',
    'Total Value Locked ($)',
  ];

  const getPercentageChange = (oldPrice: string, newPrice: string) => {
    const x = parseFloat(oldPrice);
    const y = parseFloat(newPrice);
    let decreaseValue = x - y;
    let result = (decreaseValue / x) * 100;
    return result;
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
          {tokens.map((token, index) => {
            const tokenPrice =
              token.tokenDayData.length !== 0
                ? formatFiat(token.tokenDayData[0].priceUSD)
                : '0';
            const priceChange = token.tokenDayData.map((a) => a.priceUSD);

            return (
              <tr key={index} className='even:bg-gray-100 odd:bg-white'>
                <td className='border px-4 py-2'>
                  <Hyperlink
                    link={tokenInfo(token.id)}
                    label={`${token.name} (${token.symbol})`}
                    styling='text-blue-400'
                  />
                </td>
                <td className='border px-4 py-2'>{tokenPrice}</td>
                <td className='border px-4 py-2'>
                  {token.tokenDayData.length !== 0
                    ? getPercentageChange(priceChange[0], priceChange[1])
                    : '0'}
                </td>
                <td className='border px-4 py-2'>
                  {formatFiat(token.totalValueLockedUSD)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TokensTable;
