import { txQuery } from '../api/tx';

describe('transactions', () => {
  it('should check if the transactions have correct properties', async () => {
    const response = await txQuery();
    const keys = ['id', 'timestamp', 'swaps'];

    keys.forEach((key) => {
      response.forEach((pool) => {
        expect(pool).toHaveProperty(key);
      });
    });
  });
  it('should check if the query fetches for 50 entries', async () => {
    const response = await txQuery();
    expect(response.length).toBe(50);
  });
  test('received data should be resolved', async () => {
    const response = txQuery();
    await expect(response).resolves.not.toThrow();
  });
});
