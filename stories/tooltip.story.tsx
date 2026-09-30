/* tslint:disable: no-implicit-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { Ringside } from '../src';
import { Canvas, RectShape, sizeOptions, Description } from './helpers';

const Stories = storiesOf('Usage/Tooltip', module).addDecorator(withKnobs);

const description =
  'The usage example from the README. The gray box is the target and the dashed box is its container. Every position where the tooltip fits is outlined, and one of them (blue) is chosen. Step through them with the Chosen position knob.';

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
    <React.Fragment>
      <Description>{description}</Description>
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
    </React.Fragment>
  );
});
