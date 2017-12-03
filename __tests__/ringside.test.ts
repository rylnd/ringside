'use strict';

import { Ringside } from '../src';
import { rectToDOMRect as rect } from '../src/utils';

const positions = side =>
  (Object as any).entries(side).map(([_, position]) => position);

const midPosition = ps => ps.map(p => p.center || p.middle);

describe('Ringside', () => {
  let inner;
  let outer;
  let height;
  let width;
  let ringside: Ringside;

  beforeEach(() => {
    outer = rect(0, 0, 100, 100);
    inner = rect(30, 50, 20, 20);
    height = width = 10;

    ringside = new Ringside(inner, outer, height, width);
  });

  describe('placement', () => {
    it('top.start.bottom left is inner left', () => {
      const top = ringside.top();
      expect(top.start.bottom.x).toEqual(inner.left);
    });

    it('top.center.bottom left is inner midX', () => {
      const top = ringside.top();
      const midX = inner.x + (inner.width - width) / 2;
      expect(top.center.bottom.x).toEqual(midX);
    });

    it('top.end.bottom right is inner right', () => {
      const top = ringside.top();
      expect(top.end.bottom.x + top.end.bottom.width).toEqual(inner.right);
    });

    it('bottom.start.bottom right is inner right', () => {
      const bottom = ringside.bottom();
      expect(bottom.start.bottom.x + bottom.start.bottom.width).toEqual(
        inner.right,
      );
    });

    it('bottom.end.bottom left is inner left', () => {
      const bottom = ringside.bottom();
      expect(bottom.end.bottom.x).toEqual(inner.left);
    });

    it('left.start.bottom bottom is inner bottom', () => {
      const left = ringside.left();
      expect(left.start.bottom.y + left.start.bottom.height).toEqual(
        inner.bottom,
      );
    });

    it('left.end.bottom top is inner top', () => {
      const left = ringside.left();
      expect(left.end.bottom.y).toEqual(inner.top);
    });

    it('right.start.bottom top is inner top', () => {
      const right = ringside.right();
      expect(right.start.bottom.y).toEqual(inner.top);
    });

    it('right.center.bottom top is inner midY', () => {
      const right = ringside.right();
      const midY = inner.y + (inner.height - height) / 2;
      expect(right.center.bottom.y).toEqual(midY);
    });

    it('right.end.bottom bottom is inner bottom', () => {
      const right = ringside.right();
      expect(right.end.bottom.y + right.end.bottom.height).toEqual(
        inner.bottom,
      );
    });

    it('properly positions on the bottom', () => {
      let bottom = ringside.bottom();
      expect(bottom.end.bottom).toEqual({
        fits: true,
        height,
        width,
        x: 30,
        y: 70,
      });

      inner = rect(50, 60, 20, 20);
      ringside = new Ringside(inner, outer, height, width);
      bottom = ringside.bottom();

      expect(bottom.end.bottom).toEqual({
        fits: true,
        height,
        width,
        x: 50,
        y: 80,
      });
    });
  });

  describe('fit', () => {
    const fits = side => positions(side).map(p => p.fits);

    it('fits by default with test parameters', () => {
      expect(fits(ringside.top())).not.toContain(false);
      expect(fits(ringside.left())).not.toContain(false);
      expect(fits(ringside.right())).not.toContain(false);
      expect(fits(ringside.bottom())).not.toContain(false);
    });

    it('cannot fit a shape bigger than the outer bounds', () => {
      height = outer.height;
      width = outer.width;
      ringside = new Ringside(inner, outer, height, width);

      expect(fits(ringside.top())).not.toContain(true);
      expect(fits(ringside.left())).not.toContain(true);
      expect(fits(ringside.right())).not.toContain(true);
      expect(fits(ringside.bottom())).not.toContain(true);
    });

    it('cannot fit above if no top gutter', () => {
      inner.top = inner.y = outer.top;
      ringside = new Ringside(inner, outer, height, width);
      expect(fits(ringside.top())).not.toContain(true);
    });

    it('cannot fit right if no right gutter', () => {
      inner.right = outer.right;
      ringside = new Ringside(inner, outer, height, width);
      expect(fits(ringside.right())).not.toContain(true);
    });

    it('cannot fit bottom if no bottom gutter', () => {
      inner.bottom = outer.bottom;
      ringside = new Ringside(inner, outer, height, width);
      expect(fits(ringside.bottom())).not.toContain(true);
    });

    it('cannot fit left if no left gutter', () => {
      inner.left = inner.x = outer.left;
      ringside = new Ringside(inner, outer, height, width);
      expect(fits(ringside.left())).not.toContain(true);
    });

    it('cannot fit above if inner top overflows', () => {
      inner.top = inner.y = outer.top + 1;
      ringside = new Ringside(inner, outer, height, width);
      expect(fits(ringside.top())).not.toContain(true);
    });

    it('cannot fit right if inner right overflows', () => {
      inner.right = outer.right + 1;
      ringside = new Ringside(inner, outer, height, width);
      expect(fits(ringside.right())).not.toContain(true);
    });

    it('cannot fit bottom if no bottom gutter', () => {
      inner.bottom = outer.bottom + 1;
      ringside = new Ringside(inner, outer, height, width);
      expect(fits(ringside.bottom())).not.toContain(true);
    });

    it('cannot fit left if left overflows', () => {
      inner.left = inner.x = outer.left + 1;
      ringside = new Ringside(inner, outer, height, width);
      expect(fits(ringside.left())).not.toContain(true);
    });

    it('cannot fit above if top height less than height', () => {
      inner.top = inner.y = outer.top + height - 1;
      ringside = new Ringside(inner, outer, height, width);
      expect(fits(ringside.top())).not.toContain(true);
    });

    it('cannot fit right if right width less than width', () => {
      inner.right = outer.right - width + 1;
      ringside = new Ringside(inner, outer, height, width);
      expect(fits(ringside.right())).not.toContain(true);
    });

    it('cannot fit bottom if bottom height less than height', () => {
      inner.bottom = outer.bottom - height + 1;
      inner.y = inner.bottom - inner.height;
      ringside = new Ringside(inner, outer, height, width);
      expect(fits(ringside.bottom())).not.toContain(true);
    });

    it('cannot fit left if width less than left width', () => {
      inner.left = inner.x = outer.left + width - 1;
      ringside = new Ringside(inner, outer, height, width);

      expect(fits(ringside.left())).not.toContain(true);
    });

    it('will not fit in middle if centering causes overflow', () => {
      const maxHalfWidth =
        Math.min(ringside.leftLane.width, ringside.rightLane.width) +
        inner.width / 2;
      const maxWidth = maxHalfWidth * 2;
      ringside = new Ringside(inner, outer, height, maxWidth + 1);
      const top = ringside.top();
      expect(top.middle.center.fits).toEqual(false);
    });

    it('cannot fit left if height would overflow', () => {
      inner.top = inner.y = 20;
      height = inner.y + inner.height + 1;
      ringside = new Ringside(inner, outer, height, width);
      const left = ringside.left();
      expect(left.start.bottom.fits).toEqual(false);
    });

    it('cannot fit left middle if height would overflow', () => {
      const maxHalfHeight =
        Math.min(ringside.bottomLane.height, ringside.topLane.height) +
        inner.height / 2;
      const maxHeight = maxHalfHeight * 2 + 1;
      ringside = new Ringside(inner, outer, maxHeight, width);
      const left = ringside.left();
      expect(left.middle.center.fits).toEqual(false);
    });
  });

  describe('reflection', () => {
    it('maintains height and width when reflecting', () => {
      const sides = ['top', 'right', 'bottom', 'left'];
      const positionss = sides
        .map(s => ringside[s]())
        .map(positions)
        .map(midPosition);
      const heightss = positionss.map(ps => ps.map(p => p.height));
      const widthss = positionss.map(ps => ps.map(p => p.width));
      heightss.forEach(heights => {
        return expect(heights).toEqual([
          height,
          height,
          height,
          height,
          height,
          height,
        ]);
      });
      widthss.forEach(widths => {
        return expect(widths).toEqual([
          width,
          width,
          width,
          width,
          width,
          width,
        ]);
      });
    });

    it('reflects across a vertical line with no offset', () => {
      const rightEnd = ringside.right().bottom.end;
      const x = rightEnd.x;
      const y = rightEnd.y;
      expect(x).toEqual(50);
      expect(y).toEqual(60);
    });

    it('reflects across a horizontal line with no offset', () => {
      const bottomEnd = ringside.bottom().bottom.end;
      const x = bottomEnd.x;
      const y = bottomEnd.y;
      expect(x).toEqual(30);
      expect(y).toEqual(70);
    });

    it('opposite positions should be reflected about the center of the inner bounds', () => {
      const top = ringside.top().bottom.end;
      const bottom = ringside.bottom().bottom.start;
      const bottomY = bottom.y;
      const topY = top.y;
      delete bottom.y;
      delete top.y;

      expect(bottomY).toEqual(inner.bottom);
      expect(topY).toEqual(inner.top - height);
      expect(bottom).toEqual(top);
    });
  });
});
