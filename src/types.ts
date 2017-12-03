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
