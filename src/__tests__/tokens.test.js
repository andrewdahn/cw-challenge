import { tokensQuery } from '../api/tokens';

describe('tokens', () => {
  it('should check if tokens contain id, name, symbol, tvl, token data', async () => {
    const response = await tokensQuery();
    const keys = [
      'id',
      'name',
      'symbol',
      'totalValueLockedUSD',
      'tokenDayData',
    ];

    keys.forEach((key) => {
      response.forEach((pool) => {
        expect(pool).toHaveProperty(key);
      });
    });
  });
  it('should fetch 20 pool entries', async () => {
    const response = await tokensQuery();
    expect(response.length).toBe(20);
  });
  it('should contain yesterday and today token data', async () => {
    const response = await tokensQuery();
    expect(response[0].tokenDayData.length).toBe(2);
  });
});
