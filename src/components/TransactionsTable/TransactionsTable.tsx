import React from 'react';
import Transaction from '../../types/tx';
import {
  convertTime,
  formatAddr,
  addressLink,
  txLink,
  shortenTxId,
} from '../../utils';

interface Props {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<Props> = ({ transactions }) => {
  console.log(transactions);

  return (
    <div>
      <table className='table-auto'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Total Amount</th>
            <th>Swaps</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr>
                <td>
                  <a
                    href={txLink(transaction.id)}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {shortenTxId(transaction.id)}
                  </a>
                </td>
                <td></td>
                <td>
                  {transaction.swaps.map((swap) => {
                    return (
                      <div className='flex flex-col'>
                        {/* Sender */}
                        <span>
                          Sender:{' '}
                          <a
                            href={addressLink(swap.recipient)}
                            target='_blank'
                            rel='noreferrer'
                            className='text-blue-500'
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
                            className='text-red-500'
                          >
                            {formatAddr(swap.recipient)}
                          </a>
                        </span>
                      </div>
                    );
                  })}
                </td>
                <td>{convertTime(transaction.timestamp)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
