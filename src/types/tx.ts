interface Swaps {
  sender: string;
  recipient: string;
  amount1: string;
}

interface Transaction {
  id: string;
  swaps: Swaps[];
  timestamp: number;
}

export default Transaction;
