import React, { useState } from 'react';
import Transaction from '../../types/tx';
import { convertTime, formatAddr, addressLink, txLink } from '../../utils';

const HEADERS = ['Transaction', 'Amount (ETH)', 'Swap', 'Time'];

interface Props {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<Props> = ({ transactions }) => {
  /* Pagination Logic */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const lastPage = Math.ceil(transactions.length / itemsPerPage);

  const setPrevious = (): void => {
    setCurrentPage(currentPage - 1);
  };

  const setCurrent = (): void => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <table className='min-w-full'>
        <thead>
          <tr className='bg-gray-100'>
            {HEADERS.map((header) => {
              return <th className='border px-4 py-6'>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((transaction) => {
            return (
              <tr className='even:bg-gray-100 odd:bg-white'>
                {/* Transaction ID */}
                <td className='border p-3 text-blue-400'>
                  <a
                    href={txLink(transaction.id)}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {transaction.id}
                  </a>
                </td>
                {/* Value of the transaction */}
                <td className='border px-4 py-2'>{transaction.value}</td>
                <td className='border px-4 py-2 divide-y'>
                  {transaction.swaps.map((swap, index) => {
                    return (
                      <div key={index} className='flex flex-col py-1'>
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
                {/* Timestamp (ex: a minute ago) */}
                <td className='border px-4 py-2'>
                  {convertTime(transaction.timestamp)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='flex justify-center content-center py-4'>
        <button
          className='mr-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full'
          disabled={currentPage === 1}
          onClick={setPrevious}
        >
          Previous
        </button>
        <button
          className='ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
          disabled={currentPage === lastPage}
          onClick={setCurrent}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
