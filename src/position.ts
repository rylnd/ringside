import { scaleLinear, ScaleLinear } from 'd3-scale';

import { Grid } from '../src';
import { Position, XAlignment, YAlignment, XGrid, YGrid } from './types';

export default class implements Position {
  readonly top: number;
  readonly left: number;

  private readonly xScale: ScaleLinear<number, number>;
  private readonly yScale: ScaleLinear<number, number>;

  constructor(
    readonly height: number,
    readonly width: number,
    readonly grid: Grid,
    readonly xGrid: XGrid = XGrid.INNER_LEFT,
    readonly yGrid: YGrid = YGrid.INNER_TOP,
    readonly xAlign: XAlignment = XAlignment.END,
    readonly yAlign: YAlignment = YAlignment.BOTTOM,
  ) {
    this.xScale = scaleLinear()
      .domain([0, 1])
      .range([0, width]);
    this.yScale = scaleLinear()
      .domain([0, 1])
      .range([0, height]);

    this.top = this.calculateTop();
    this.left = this.calculateLeft();
  }

  private calculateTop(): number {
    const start = this.grid.yScale(this.yGrid);
    const offset = this.yScale(this.yAlign);

    return start - offset;
  }

  private calculateLeft(): number {
    const start = this.grid.xScale(this.xGrid);
    const offset = this.xScale(this.xAlign);

    return start - offset;
  }
}
