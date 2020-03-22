import getPositions from '../../functions/getPositions';

describe('isSimpleNumber test', () => {
  test('base: 100, baseStep: 1, size: 40,', () => {
    expect(getPositions({
      base: 100,
      baseStep: 1,
      size: 40,
    })).toStrictEqual([0, 50, 100]);
  });

  test('base: 100, baseStep: 1, size: 20,', () => {
    expect(getPositions({
      base: 100,
      baseStep: 1,
      size: 20,
    })).toStrictEqual([0, 20, 40, 60, 80, 100]);
  });

  test('base: 100, baseStep: 2, size: 20,', () => {
    expect(getPositions({
      base: 100,
      baseStep: 2,
      size: 20,
    })).toStrictEqual([0, 20, 40, 60, 80, 100]);
  });

  test('base: 100, baseStep: 3, size: 20,', () => {
    expect(getPositions({
      base: 100,
      baseStep: 3,
      size: 20,
    })).toStrictEqual([0, 24, 48, 72, 100]);
  });
});
