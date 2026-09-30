/* tslint:disable: no-implicit-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { fitsInside, fitsOutside } from '../src';
import { Canvas, RectShape, sizeOptions } from './helpers';

const Stories = storiesOf('API/Fitting', module).addDecorator(withKnobs);

const WIDTH = 600;
const HEIGHT = 400;

// fitsInside and fitsOutside are the checks Ringside uses to decide whether
// a position fits, and can be used on their own with any two rectangles.
Stories.add('Inside and outside', () => {
  const container = {
    left: number('Container X', 150, sizeOptions),
    top: number('Container Y', 100, sizeOptions),
    height: number('Container Height', 200, sizeOptions),
    width: number('Container Width', 300, sizeOptions),
  };
  const subject = {
    left: number('Subject X', 100, sizeOptions),
    top: number('Subject Y', 50, sizeOptions),
    height: number('Subject Height', 80, sizeOptions),
    width: number('Subject Width', 120, sizeOptions),
  };

  const inside = fitsInside(subject, container);
  const outside = fitsOutside(subject, container);

  return (
    <Canvas height={HEIGHT} width={WIDTH}>
      <RectShape rect={container} fill="gray" fillOpacity={0.5} />
      <RectShape
        rect={subject}
        fill={inside ? 'seagreen' : outside ? 'steelblue' : 'tomato'}
        fillOpacity={0.7}
      />
      <text x={4} y={HEIGHT - 6}>
        {`fitsInside: ${inside}, fitsOutside: ${outside}`}
      </text>
    </Canvas>
  );
});
