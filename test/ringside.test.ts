import { Ringside } from '../src';

describe('Ringside', () => {
  let inner;
  let outer;
  let height;
  let width;
  let ringside: Ringside;

  beforeEach(() => {
    outer = { left: 0, top: 0, height: 500, width: 600 };
    inner = { left: 150, top: 200, height: 100, width: 200 };
    height = 40;
    width = 50;

    ringside = new Ringside(inner, outer, height, width);
  });

  describe('#positions', () => {
    it('returns an array of unique positions', () => {
      const positions = ringside.positions();
      const keys = positions.map(p => JSON.stringify(p));

      expect(keys).toEqual(Array.from(new Set(keys)));
    });
  });
});
