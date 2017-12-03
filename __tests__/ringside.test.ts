'use strict';

import { Ringside } from '../src';

describe('Example', () => {
  it('Should be able to create new instance', () => {
    expect(typeof new Ringside()).toBe('object');
  });
});
