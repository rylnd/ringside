import { scaleLinear, ScaleLinear } from 'd3-scale';

import { Position as IPosition, XAlignment, YAlignment } from './types';

export default class Position implements IPosition {
  readonly top: number;
  readonly left: number;

  private readonly xScale: ScaleLinear<number, number>;
  private readonly yScale: ScaleLinear<number, number>;

  constructor(
    readonly height: number = 0,
    readonly width: number = 0,
    readonly originLeft: number = 0,
    readonly originTop: number = 0,
    readonly xAlign: XAlignment = XAlignment.END,
    readonly yAlign: YAlignment = YAlignment.BOTTOM,
  ) {
    this.xScale = scaleLinear()
      .domain([0, 1])
      .range([0, width]);
    this.yScale = scaleLinear()
      .domain([0, 1])
      .range([0, height]);

    this.left = originLeft - this.xScale(xAlign);
    this.top = originTop - this.yScale(yAlign);
  }
}
