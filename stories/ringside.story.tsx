/* tslint:disable: no-implicit-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { interpolateRainbow } from 'd3-scale-chromatic';

import { Ringside } from '../src';
import { XAlignment, YAlignment } from '../src/types';

const Stories = storiesOf('Ringside', module).addDecorator(withKnobs);

Stories.add('Ringside', () => {
  const sizeOptions = {
    range: true,
    min: 0,
    max: 500,
    step: 1,
  };

  const padding = 20;
  const boxHeight = number('Height', 40, sizeOptions);
  const boxWidth = number('Width', 50, sizeOptions);
  const outerX = number('Outer X', 0, sizeOptions);
  const outerY = number('Outer Y', 0, sizeOptions);
  const outerHeight = number('Outer Height', 500, sizeOptions);
  const outerWidth = number('Outer Width', 600, sizeOptions);
  const innerX = number('Inner X', 150, sizeOptions);
  const innerY = number('Inner Y', 200, sizeOptions);
  const innerHeight = number('Inner Height', 100, sizeOptions);
  const innerWidth = number('Inner Width', 200, sizeOptions);

  const ctx = {} as any;
  ctx.startShow = boolean('Start Alignment', true);
  ctx.centerShow = boolean('Center Alignment', true);
  ctx.endShow = boolean('End Alignment', true);

  ctx.topShow = boolean('Top Alignment', true);
  ctx.middleShow = boolean('Middle Alignment', true);
  ctx.bottomShow = boolean('Bottom Alignment', true);

  const outerBounds = {
    left: outerX,
    top: outerY,
    height: outerHeight,
    width: outerWidth,
  };
  const innerBounds = {
    left: innerX,
    top: innerY,
    height: innerHeight,
    width: innerWidth,
  };

  ctx.posit = new Ringside(innerBounds, outerBounds, boxHeight, boxWidth);

  const color = position => {
    const combos = ctx.posit.positions().map(p => JSON.stringify(p));

    const hash = combos.indexOf(JSON.stringify(position)) / combos.length;
    return interpolateRainbow(hash);
  };

  const bounds = [ctx.posit.innerBounds, ctx.posit.outerBounds].map(bound => {
    const { left, top, height, width } = bound;

    return (
      <rect
        style={{ fillOpacity: 0.7 }}
        fill="gray"
        x={left}
        y={top}
        height={height}
        width={width}
      />
    );
  });

  const rects = ctx.posit
    .positions()
    .filter(pos => {
      return (
        (ctx.startShow && pos.xAlign === XAlignment.START) ||
        (ctx.centerShow && pos.xAlign === XAlignment.CENTER) ||
        (ctx.endShow && pos.xAlign === XAlignment.END) ||
        (ctx.topShow && pos.yAlign === YAlignment.TOP) ||
        (ctx.middleShow && pos.yAlign === YAlignment.MIDDLE) ||
        (ctx.bottomShow && pos.yAlign === YAlignment.BOTTOM)
      );
    })
    .map(pos => {
      const { left, top, height, width } = pos;
      return (
        pos.fits && (
          <rect
            style={{ fillOpacity: 0.7 }}
            x={left}
            y={top}
            height={height}
            width={width}
            fill={color(pos)}
          >
            {`${JSON.stringify(pos)}`}
          </rect>
        )
      );
    });

  return (
    <svg
      height={outerHeight + padding}
      width={outerWidth + padding}
      viewBox={`0 0 ${outerWidth + padding} ${outerHeight + padding}`}
    >
      <g>
        {bounds}
        {rects}
      </g>
    </svg>
  );
});
