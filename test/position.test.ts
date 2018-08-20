import { Grid, Position } from '../src';
import { XAlignment, YAlignment, XGrid, YGrid } from '../src/types';

const defaultRect = { height: 100, width: 100, top: 0, left: 0 };

describe('Position', () => {
  let position;
  let positionBuilder;
  let grid;

  beforeEach(() => {
    grid = new Grid(defaultRect, defaultRect);
  });

  it('returns the initialized height/width', () => {
    position = new Position(1, 2, grid);

    expect(position.height).toEqual(1);
    expect(position.width).toEqual(2);
  });

  describe('grid basis', () => {
    beforeEach(() => {
      positionBuilder = (...args) => new Position(1, 2, grid, ...args);
    });

    it('modifies the left value depending on the xGrid value', () => {
      position = positionBuilder(XGrid.INNER_LEFT);
      const alignedPosition = positionBuilder(XGrid.OUTER_RIGHT);

      expect(position.left).toEqual(-2);
      expect(alignedPosition.left).toEqual(98);
    });

    it('modifies the top value depending on the yGrid value', () => {
      position = positionBuilder(XGrid.INNER_LEFT, YGrid.INNER_TOP);
      const alignedPosition = positionBuilder(
        XGrid.INNER_LEFT,
        YGrid.INNER_BOTTOM,
      );

      expect(position.top).toEqual(-1);
      expect(alignedPosition.top).toEqual(99);
    });
  });

  describe('alignments', () => {
    beforeEach(() => {
      positionBuilder = (...args) =>
        new Position(1, 2, grid, XGrid.INNER_LEFT, YGrid.INNER_TOP, ...args);
    });

    it('modifies the left value depending on the xAlign value', () => {
      position = positionBuilder(XAlignment.END);
      const alignedPosition = positionBuilder(XAlignment.START);

      expect(position.left).toEqual(-2);
      expect(alignedPosition.left).toEqual(0);
    });

    it('modifies the top value depending on the yAlign value', () => {
      position = positionBuilder(XAlignment.END, YAlignment.BOTTOM);
      const alignedPosition = positionBuilder(XAlignment.END, YAlignment.TOP);

      expect(position.top).toEqual(-1);
      expect(alignedPosition.top).toEqual(0);
    });
  });
});
