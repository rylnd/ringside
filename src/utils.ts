import { Bounds, MinBounds } from './types';

export const fullBounds: (bounds: MinBounds) => Bounds = minBounds => {
  const { left, top, height, width } = minBounds;

  return {
    x: left,
    y: top,
    height,
    width,
    top,
    left,
    bottom: top + height,
    right: left + width,
  };
};
