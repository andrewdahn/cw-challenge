import { formatAddr, addressLink } from '../../utils';
import { Swaps } from '../../types';

interface Props {
  swap: Swaps;
}

/*
  Renders swap list item in the Transactions table
*/
const TransactionsTableSwapListItem: React.FC<Props> = ({ swap }) => {
  return (
    <>
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
    </>
  );
};

export default TransactionsTableSwapListItem;
