import { Position, XAlignment, YAlignment, XGrid, YGrid } from './types';
import Grid from './grid';

export default class implements Position {
  readonly top: number;
  readonly left: number;

  constructor(
    readonly height: number,
    readonly width: number,
    readonly grid: Grid,
    readonly xGrid: XGrid = XGrid.INNER_LEFT,
    readonly yGrid: YGrid = YGrid.INNER_TOP,
    readonly xAlign: XAlignment = XAlignment.END,
    readonly yAlign: YAlignment = YAlignment.BOTTOM,
  ) {
    this.top = this.calculateTop();
    this.left = this.calculateLeft();
  }

  private calculateTop(): number {
    const startingTop = this.grid.yScale(this.yGrid);

    if (this.yAlign === YAlignment.TOP) {
      return startingTop;
    } else if (this.yAlign === YAlignment.BOTTOM) {
      return startingTop - this.height;
    } else {
      return startingTop - this.height / 2;
    }
  }

  private calculateLeft(): number {
    const startingLeft = this.grid.xScale(this.xGrid);

    if (this.xAlign === XAlignment.START) {
      return startingLeft;
    } else if (this.xAlign === XAlignment.END) {
      return startingLeft - this.width;
    } else {
      return startingLeft - this.width / 2;
    }
  }
}
