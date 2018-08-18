import { Position, XAlignment, YAlignment, XGrid, YGrid } from './types';

export default class implements Position {
  readonly top: number;
  readonly left: number;

  constructor(
    readonly height: number = 0,
    readonly width: number = 0,
    readonly xAlign: XAlignment = XAlignment.END,
    readonly yAlign: YAlignment = YAlignment.BOTTOM,
    readonly xGrid: XGrid = XGrid.INNER_LEFT,
    readonly yGrid: YGrid = YGrid.INNER_TOP,
  ) {
    this.top = 1;
    this.left = 2;
  }
}
