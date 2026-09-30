/* tslint:disable: no-implicit-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { Ringside } from '../src';
import { Canvas, RectShape, sizeOptions } from './helpers';

const Stories = storiesOf('Usage/Tooltip', module).addDecorator(withKnobs);

// Mirrors the README: the target is the inner bounds, its container is the
// outer bounds, and the tooltip is placed in one of the positions that fit.
Stories.add('Tooltip placement', () => {
  const container = { top: 0, left: 0, height: 400, width: 600 };
  const target = {
    left: number('Target X', 260, sizeOptions),
    top: number('Target Y', 170, sizeOptions),
    height: number('Target Height', 60, sizeOptions),
    width: number('Target Width', 80, sizeOptions),
  };
  const tooltip = {
    height: number('Tooltip Height', 100, sizeOptions),
    width: number('Tooltip Width', 200, sizeOptions),
  };
  const choice = number('Chosen position', 0, { min: 0, max: 100, step: 1 });

  const ringside = new Ringside(
    target,
    container,
    tooltip.height,
    tooltip.width,
  );
  const possiblePositions = ringside.positions().filter(p => p.fits);
  const position = possiblePositions[choice % possiblePositions.length];

  return (
    <Canvas height={container.height + 30} width={container.width}>
      <RectShape
        rect={container}
        fill="none"
        stroke="gray"
        strokeDasharray="6 4"
      />
      {possiblePositions.map(p => (
        <RectShape
          key={JSON.stringify(p)}
          rect={p}
          fill="none"
          stroke="steelblue"
          strokeOpacity={0.25}
        />
      ))}
      <RectShape rect={target} fill="gray" fillOpacity={0.7} />
      {position && (
        <RectShape
          rect={position}
          fill="steelblue"
          fillOpacity={0.8}
          stroke="steelblue"
        />
      )}
      <text x={0} y={container.height + 20}>
        {position
          ? `${possiblePositions.length} of ${
              ringside.positions().length
            } positions fit`
          : 'No position fits: shrink the tooltip or move the target'}
      </text>
    </Canvas>
  );
});
