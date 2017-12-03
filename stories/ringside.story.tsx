/* tslint:disable: no-implicit-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { interpolateRainbow } from 'd3-scale';

import { Ringside } from '../src';
import { rectToDOMRect as rect } from '../src/utils';

const Stories = storiesOf('Ringside', module).addDecorator(withKnobs);

Stories.add('Ringside', () => {
  const sizeOptions = {
    range: true,
    min: 0,
    max: 500,
    step: 1,
  };

  const padding = 20;
  const boxHeight = number('Height', 10, sizeOptions);
  const boxWidth = number('Width', 10, sizeOptions);
  const outerX = number('Outer X', 0, sizeOptions);
  const outerY = number('Outer Y', 0, sizeOptions);
  const outerHeight = number('Outer Height', 100, sizeOptions);
  const outerWidth = number('Outer Width', 100, sizeOptions);
  const innerX = number('Inner X', 30, sizeOptions);
  const innerY = number('Inner Y', 50, sizeOptions);
  const innerHeight = number('Inner Height', 20, sizeOptions);
  const innerWidth = number('Inner Width', 20, sizeOptions);

  const ctx = {} as any;
  ctx.topShow = boolean('Top Lane', true);
  ctx.rightShow = boolean('Right Lane', true);
  ctx.bottomShow = boolean('Bottom Lane', true);
  ctx.leftShow = boolean('Left Lane', true);

  ctx.startShow = boolean('Start Alignment', true);
  ctx.centerShow = boolean('Center Alignment', true);
  ctx.endShow = boolean('End Alignment', true);

  ctx.topvShow = boolean('Top Alignment', true);
  ctx.middlevShow = boolean('Middle Alignment', true);
  ctx.bottomvShow = boolean('Bottom Alignment', true);

  const outerBounds = rect(outerX, outerY, outerHeight, outerWidth);
  const innerBounds = rect(innerX, innerY, innerHeight, innerWidth);

  ctx.posit = new Ringside(innerBounds, outerBounds, boxHeight, boxWidth);

  const color = (h, v) => {
    const combos = ctx.posit.hAlignments.reduce(
      (cs, _h) => [...cs, ...ctx.posit.vAlignments.map(_v => _h + _v)],
      [],
    );
    const hash = combos.indexOf(h + v) / combos.length;
    return interpolateRainbow(hash);
  };

  const lanes = ctx.posit.lanes().map(lane => (
    <rect style={{ fillOpacity: 0.7 }} {...lane} fill="gray">
      {lane.name}
    </rect>
  ));

  const rects = ctx.posit.orientations.map(o => {
    return ctx.posit.hAlignments.map(h => {
      return ctx.posit.vAlignments.map(v => {
        if (ctx[o + 'Show'] && ctx[h + 'Show'] && ctx[v + 'vShow']) {
          const position = ctx.posit[o]()[h][v];
          return (
            position.fits && (
              <rect
                style={{ fillOpacity: 0.7 }}
                {...position}
                fill={color(h, v)}
              >
                {`${o} ${h} ${v}`}
              </rect>
            )
          );
        }
      });
    });
  });

  // const bounds = ctx.posit.bounds.map(([h, v, bound]) => {
  //   if (ctx[h + 'Show'] && ctx[v + 'vShow']) {
  //     return (
  //       <rect {...bound} fill="yellow">
  //         {`bound ${bound.name} ${h} ${v}`}
  //       </rect>
  //     );
  //   }
  // });

  return (
    <svg
      height={outerHeight + padding}
      width={outerWidth + padding}
      viewBox={`0 0 ${outerWidth + padding} ${outerHeight + padding}`}
    >
      <g>
        {lanes}
        {/* {bounds} */}
        {rects}
      </g>
    </svg>
  );
});
