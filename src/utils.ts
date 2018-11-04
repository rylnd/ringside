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

const flatten = arrays => [].concat(...arrays);

export type ProductFn = <T>(vectors: T[][]) => T[][];
export const product: ProductFn = vectors => {
  return vectors.reduce(
    (products, vector) =>
      flatten(products.map(p => vector.map(x => [...p, x]))),
    [[]],
  );
};

export const enumValues: (e: any) => number[] = e =>
  Object.keys(e)
    .map(key => Number(e[key]))
    .filter(num => !isNaN(num));
