/* tslint:disable: no-implicit-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { interpolateRainbow } from 'd3-scale-chromatic';

import { Ringside } from '../src';
import { XAlignment, YAlignment, XBasis, YBasis } from '../src/types';
import { enumKeys } from '../src/utils';

const Stories = storiesOf('Ringside', module).addDecorator(withKnobs);
let ringside: Ringside;

const color = position => {
  const combos = ringside.positions().map(p => JSON.stringify(p));

  const hash = combos.indexOf(JSON.stringify(position)) / combos.length;
  return interpolateRainbow(hash);
};

const bounds = r =>
  [r.innerBounds, r.outerBounds].map(bound => {
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

  ringside = new Ringside(innerBounds, outerBounds, boxHeight, boxWidth);

  const filters = { xAlign: {}, yAlign: {}, xBasis: {}, yBasis: {} } as any;
  enumKeys(XAlignment).forEach(key => {
    filters.xAlign[key] = boolean(`${key} alignment`, true);
  });
  enumKeys(YAlignment).forEach(key => {
    filters.yAlign[key] = boolean(`${key} alignment`, true);
  });

  enumKeys(XBasis).forEach(key => {
    filters.xBasis[key] = boolean(`${key} basis`, true);
  });
  enumKeys(YBasis).forEach(key => {
    filters.yBasis[key] = boolean(`${key} basis`, true);
  });

  const rects = ringside
    .positions()
    .filter(pos => {
      return (
        Object.keys(filters.xAlign).some(
          filterKey =>
            filters.xAlign[filterKey] && pos.xAlign === XAlignment[filterKey],
        ) ||
        Object.keys(filters.yAlign).some(
          filterKey =>
            filters.yAlign[filterKey] && pos.yAlign === YAlignment[filterKey],
        ) ||
        Object.keys(filters.xBasis).some(
          filterKey =>
            filters.xBasis[filterKey] && pos.xBasis === XBasis[filterKey],
        ) ||
        Object.keys(filters.yBasis).some(
          filterKey =>
            filters.yBasis[filterKey] && pos.yBasis === YBasis[filterKey],
        )
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
        {bounds(ringside)}
        {rects}
      </g>
    </svg>
  );
});
