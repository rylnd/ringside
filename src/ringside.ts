import { Bounds, MinBounds } from './types';
import { fullBounds } from './utils';
import { fitsBounds } from './fitting';

export type Orientation = 'top' | 'left' | 'bottom' | 'right';
export type HAlignment = 'start' | 'center' | 'end';
export type VAlignment = 'top' | 'middle' | 'bottom';

export interface Positioned extends Bounds {
  fits: boolean;
}

export interface Lane extends MinBounds {
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

export interface RingsideInterface {
  top(): PositionedSide;
  right(): PositionedSide;
  bottom(): PositionedSide;
  left(): PositionedSide;
}

class Ringside implements RingsideInterface {
  public readonly topLane: Lane;
  public readonly rightLane: Lane;
  public readonly bottomLane: Lane;
  public readonly leftLane: Lane;
  public readonly innerBounds: Bounds;
  public readonly outerBounds: Bounds;

  public orientations: Orientation[] = ['top', 'right', 'bottom', 'left'];
  public hAlignments: HAlignment[] = ['start', 'center', 'end'];
  public vAlignments: VAlignment[] = ['top', 'middle', 'bottom'];

  constructor(
    innerBounds: ClientRect,
    outerBounds: ClientRect,
    readonly height: number,
    readonly width: number,
  ) {
    this.innerBounds = fullBounds(innerBounds);
    this.outerBounds = fullBounds(outerBounds);
    this.topLane = {
      name: 'top',
      left: this.outerBounds.left,
      top: this.outerBounds.top,
      width: this.outerBounds.width,
      height: this.innerBounds.top - this.outerBounds.top,
    };
    this.leftLane = {
      name: 'left',
      left: this.outerBounds.left,
      top: this.outerBounds.top,
      height: this.outerBounds.height,
      width: this.innerBounds.x - this.outerBounds.x,
    };
    this.rightLane = {
      name: 'right',
      left: this.innerBounds.right,
      top: this.outerBounds.top,
      height: this.outerBounds.height,
      width: this.outerBounds.right - this.innerBounds.right,
    };
    this.bottomLane = {
      name: 'bottom',
      left: this.outerBounds.left,
      top: this.innerBounds.bottom,
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
    const boundsFit = fitsBounds(bounds, this.outerBounds);
    const fits =
      boundsFit && this.height <= bounds.height && this.width <= bounds.width;

    const aligned = this.alignInBounds(
      bounds,
      orientation,
      hAlignment,
      vAlignment,
    );

    return {
      ...fullBounds(aligned),
      fits,
    };
  }

  private boundingBox(
    orientation: Orientation,
    alignment: HAlignment,
  ): MinBounds {
    const thisLane = this.relativeLane(orientation, 'center');
    const { width, left } = this.relativeProps(orientation);
    const { name, ...bounds } = thisLane;

    bounds[width] = this.boundingWidth(orientation, alignment);
    bounds[left] = this.boundingX(orientation, alignment, bounds[width]);

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
    const { width, left, xScale } = this.relativeProps(orientation);

    if (
      (alignment === 'start' && xScale(1) < 0) ||
      (alignment === 'end' && xScale(1) > 0)
    ) {
      return this.innerBounds[left] + this.innerBounds[width] - boundingWidth;
    } else if (alignment === 'center') {
      return (
        this.innerBounds[left] + (this.innerBounds[width] - this[width]) / 2
      );
    } else {
      return this.innerBounds[left];
    }
  }

  private alignInBounds(
    bounds: MinBounds,
    orientation: Orientation,
    hAlignment: HAlignment,
    vAlignment: VAlignment,
  ): MinBounds {
    const { left, top } = this.relativeProps(orientation);

    return {
      height: this.height,
      width: this.width,
      [left]: this.alignHorizontal(bounds, orientation, hAlignment),
      [top]: this.alignVertical(bounds, orientation, vAlignment),
    } as any;
  }

  private alignHorizontal(
    bounds: MinBounds,
    orientation: Orientation,
    alignment: HAlignment,
  ): number {
    const { width, left, xScale } = this.relativeProps(orientation);
    if (
      (alignment === 'start' && xScale(1) < 0) ||
      (alignment === 'end' && xScale(1) > 0)
    ) {
      return bounds[left] + bounds[width] - this[width];
    } else if (alignment === 'center') {
      return bounds[left] + (bounds[width] - this[width]) / 2;
    }
    return bounds[left];
  }

  private alignVertical(
    bounds: MinBounds,
    orientation: Orientation,
    alignment: VAlignment,
  ): number {
    const { height, top, yScale } = this.relativeProps(orientation);
    if (
      (alignment === 'bottom' && yScale(1) < 0) ||
      (alignment === 'top' && yScale(1) > 0)
    ) {
      return bounds[top] + bounds[height] - this[height];
    } else if (alignment === 'middle') {
      return bounds[top] + (bounds[height] - this[height]) / 2;
    }
    return bounds[top];
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
      left: this.relativeProp(['left', 'top'], orientation),
      top: this.relativeProp(['top', 'left'], orientation),
      xScale: this.relativeProp([ident, ident, invert, invert], orientation),
      yScale: this.relativeProp([invert, ident, ident, invert], orientation),
    };
  }

  private relativeLane(orientation: Orientation, alignment: HAlignment): Lane {
    const alignmentOffset = { start: 1, center: 0, end: -1 }[alignment];
    return this.relativeProp(this.lanes(), orientation, alignmentOffset);
  }
}

export default Ringside;
