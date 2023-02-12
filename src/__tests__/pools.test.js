import { poolsQuery } from '../api/pools';

describe('pools', () => {
  it('should check if the pools have id and tvl keys', async () => {
    const response = await poolsQuery();
    const keys = ['id', 'totalValueLockedUSD'];

    keys.forEach((key) => {
      response.forEach((pool) => {
        expect(pool).toHaveProperty(key);
      });
    });
  });
  it('should check if ids are hex decimal', async () => {
    const response = await poolsQuery();

    response.forEach((pool) => {
      expect(pool.id).toContain('0x');
    });
  });
  it('should fetch 10 pool entries', async () => {
    const response = await poolsQuery();
    expect(response.length).toBe(10);
  });
});
