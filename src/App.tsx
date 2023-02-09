import { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import PoolsTable from './components/PoolsTable';
import TransactionsTable from './components/TransactionsTable';
import { Transaction } from './types';
import txQuery from './api/tx';

const App: React.FC = () => {
  const [txs, setTxs] = useState<Transaction[]>([]);

  const fetchTxs = useCallback(async (): Promise<void> => {
    const web3 = new Web3(window.ethereum);
    const transactions = await txQuery();

    for (let transaction of transactions) {
      const { value } = await web3.eth.getTransaction(transaction.id);
      transaction.value = Web3.utils.fromWei(value);
    }

    setTxs(transactions);
  }, []);

  useEffect(() => {
    fetchTxs();
  }, [fetchTxs]);

  return (
    <div className='container mx-auto'>
      <PoolsTable />
      <TransactionsTable transactions={txs} />
    </div>
  );
};

export default App;
