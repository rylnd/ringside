# ringside [![CircleCI](https://circleci.com/gh/rylnd/ringside.svg?style=svg)](https://circleci.com/gh/rylnd/ringside)

A library that determines the fit and positioning of a rectangle relative to inner and outer bounds.

## Installation

```bash
npm install ringside
```

## Usage

Here's how you might generate the positioning for a tooltip:

```jsx
import Ringside from 'ringside';

// define our target tooltip size
const tooltipSize = {
  height: 100,
  width: 200
};

// grab our target element and its container
const container = document.querySelector('.container');
const target = container.querySelector('.target');

const ringside = new Ringside(
  target.getBoundingClientRect(),     // target bounds
  container.getBoundingClientRect(),  // container bounds
  tooltipSize.height,
  tooltipSize.width
);

// select all positions that will fit
const possiblePositions = ringside
  .positions()
  .filter(position => position.fits);

// select a position from those that fit
const [position] = possiblePositions;

// and use it!
const tooltipPosition = {
  top: position.top,
  left: position.left,
  height: tooltipSize.height,
  width: tooltipSize.width
};
```

For more examples, check the [examples repo](https://github.com/rylnd/ringside-examples).

## Development

```bash
# install packages
npm install

# run the storybook server
npm run storybook

# run tests
npm test
```
