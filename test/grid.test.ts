import { Grid } from '../src';
import { XBasis, YBasis } from '../src/types';
import { fullRect } from '../src/utils';

describe('Grid', () => {
  let grid;
  let inner;
  let outer;

  beforeEach(() => {
    outer = { height: 200, width: 200, top: 0, left: 0 };
    inner = { height: 100, width: 100, top: 10, left: 20 };
    grid = new Grid(inner, outer);
  });

  describe('#xScale', () => {
    let scale;

    beforeEach(() => {
      scale = grid.xScale;
    });

    it('scales OUTER_LEFT to outer left value', () => {
      expect(scale(XBasis.OUTER_LEFT)).toEqual(outer.left);
    });

    it('scales INNER_LEFT to inner left value', () => {
      expect(scale(XBasis.INNER_LEFT)).toEqual(inner.left);
    });

    it('scales INNER_RIGHT to inner right value', () => {
      expect(scale(XBasis.INNER_RIGHT)).toEqual(fullRect(inner).right);
    });

    it('scales OUTER_RIGHT to inner top value', () => {
      expect(scale(XBasis.OUTER_RIGHT)).toEqual(fullRect(outer).right);
    });

    it('interpolates between values', () => {
      const innerMiddle = (XBasis.INNER_LEFT + XBasis.INNER_RIGHT) / 2;

      expect(scale(innerMiddle)).toEqual(
        (inner.left + fullRect(inner).right) / 2,
      );
    });
  });

  describe('#yScale', () => {
    let scale;

    beforeEach(() => {
      scale = grid.yScale;
    });

    it('scales OUTER_TOP to outer top value', () => {
      expect(scale(YBasis.OUTER_TOP)).toEqual(outer.top);
    });

    it('scales INNER_TOP to inner top value', () => {
      expect(scale(YBasis.INNER_TOP)).toEqual(inner.top);
    });

    it('scales INNER_BOTTOM to inner bottom value', () => {
      expect(scale(YBasis.INNER_BOTTOM)).toEqual(fullRect(inner).bottom);
    });

    it('scales OUTER_BOTTOM to outer bottom value', () => {
      expect(scale(YBasis.OUTER_BOTTOM)).toEqual(fullRect(outer).bottom);
    });

    it('interpolates between values', () => {
      const innerMiddle = (YBasis.INNER_TOP + YBasis.INNER_BOTTOM) / 2;

      expect(scale(innerMiddle)).toEqual(
        (inner.top + fullRect(inner).bottom) / 2,
      );
    });
  });
});
