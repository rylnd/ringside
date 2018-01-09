import { MinBounds } from './types';
import { fullBounds } from './utils';

export const fitsBounds = (
  target: MinBounds,
  container: MinBounds,
): boolean => {
  const targetBounds = fullBounds(target);
  const containerBounds = fullBounds(container);

  return (
    targetBounds.left >= containerBounds.left &&
    targetBounds.top >= containerBounds.top &&
    targetBounds.right <= containerBounds.right &&
    targetBounds.bottom <= containerBounds.bottom
  );
};
