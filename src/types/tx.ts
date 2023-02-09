export interface Token0 {
  id: string;
  symbol: string;
}

export interface Token1 {
  id: string;
  symbol: string;
}

export interface Swaps {
  sender: string;
  amount0: string;
  recipient: string;
  amount1: string;
  token0: Token0;
  token1: Token1;
}

export interface Transaction {
  id: string;
  timestamp: number;
  swaps: Swaps[];
  value?: string;
}
