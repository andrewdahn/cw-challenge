import { formatAddr, addressLink, tokenLink } from '../../utils';
import Hyperlink from '../../common/Hyperlink';
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
      <div>
        <span>Sender </span>
        <Hyperlink
          link={addressLink(swap.recipient)}
          label={formatAddr(swap.sender)}
          styling='text-blue-400'
        />
        <span className='text-slate-800 font-light'> for</span>
        <p className='font-medium'>
          {swap.amount0}
          <Hyperlink
            link={tokenLink(swap.token0.id)}
            label={swap.token0.symbol}
            styling='text-slate-500'
          />
        </p>
      </div>
      {/* Recipient */}
      <div>
        <span>Recipient </span>
        <Hyperlink
          link={addressLink(swap.recipient)}
          label={formatAddr(swap.recipient)}
          styling='text-blue-400'
        />
        <span className='text-slate-800 font-light'> for</span>
        <p className='font-medium'>
          {swap.amount1}
          <Hyperlink
            link={tokenLink(swap.token1.id)}
            label={swap.token1.symbol}
            styling='text-slate-500'
          />
        </p>
      </div>
    </>
  );
};

export default TransactionsTableSwapListItem;
