/* tslint:disable: no-implicit-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import { Ringside } from '../src';
import { XAlignment, YAlignment, XBasis, YBasis } from '../src/types';
import { Canvas, colorFor, enumKeys, sizeOptions } from './helpers';

const Stories = storiesOf('Usage/Explorer', module).addDecorator(withKnobs);

Stories.add('All positions', () => {
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

  const ringside = new Ringside(innerBounds, outerBounds, boxHeight, boxWidth);

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

  const bounds = [ringside.innerBounds, ringside.outerBounds].map(bound => (
    <rect
      key={JSON.stringify(bound)}
      style={{ fillOpacity: 0.7 }}
      fill="gray"
      x={bound.left}
      y={bound.top}
      height={bound.height}
      width={bound.width}
    />
  ));

  const rects = ringside
    .positions()
    .filter(
      pos =>
        Object.keys(filters.xAlign).some(
          filterKey =>
            filters.xAlign[filterKey] && pos.xAlign === XAlignment[filterKey],
        ) &&
        Object.keys(filters.yAlign).some(
          filterKey =>
            filters.yAlign[filterKey] && pos.yAlign === YAlignment[filterKey],
        ) &&
        Object.keys(filters.xBasis).some(
          filterKey =>
            filters.xBasis[filterKey] && pos.xBasis === XBasis[filterKey],
        ) &&
        Object.keys(filters.yBasis).some(
          filterKey =>
            filters.yBasis[filterKey] && pos.yBasis === YBasis[filterKey],
        ),
    )
    .map(
      pos =>
        pos.fits && (
          <rect
            key={JSON.stringify(pos)}
            style={{ fillOpacity: 0.7 }}
            x={pos.left}
            y={pos.top}
            height={pos.height}
            width={pos.width}
            fill={colorFor(ringside, pos)}
          >
            {`${JSON.stringify(pos)}`}
          </rect>
        ),
    );

  return (
    <Canvas height={outerHeight} width={outerWidth}>
      {bounds}
      {rects}
    </Canvas>
  );
});
