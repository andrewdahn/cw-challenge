import { useState } from 'react';
import { Transaction } from '../../types';
import TransactionsTableListItems from './TransactionsTableListItems';
import PaginationButtons from '../../common/PaginationButtons';

interface Props {
  transactions: Transaction[];
}

/*
  Transactions Table 
  Headers are Transaction / Amount / Swap / Time
*/
const TransactionsTable: React.FC<Props> = ({ transactions }) => {
  const HEADERS: string[] = ['Transaction', 'Amount (ETH)', 'Swap', 'Time'];

  /* Pagination Logic */
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: Transaction[] = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const lastPage: number = Math.ceil(transactions.length / itemsPerPage);

  const setPrevious = (): void => {
    setCurrentPage(currentPage - 1);
  };

  const setCurrent = (): void => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <table className='min-w-full'>
        {/* Headers */}
        <thead>
          <tr className='bg-gray-100'>
            {HEADERS.map((header) => {
              return <th className='border px-4 py-6'>{header}</th>;
            })}
          </tr>
        </thead>
        {/* Row entries */}
        <tbody>
          {currentItems.map((transaction) => {
            return <TransactionsTableListItems transaction={transaction} />;
          })}
        </tbody>
      </table>
      {/* Prev / Next buttons */}
      <PaginationButtons
        setCurrent={setCurrent}
        setPrevious={setPrevious}
        currentPage={currentPage}
        lastPage={lastPage}
      />
    </div>
  );
};

export default TransactionsTable;
