import { fitsBounds } from '../src';
import { fullBounds } from '../src/utils';

describe('fitsBounds', () => {
  let bounds;

  beforeEach(() => {
    bounds = { height: 100, width: 100, top: 0, left: 0 };
  });

  it('is true if bounds are identical', () => {
    expect(fitsBounds(bounds, bounds)).toBeTruthy();
  });

  it('is false if top would overflow', () => {
    const target = { ...bounds, top: -1 };

    expect(fitsBounds(target, bounds)).toBeFalsy();
  });

  it('is false if left would overflow', () => {
    const target = { ...bounds, left: -1 };

    expect(fitsBounds(target, bounds)).toBeFalsy();
  });

  it('is false if right would overflow', () => {
    const target = { ...bounds, width: 101 };

    expect(fitsBounds(target, bounds)).toBeFalsy();
  });

  it('is false if bottom would overflow', () => {
    const target = { ...bounds, height: 101 };

    expect(fitsBounds(target, bounds)).toBeFalsy();
  });
});
