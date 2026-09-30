/* tslint:disable: no-implicit-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select } from '@storybook/addon-knobs';

import { Position } from '../src';
import { XAlignment, YAlignment } from '../src/types';
import {
  Canvas,
  enumOptions,
  RectShape,
  sizeOptions,
  Description,
} from './helpers';

const Stories = storiesOf('API/Position', module).addDecorator(withKnobs);

const WIDTH = 500;
const HEIGHT = 300;

const description =
  'A Position hangs a rectangle from an origin (the red cross). The alignments pick which point of the rectangle sits on that origin, so END and BOTTOM put its bottom-right corner there.';

Stories.add('Alignment', () => {
  const originLeft = number('Origin X', 250, sizeOptions);
  const originTop = number('Origin Y', 150, sizeOptions);
  const height = number('Height', 80, sizeOptions);
  const width = number('Width', 140, sizeOptions);
  const xAlign = select('X alignment', enumOptions(XAlignment), XAlignment.END);
  const yAlign = select(
    'Y alignment',
    enumOptions(YAlignment),
    YAlignment.BOTTOM,
  );

  const position = new Position(
    height,
    width,
    originLeft,
    originTop,
    xAlign,
    yAlign,
  );

  return (
    <React.Fragment>
      <Description>{description}</Description>
      <Canvas height={HEIGHT} width={WIDTH}>
        <RectShape
          rect={{ top: 0, left: 0, height: HEIGHT, width: WIDTH }}
          fill="none"
          stroke="gray"
          strokeDasharray="6 4"
        />
        <RectShape
          rect={position}
          fill="steelblue"
          fillOpacity={0.7}
          stroke="steelblue"
        />
        <line
          x1={originLeft - 10}
          x2={originLeft + 10}
          y1={originTop}
          y2={originTop}
          stroke="tomato"
          strokeWidth={2}
        />
        <line
          x1={originLeft}
          x2={originLeft}
          y1={originTop - 10}
          y2={originTop + 10}
          stroke="tomato"
          strokeWidth={2}
        />
        <text x={4} y={HEIGHT - 6}>
          {`left: ${position.left}, top: ${position.top}`}
        </text>
      </Canvas>
    </React.Fragment>
  );
});
