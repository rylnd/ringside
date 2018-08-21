import { Position } from '../src';
import { XAlignment, YAlignment } from '../src/types';

describe('Position', () => {
  let position;
  let positionBuilder;

  it('returns the initialized height/width', () => {
    position = new Position(1, 2);

    expect(position.height).toEqual(1);
    expect(position.width).toEqual(2);
  });

  describe('alignments', () => {
    beforeEach(() => {
      positionBuilder = (...args) => new Position(1, 2, 0, 0, ...args);
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
