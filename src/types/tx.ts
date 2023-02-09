export interface Swaps {
  sender: string;
  recipient: string;
  amount1: string;
}

export interface Transaction {
  id: string;
  swaps: Swaps[];
  timestamp: number;
  value?: string;
}
