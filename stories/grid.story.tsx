/* tslint:disable: no-implicit-dependencies */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { Grid } from '../src';
import { XBasis, YBasis } from '../src/types';
import {
  Canvas,
  enumKeys,
  enumOptions,
  RectShape,
  sizeOptions,
  Description,
} from './helpers';

const Stories = storiesOf('API/Grid', module).addDecorator(withKnobs);

const description =
  'A Grid turns the inner and outer bounds into four lines per axis, called bases. Every origin a position can hang from is one of their crossings (the dots).';

Stories.add('Bases', () => {
  const outer = {
    left: 0,
    top: 0,
    height: number('Outer Height', 400, sizeOptions),
    width: number('Outer Width', 600, sizeOptions),
  };
  const inner = {
    left: number('Inner X', 200, sizeOptions),
    top: number('Inner Y', 130, sizeOptions),
    height: number('Inner Height', 140, sizeOptions),
    width: number('Inner Width', 200, sizeOptions),
  };

  const grid = new Grid(inner, outer);
  const xBases = enumOptions(XBasis);
  const yBases = enumOptions(YBasis);

  return (
    <React.Fragment>
      <Description>{description}</Description>
      <Canvas height={outer.height} width={outer.width}>
        <RectShape rect={outer} fill="gray" fillOpacity={0.3} />
        <RectShape rect={inner} fill="gray" fillOpacity={0.7} />
        {enumKeys(XBasis).map(key => (
          <g key={key}>
            <line
              x1={grid.xScale(xBases[key])}
              x2={grid.xScale(xBases[key])}
              y1={0}
              y2={outer.height}
              stroke="steelblue"
            />
            <text
              x={
                grid.xScale(xBases[key]) +
                (xBases[key] === XBasis.OUTER_RIGHT ? -4 : 4)
              }
              y={34}
              textAnchor={xBases[key] === XBasis.OUTER_RIGHT ? 'end' : 'start'}
              fill="steelblue"
            >
              {key}
            </text>
          </g>
        ))}
        {enumKeys(YBasis).map(key => (
          <g key={key}>
            <line
              y1={grid.yScale(yBases[key])}
              y2={grid.yScale(yBases[key])}
              x1={0}
              x2={outer.width}
              stroke="tomato"
            />
            <text
              x={outer.width - 4}
              y={
                grid.yScale(yBases[key]) +
                (yBases[key] === YBasis.OUTER_TOP ? 14 : -4)
              }
              textAnchor="end"
              fill="tomato"
            >
              {key}
            </text>
          </g>
        ))}
        {enumKeys(XBasis).map(xKey =>
          enumKeys(YBasis).map(yKey => (
            <circle
              key={`${xKey}-${yKey}`}
              r={4}
              cx={grid.xScale(xBases[xKey])}
              cy={grid.yScale(yBases[yKey])}
              fill="black"
            />
          )),
        )}
      </Canvas>
    </React.Fragment>
  );
});
