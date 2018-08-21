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

export type ProductFn = <T>(vectors: T[][]) => T[][];
export const product: ProductFn = vectors => {
  return vectors.reduce(
    (products, vector) => {
      return [].concat(
        ...products.map(p => {
          return vector.map(x => {
            return p.concat([x]);
          });
        }),
      );
    },
    [[]],
  );
};

export const enumValues: (e: any) => number[] = e =>
  Object.keys(e)
    .map(key => Number(e[key]))
    .filter(num => !isNaN(num));

export const enumKeys: (e: any) => string[] = e =>
  Object.keys(e).filter(key => isNaN(Number(key)));
