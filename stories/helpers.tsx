/* tslint:disable: no-implicit-dependencies */
import * as React from 'react';
import { interpolateRainbow } from 'd3-scale-chromatic';

import { Ringside } from '../src';
import { FittedPosition, Rectangle } from '../src/types';

export const PADDING = 20;

export const sizeOptions = {
  range: true,
  min: 0,
  max: 1000,
  step: 1,
};

export const enumKeys: (e: any) => string[] = e =>
  Object.keys(e).filter(key => isNaN(Number(key)));

// map each enum key to its numeric value, e.g. { START: 0, CENTER: 0.5 }
export const enumOptions: (e: any) => { [key: string]: number } = e =>
  enumKeys(e).reduce((options, key) => ({ ...options, [key]: e[key] }), {});

// gives every position of a ringside its own color along the rainbow
export const colorFor = (ringside: Ringside, position: FittedPosition) => {
  const combos = ringside.positions().map(p => JSON.stringify(p));
  const hash = combos.indexOf(JSON.stringify(position)) / combos.length;

  return interpolateRainbow(hash);
};

interface CanvasProps {
  height: number;
  width: number;
  children: React.ReactNode;
}

export const Canvas = ({ height, width, children }: CanvasProps) => (
  <svg
    height={height + PADDING}
    width={width + PADDING}
    viewBox={`0 0 ${width + PADDING} ${height + PADDING}`}
    style={{ fontFamily: 'sans-serif', fontSize: 12 }}
  >
    <g>{children}</g>
  </svg>
);

interface RectShapeProps extends React.SVGProps<SVGRectElement> {
  rect: Rectangle;
}

export const RectShape = ({ rect, ...props }: RectShapeProps) => (
  <rect
    x={rect.left}
    y={rect.top}
    height={rect.height}
    width={rect.width}
    {...props}
  />
);
