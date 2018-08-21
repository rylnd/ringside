import { Position, Grid } from './';
import {
  Position as IPosition,
  Rectangle,
  FullRect,
  XAlignment,
  XBasis,
  YBasis,
  YAlignment,
  FittedPosition,
} from './types';
import { enumValues, fullRect, product } from './utils';
import { fitsInside, fitsOutside } from './fitting';

export interface RingsideInterface {
  positions(): FittedPosition[];
}

class Ringside implements RingsideInterface {
  readonly innerBounds: FullRect;
  readonly outerBounds: FullRect;
  readonly grid: Grid;

  constructor(
    innerBounds: Rectangle,
    outerBounds: Rectangle,
    readonly height: number,
    readonly width: number,
  ) {
    this.grid = new Grid(innerBounds, outerBounds);
    this.innerBounds = fullRect(innerBounds);
    this.outerBounds = fullRect(outerBounds);
  }

  positions() {
    return product([
      enumValues(XBasis),
      enumValues(YBasis),
      enumValues(XAlignment),
      enumValues(YAlignment),
    ]).map(([xBasis, yBasis, xAlignment, yAlignment]) => {
      const position = new Position(
        this.height,
        this.width,
        this.grid.xScale(xBasis),
        this.grid.yScale(yBasis),
        xAlignment,
        yAlignment,
      );

      return {
        ...position,
        xBasis,
        yBasis,
        fits: this.fits(position),
      };
    });
  }

  private fits(position: IPosition): boolean {
    return (
      fitsOutside(position, this.innerBounds) &&
      fitsInside(position, this.outerBounds)
    );
  }
}

export default Ringside;
