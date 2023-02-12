import { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import PoolsTable from './components/PoolsTable';
import TokensTable from './components/TokensTable';
import TransactionsTable from './components/TransactionsTable';
import FetchAllButton from './components/FetchAllButton';
import { Pool, Token, Transaction } from './types';
import { txQuery } from './api/tx';
import { poolsQuery } from './api/pools';
import { tokensQuery } from './api/tokens';

const App: React.FC = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [txs, setTxs] = useState<Transaction[]>([]);

  /* fetches pools data */
  const fetchPools = useCallback(async (): Promise<void> => {
    const pools = await poolsQuery();
    setPools(pools);
  }, []);

  /* fetches tokens data */
  const fetchTokens = useCallback(async (): Promise<void> => {
    const tokens = await tokensQuery();
    setTokens(tokens);
  }, []);

  /* fetches transactions data */
  const fetchTxs = useCallback(async (): Promise<void> => {
    const web3 = new Web3(window.ethereum);
    const transactions = await txQuery();

    for (let transaction of transactions) {
      const { value } = await web3.eth.getTransaction(transaction.id);
      transaction.value = Web3.utils.fromWei(value);
    }

    setTxs(transactions);
  }, []);

  /* fetches all data */
  const fetchAll = useCallback(async (): Promise<void> => {
    const fetches = [fetchPools(), fetchTokens(), fetchTxs()];
    await Promise.all(fetches);
  }, [fetchPools, fetchTokens, fetchTxs]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className='py-5 container mx-auto'>
      <FetchAllButton fetchAll={fetchAll} />
      <PoolsTable pools={pools} />
      <TokensTable tokens={tokens} />
      <TransactionsTable transactions={txs} />
    </div>
  );
};

export default App;
