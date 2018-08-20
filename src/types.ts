export interface Rectangle {
  height: number;
  width: number;
  left: number;
  top: number;
}

export interface FullRect extends Rectangle {
  bottom: number;
  right: number;
}

export enum XAlignment {
  START = 0,
  CENTER = 0.5,
  END = 1,
}

export enum YAlignment {
  TOP = 0,
  MIDDLE = 0.5,
  BOTTOM = 1,
}

export enum XBasis {
  OUTER_LEFT = 0,
  INNER_LEFT = 1,
  INNER_RIGHT = 2,
  OUTER_RIGHT = 3,
}

export enum YBasis {
  OUTER_TOP = 0,
  INNER_TOP = 1,
  INNER_BOTTOM = 2,
  OUTER_BOTTOM = 3,
}

export interface Position extends Rectangle {
  xAlign: XAlignment;
  yAlign: YAlignment;
  xBasis: XBasis;
  yBasis: YBasis;
}

export interface FittedPosition extends Position {
  fits: boolean;
}
