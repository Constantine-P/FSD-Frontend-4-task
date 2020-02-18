import findClosest from '../functions/findClosest';

describe('test findClosest', () => {
  it('test findClosest', () => {
    expect(findClosest([0, 1, 2, 3, 33, 44, 111], 200)).toBe(111);
    expect(findClosest([0, 1, 2, 3, 33, 44, 111], -100)).toBe(0);
    expect(findClosest([0, 1, 2, 3, 33, 44, 111], 20)).toBe(33);
    expect(findClosest([0, 1, 2, 3, 33, 44, 111], 5)).toBe(3);
    expect(findClosest([], 5)).toBe(5);
  });

  it('test findClosest with previousValue', () => {
    expect(findClosest([0, 1, 2, 3, 33, 44, 111], 34, 33)).toBe(44);
    expect(findClosest([0, 1, 2, 3, 33, 44, 111], 32, 33)).toBe(3);
    expect(findClosest([0, 1, 2, 3, 33, 44, 111], 100, 111)).toBe(44);
    expect(findClosest([0, 1, 2, 3, 33, 44, 111], 200, 111)).toBe(111);
    expect(findClosest([0, 1, 2, 3, 33, 44, 111], -200, 3)).toBe(0);
    expect(findClosest([-20, -15, -10, -5, 0, 5, 10, 15, 20], 1, 0)).toBe(5);
  });
});
