import { DOMRect } from './types';

export const rectToDOMRect: (
  x: number,
  y: number,
  height: number,
  width: number,
) => DOMRect = (x, y, height, width) => {
  return {
    x,
    y,
    height,
    width,
    top: y,
    left: x,
    bottom: y + height,
    right: x + width,
  };
};
