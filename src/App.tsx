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
  }, []);

  const fetchTokens = useCallback(async (): Promise<void> => {
    const tokens = await tokensQuery();
    setTokens(tokens);
  }, []);

  const fetchPools = useCallback(async (): Promise<void> => {
    const pools = await poolsQuery();
    setPools(pools);
  }, []);

  useEffect(() => {
    fetchTxs();
    fetchTokens();
    fetchPools();
  }, [fetchTxs, fetchTokens, fetchPools]);

  return (
    <div className='container mx-auto'>
      <PoolsTable pools={pools} />
      <TokensTable tokens={tokens} />
      <TransactionsTable transactions={txs} />
    </div>
  );
};

export default App;
