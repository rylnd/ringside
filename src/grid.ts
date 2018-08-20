import { scaleLinear, ScaleLinear } from 'd3-scale';

import { Rectangle, XBasis, YBasis } from './types';
import { fullRect } from './utils';

export default class {
  readonly xScale: ScaleLinear<number, number>;
  readonly yScale: ScaleLinear<number, number>;

  constructor(readonly inner: Rectangle, readonly outer: Rectangle) {
    const innerRect = fullRect(inner);
    const outerRect = fullRect(outer);

    this.xScale = scaleLinear()
      .domain([
        XBasis.OUTER_LEFT,
        XBasis.INNER_LEFT,
        XBasis.INNER_RIGHT,
        XBasis.OUTER_RIGHT,
      ])
      .range([
        outerRect.left,
        innerRect.left,
        innerRect.right,
        outerRect.right,
      ]);

    this.yScale = scaleLinear()
      .domain([
        YBasis.OUTER_TOP,
        YBasis.INNER_TOP,
        YBasis.INNER_BOTTOM,
        YBasis.OUTER_BOTTOM,
      ])
      .range([
        outerRect.top,
        innerRect.top,
        innerRect.bottom,
        outerRect.bottom,
      ]);
  }
}
