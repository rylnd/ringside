import { scaleLinear, ScaleLinear } from 'd3-scale';
import { Rectangle, XGrid, YGrid } from './types';
import { fullRect } from './utils';

export default class {
  readonly xScale: ScaleLinear<number, number>;
  readonly yScale: ScaleLinear<number, number>;

  constructor(readonly inner: Rectangle, readonly outer: Rectangle) {
    const innerRect = fullRect(inner);
    const outerRect = fullRect(outer);

    this.xScale = scaleLinear()
      .domain([
        XGrid.OUTER_LEFT,
        XGrid.INNER_LEFT,
        XGrid.INNER_RIGHT,
        XGrid.OUTER_RIGHT,
      ])
      .range([
        outerRect.left,
        innerRect.left,
        innerRect.right,
        outerRect.right,
      ]);

    this.yScale = scaleLinear()
      .domain([
        YGrid.OUTER_TOP,
        YGrid.INNER_TOP,
        YGrid.INNER_BOTTOM,
        YGrid.OUTER_BOTTOM,
      ])
      .range([
        outerRect.top,
        innerRect.top,
        innerRect.bottom,
        outerRect.bottom,
      ]);
  }
}
