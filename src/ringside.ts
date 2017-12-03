import { DOMRect, RectProps } from './types';

export type Orientation = 'top' | 'left' | 'bottom' | 'right';
export type HAlignment = 'start' | 'center' | 'end';
export type VAlignment = 'top' | 'middle' | 'bottom';

export interface Positioned extends Partial<RectProps> {
  fits: boolean;
}

export interface Lane extends Partial<RectProps> {
  name: Orientation;
}

export interface HPositionedSide {
  start: Positioned;
  center: Positioned;
  end: Positioned;
}

export interface VPositionedSide {
  top: Positioned;
  middle: Positioned;
  bottom: Positioned;
}

export interface PositionedSide {
  top: HPositionedSide;
  middle: HPositionedSide;
  bottom: HPositionedSide;
  start: VPositionedSide;
  center: VPositionedSide;
  end: VPositionedSide;
}

interface Ringside {
  top(): PositionedSide;
  right(): PositionedSide;
  bottom(): PositionedSide;
  left(): PositionedSide;
}

class Ringside implements Ringside {
  public readonly topLane: Lane;
  public readonly rightLane: Lane;
  public readonly bottomLane: Lane;
  public readonly leftLane: Lane;

  public orientations: Orientation[] = ['top', 'right', 'bottom', 'left'];
  public hAlignments: HAlignment[] = ['start', 'center', 'end'];
  public vAlignments: VAlignment[] = ['top', 'middle', 'bottom'];

  constructor(
    readonly innerBounds: DOMRect,
    readonly outerBounds: DOMRect,
    readonly height: number,
    readonly width: number,
  ) {
    this.topLane = {
      name: 'top',
      x: this.outerBounds.x,
      y: this.outerBounds.y,
      width: this.outerBounds.width,
      height: this.innerBounds.y - this.outerBounds.y,
    };

    this.leftLane = {
      name: 'left',
      x: this.outerBounds.x,
      y: this.outerBounds.y,
      height: this.outerBounds.height,
      width: this.innerBounds.x - this.outerBounds.x,
    };

    this.rightLane = {
      name: 'right',
      x: this.innerBounds.right,
      y: this.outerBounds.y,
      height: this.outerBounds.height,
      width: this.outerBounds.right - this.innerBounds.right,
    };

    this.bottomLane = {
      name: 'bottom',
      x: this.outerBounds.x,
      y: this.innerBounds.bottom,
      height: this.outerBounds.bottom - this.innerBounds.bottom,
      width: this.outerBounds.width,
    };
  }

  public top() {
    return this.positions('top');
  }

  public bottom() {
    return this.positions('bottom');
  }

  public right() {
    return this.positions('right');
  }

  public left() {
    return this.positions('left');
  }

  private lanes(): Lane[] {
    return [this.topLane, this.rightLane, this.bottomLane, this.leftLane];
  }

  private positions(orientation: Orientation): PositionedSide {
    return this.hAlignments.reduce((positions, h) => {
      return this.vAlignments.reduce((innerPos, v) => {
        const alignment = this.alignedPosition(orientation, h, v);
        return {
          ...innerPos,
          [h]: {
            ...innerPos[h],
            [v]: alignment,
          },
          [v]: {
            ...innerPos[v],
            [h]: alignment,
          },
        };
      }, positions);
    }, {}) as PositionedSide;
  }

  private alignedPosition(
    orientation: Orientation,
    hAlignment: HAlignment,
    vAlignment: VAlignment,
  ): Positioned {
    const bounds = this.boundingBox(orientation, hAlignment);
    const fits = this.fitsBounds(bounds);
    const aligned = this.alignInBounds(
      bounds,
      orientation,
      hAlignment,
      vAlignment,
    );

    return {
      ...aligned,
      fits,
    };
  }

  private boundingBox(
    orientation: Orientation,
    alignment: HAlignment,
  ): RectProps {
    const thisLane = this.relativeLane(orientation, 'center');
    const { width, x } = this.relativeProps(orientation);
    const bounds = { ...thisLane };

    bounds[width] = this.boundingWidth(orientation, alignment);
    bounds[x] = this.boundingX(orientation, alignment, bounds[width]);

    return bounds;
  }

  private boundingWidth(orientation: Orientation, alignment: HAlignment) {
    const { width } = this.relativeProps(orientation);
    const endLane = this.relativeLane(orientation, alignment);
    const boundingWidth = this.innerBounds[width] + endLane[width];

    if (alignment === 'center') {
      const extraWidth = boundingWidth - this[width];
      return boundingWidth - extraWidth;
    }

    return boundingWidth;
  }

  private boundingX(
    orientation: Orientation,
    alignment: HAlignment,
    boundingWidth: number,
  ) {
    const { width, x, xScale } = this.relativeProps(orientation);

    if (
      (alignment === 'start' && xScale(1) < 0) ||
      (alignment === 'end' && xScale(1) > 0)
    ) {
      return this.innerBounds[x] + this.innerBounds[width] - boundingWidth;
    } else if (alignment === 'center') {
      return this.innerBounds[x] + (this.innerBounds[width] - this[width]) / 2;
    } else {
      return this.innerBounds[x];
    }
  }

  private fitsBounds(bounds: RectProps): boolean {
    return (
      this.height <= bounds.height &&
      this.width <= bounds.width &&
      this.outerBounds.left <= bounds.x &&
      this.outerBounds.top <= bounds.y &&
      this.outerBounds.right >= bounds.x + bounds.width &&
      this.outerBounds.bottom >= bounds.y + bounds.height
    );
  }

  private alignInBounds(
    bounds: RectProps,
    orientation: Orientation,
    hAlignment: HAlignment,
    vAlignment: VAlignment,
  ): RectProps {
    const { x, y } = this.relativeProps(orientation);

    return {
      height: this.height,
      width: this.width,
      [x]: this.alignHorizontal(bounds, orientation, hAlignment),
      [y]: this.alignVertical(bounds, orientation, vAlignment),
    } as any;
  }

  private alignHorizontal(
    bounds: RectProps,
    orientation: Orientation,
    alignment: HAlignment,
  ): number {
    const { width, x, xScale } = this.relativeProps(orientation);
    if (
      (alignment === 'start' && xScale(1) < 0) ||
      (alignment === 'end' && xScale(1) > 0)
    ) {
      return bounds[x] + bounds[width] - this[width];
    } else if (alignment === 'center') {
      return bounds[x] + (bounds[width] - this[width]) / 2;
    }
    return bounds[x];
  }

  private alignVertical(
    bounds: RectProps,
    orientation: Orientation,
    alignment: VAlignment,
  ): number {
    const { height, y, yScale } = this.relativeProps(orientation);
    if (
      (alignment === 'bottom' && yScale(1) < 0) ||
      (alignment === 'top' && yScale(1) > 0)
    ) {
      return bounds[y] + bounds[height] - this[height];
    } else if (alignment === 'middle') {
      return bounds[y] + (bounds[height] - this[height]) / 2;
    }
    return bounds[y];
  }

  private relativeProp(props, orientation, offset = 0) {
    const lanes = this.lanes();
    const orientationIndex = lanes.map(l => l.name).indexOf(orientation);
    const propsIndex =
      (orientationIndex + props.length + offset) % props.length;

    return props[propsIndex];
  }

  private relativeProps(orientation) {
    const ident = x => x;
    const invert = x => -x;

    return {
      height: this.relativeProp(['height', 'width'], orientation),
      width: this.relativeProp(['width', 'height'], orientation),
      x: this.relativeProp(['x', 'y'], orientation),
      y: this.relativeProp(['y', 'x'], orientation),
      xScale: this.relativeProp([ident, ident, invert, invert], orientation),
      yScale: this.relativeProp([invert, ident, ident, invert], orientation),
    };
  }

  private relativeLane(orientation: Orientation, alignment: HAlignment) {
    const alignmentOffset = { start: 1, center: 0, end: -1 }[alignment];
    return this.relativeProp(this.lanes(), orientation, alignmentOffset);
  }
}

export default Ringside;
