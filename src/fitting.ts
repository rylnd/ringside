import { Rectangle } from './types';
import { fullRect } from './utils';

export const fitsInside = (
  subject: Rectangle,
  container: Rectangle,
): boolean => {
  const subjectRect = fullRect(subject);
  const containerRect = fullRect(container);

  return (
    subjectRect.left >= containerRect.left &&
    subjectRect.top >= containerRect.top &&
    subjectRect.right <= containerRect.right &&
    subjectRect.bottom <= containerRect.bottom
  );
};

export const fitsOutside = (
  subject: Rectangle,
  container: Rectangle,
): boolean => {
  const subjectRect = fullRect(subject);
  const containerRect = fullRect(container);

  return (
    (subjectRect.left < containerRect.left &&
      subjectRect.right < containerRect.left) ||
    (subjectRect.top < containerRect.top &&
      subjectRect.bottom < containerRect.top) ||
    (subjectRect.left > containerRect.right &&
      subjectRect.right > containerRect.right) ||
    (subjectRect.top > containerRect.bottom &&
      subjectRect.bottom > containerRect.bottom)
  );
};
