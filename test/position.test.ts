import { Position } from '../src';

describe('Position', () => {
  let position;

  it('returns the initialized height/width', () => {
    position = new Position(1, 2);

    expect(position.height).toEqual(1);
    expect(position.width).toEqual(2);
  });

  describe('alignments', () => {
    it('modifies the left value depending on the xAlign value');
    it('modifies the top value depending on the yAlign value');
  });

  describe('refs', () => {
    it('modifies the left value depending on the xGrid value');
    it('modifies the top value depending on the yGrid value');
  });
});
