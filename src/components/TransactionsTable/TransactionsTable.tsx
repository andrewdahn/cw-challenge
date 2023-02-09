import React from 'react';
import Transaction from '../../types/tx';
import { convertTime, formatAddr, addressLink, txLink } from '../../utils';

const HEADERS = ['Transaction', 'Amount', 'Swap', 'Time'];

interface Props {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<Props> = ({ transactions }) => {
  console.log(transactions);

  return (
    <table className='min-w-full'>
      <thead>
        <tr className='bg-gray-100'>
          {HEADERS.map((header) => {
            return <th className='border px-4 py-6'>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => {
          return (
            <tr className='even:bg-gray-100 odd:bg-white'>
              <td className='border p-3 text-blue-400'>
                <a
                  href={txLink(transaction.id)}
                  target='_blank'
                  rel='noreferrer'
                >
                  {transaction.id}
                </a>
              </td>
              <td className='border px-4 py-2'>Fill in later</td>
              <td className='border px-4 py-2 divide-y'>
                {transaction.swaps.map((swap) => {
                  return (
                    <div className='flex flex-col py-1'>
                      {/* Sender */}
                      <span>
                        Sender:{' '}
                        <a
                          href={addressLink(swap.recipient)}
                          target='_blank'
                          rel='noreferrer'
                          className='text-blue-400'
                        >
                          {formatAddr(swap.sender)}
                        </a>
                      </span>
                      {/* Recipient */}
                      <span>
                        Recipient:{' '}
                        <a
                          href={addressLink(swap.recipient)}
                          target='_blank'
                          rel='noreferrer'
                          className='text-blue-400'
                        >
                          {formatAddr(swap.recipient)}
                        </a>
                      </span>
                    </div>
                  );
                })}
              </td>
              <td className='border px-4 py-2'>
                {convertTime(transaction.timestamp)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
