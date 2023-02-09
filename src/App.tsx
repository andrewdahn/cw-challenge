import React, { useState, useEffect } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Transaction from './types/tx';
import txQuery from './api/tx';

const App: React.FC = () => {
  const [txs, setTxs] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTxs();
  }, []);

  const fetchTxs = async (): Promise<any> => {
    let txns = await txQuery();
    setTxs(txns);
  };

  return (
    <div className='container mx-auto'>
      <TransactionsTable transactions={txs} />
    </div>
  );
};

export default App;
