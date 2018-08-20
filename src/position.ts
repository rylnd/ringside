import { scaleLinear, ScaleLinear } from 'd3-scale';

import { Grid } from '../src';
import { Position, XAlignment, YAlignment, XBasis, YBasis } from './types';

export default class implements Position {
  readonly top: number;
  readonly left: number;

  private readonly xScale: ScaleLinear<number, number>;
  private readonly yScale: ScaleLinear<number, number>;

  constructor(
    readonly height: number,
    readonly width: number,
    readonly grid: Grid,
    readonly xBasis: XBasis = XBasis.INNER_LEFT,
    readonly yBasis: YBasis = YBasis.INNER_TOP,
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
    const start = this.grid.yScale(this.yBasis);
    const offset = this.yScale(this.yAlign);

    return start - offset;
  }

  private calculateLeft(): number {
    const start = this.grid.xScale(this.xBasis);
    const offset = this.xScale(this.xAlign);

    return start - offset;
  }
}
