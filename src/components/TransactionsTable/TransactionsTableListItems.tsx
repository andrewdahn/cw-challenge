import TransactionsTableSwapListItem from './TransactionsTableSwapListItem';
import { Transaction } from '../../types';
import { convertTime, txLink } from '../../utils';

interface Props {
  transaction: Transaction;
}

/*
  List items of the Transaction Table
*/
const TransactionsTableListItems: React.FC<Props> = ({ transaction }) => {
  return (
    <tr className='even:bg-gray-100 odd:bg-white'>
      {/* Transaction ID */}
      <td className='border p-3 text-blue-400'>
        <a href={txLink(transaction.id)} target='_blank' rel='noreferrer'>
          {transaction.id}
        </a>
      </td>
      {/* Value of the transaction */}
      <td className='border px-4 py-2'>{transaction.value}</td>
      <td className='border px-4 py-2 divide-y'>
        {transaction.swaps.map((swap, index) => {
          return (
            <div key={index} className='flex flex-col py-1'>
              <TransactionsTableSwapListItem swap={swap} />
            </div>
          );
        })}
      </td>
      {/* Timestamp (ex: a minute ago) */}
      <td className='border px-4 py-2'>{convertTime(transaction.timestamp)}</td>
    </tr>
  );
};

export default TransactionsTableListItems;
