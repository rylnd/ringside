import { product } from '../src/utils';

describe('utils', () => {
  describe('product', () => {
    it('returns the cartesian product of no arrays', () => {
      const products = product([]);

      expect(products).toEqual([[]]);
    });

    it('returns the cartesian product of simple arrays', () => {
      const products = product([[1], [3]]);

      expect(products).toEqual([[1, 3]]);
    });

    it('returns the cartesian product of larger arrays', () => {
      const products = product([[1, 2], [3, 4], [5, 6, 7]]);

      expect(products).toContainEqual([1, 3, 5]);
      expect(products).toContainEqual([1, 4, 5]);
      expect(products.length).toEqual(12);
    });
  });
});
