import { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import PoolsTable from './components/PoolsTable';
import TokensTable from './components/TokensTable';
import TransactionsTable from './components/TransactionsTable';
import { Transaction, Pool } from './types';
import { txQuery } from './api/tx';
import { poolsQuery } from './api/pool';
import { tokensQuery } from './api/tokens';

const App: React.FC = () => {
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [pools, setPools] = useState<Pool[]>([]);
  const [tokens, setTokens] = useState([]);

  const fetchTxs = useCallback(async (): Promise<void> => {
    const web3 = new Web3(window.ethereum);
    const transactions = await txQuery();

    for (let transaction of transactions) {
      const { value } = await web3.eth.getTransaction(transaction.id);
      transaction.value = Web3.utils.fromWei(value);
    }

    setTxs(transactions);
    return transactions;
  }, []);

  const fetchTokens = useCallback(async (): Promise<void> => {
    const tokens = await tokensQuery();
    setTokens(tokens);
    return tokens;
  }, []);

  const fetchPools = useCallback(async (): Promise<void> => {
    const pools = await poolsQuery();
    setPools(pools);
    return pools;
  }, []);

  const fetchAll = useCallback(async () => {
    const fetches = [fetchPools(), fetchTokens(), fetchTxs()];
    const data = await Promise.all(fetches);
    return data;
  }, [fetchPools, fetchTokens, fetchTxs]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className='py-5 container mx-auto'>
      <div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={fetchAll}
        >
          Fetch All Data
        </button>
      </div>
      <PoolsTable pools={pools} />
      <TokensTable tokens={tokens} />
      <TransactionsTable transactions={txs} />
    </div>
  );
};

export default App;
