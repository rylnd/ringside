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
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

export enum YAlignment {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
}

export enum XGrid {
  OUTER_LEFT = 0,
  INNER_LEFT = 1,
  INNER_RIGHT = 2,
  OUTER_RIGHT = 3,
}

export enum YGrid {
  OUTER_TOP = 0,
  INNER_TOP = 1,
  INNER_BOTTOM = 2,
  OUTER_BOTTOM = 3,
}

export interface Position extends Rectangle {
  xAlign: XAlignment;
  yAlign: YAlignment;
  xGrid: XGrid;
  yGrid: YGrid;
}

export interface FittedPosition extends Position {
  fits: boolean;
}
