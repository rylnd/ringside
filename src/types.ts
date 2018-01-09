// https://github.com/Microsoft/TypeScript/issues/11085
export interface Bounds extends ClientRect {
  x: number;
  y: number;
}

export interface MinBounds {
  height: number;
  width: number;
  left: number;
  top: number;
}
