import { sum } from './sum';

describe('Test the function sum', () => {
  it('Sums to given numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
