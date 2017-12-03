// https://github.com/Microsoft/TypeScript/issues/11085
export interface DOMRect extends ClientRect {
  x: number;
  y: number;
}

export interface RectProps {
  height: number;
  width: number;
  x: number;
  y: number;
}

export type Orientation = 'top' | 'left' | 'bottom' | 'right';
export type HAlignment = 'start' | 'center' | 'end';
export type VAlignment = 'top' | 'middle' | 'bottom';

export interface Positioned extends Partial<RectProps> {
  fits: boolean;
}

export interface Lane extends Partial<RectProps> {
  name: Orientation;
}

export interface PositionedSide {
  start: Positioned;
  center: Positioned;
  end: Positioned;
}

export interface Ringside {
  top(): PositionedSide;
  right(): PositionedSide;
  bottom(): PositionedSide;
  left(): PositionedSide;
}
