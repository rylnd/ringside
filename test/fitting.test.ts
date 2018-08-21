import { fitsInside, fitsOutside } from '../src';

describe('fitting', () => {
  let subject;
  let container;

  describe('fitsInside', () => {
    beforeEach(() => {
      container = { height: 100, width: 100, top: 0, left: 0 };
    });

    it('is true if subject and container are identical', () => {
      expect(fitsInside(container, container)).toBeTruthy();
    });

    it('is false if top would overflow', () => {
      subject = { ...container, top: -1 };

      expect(fitsInside(subject, container)).toBeFalsy();
    });

    it('is false if left would overflow', () => {
      subject = { ...container, left: -1 };

      expect(fitsInside(subject, container)).toBeFalsy();
    });

    it('is false if right would overflow', () => {
      subject = { ...container, width: 101 };

      expect(fitsInside(subject, container)).toBeFalsy();
    });

    it('is false if bottom would overflow', () => {
      subject = { ...container, height: 101 };

      expect(fitsInside(subject, container)).toBeFalsy();
    });
  });

  describe('fitsOutside', () => {
    beforeEach(() => {
      container = { height: 100, width: 100, top: 0, left: 0 };
    });

    it('is false if subject and container are identical', () => {
      expect(fitsOutside(container, container)).toBeFalsy();
    });

    it('is true if top touches container', () => {
      subject = { ...container, top: 100 };

      expect(fitsOutside(subject, container)).toBeTruthy();
    });

    it('is true if left touches container', () => {
      subject = { ...container, left: 100 };

      expect(fitsOutside(subject, container)).toBeTruthy();
    });

    it('is true if right touches container', () => {
      subject = { ...container, left: -100 };

      expect(fitsOutside(subject, container)).toBeTruthy();
    });

    it('is true if bottom touches container', () => {
      subject = { ...container, top: -100 };

      expect(fitsOutside(subject, container)).toBeTruthy();
    });

    it('is false if top overlaps container', () => {
      subject = { ...container, top: 99 };

      expect(fitsOutside(subject, container)).toBeFalsy();
    });

    it('is false if left overlaps container', () => {
      subject = { ...container, left: 99 };

      expect(fitsOutside(subject, container)).toBeFalsy();
    });

    it('is false if right overlaps container', () => {
      subject = { ...container, left: -99 };

      expect(fitsOutside(subject, container)).toBeFalsy();
    });

    it('is false if bottom overlaps container', () => {
      subject = { ...container, top: -99 };

      expect(fitsOutside(subject, container)).toBeFalsy();
    });

    it('is false if subject eclipses container', () => {
      subject = { ...container, height: 105, width: 105 };

      expect(fitsOutside(subject, container)).toBeFalsy();
    });

    it('is false if container eclipses subject', () => {
      subject = { ...container, height: 95, width: 95 };

      expect(fitsOutside(subject, container)).toBeFalsy();
    });

    it('is true if top is below container', () => {
      subject = { ...container, top: 101 };

      expect(fitsOutside(subject, container)).toBeTruthy();
    });

    it('is true if bottom is above container', () => {
      subject = { ...container, top: -101 };

      expect(fitsOutside(subject, container)).toBeTruthy();
    });

    it('is true if right is left of container', () => {
      subject = { ...container, left: -101 };

      expect(fitsOutside(subject, container)).toBeTruthy();
    });

    it('is true if left is right of container', () => {
      subject = { ...container, left: 101 };

      expect(fitsOutside(subject, container)).toBeTruthy();
    });
  });
});
