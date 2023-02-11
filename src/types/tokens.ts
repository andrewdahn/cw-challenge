interface TokenDayData {
  priceUSD: string;
}

export interface Token {
  id: string;
  name: string;
  symbol: string;
  tokenDayData: TokenDayData[];
  totalValueLockedUSD: string;
}
