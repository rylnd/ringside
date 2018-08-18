import { Rectangle, FullRect } from './types';

export const fullRect: (rectangle: Rectangle) => FullRect = rectangle => {
  const { left, top, height, width } = rectangle;

  return {
    height,
    width,
    top,
    left,
    bottom: top + height,
    right: left + width,
  };
};
