import minMax from '../../functions/minMax';

describe('minMax', () => {
  it('minMax(0, 1, 2) === 2', () => {
    expect(minMax(0, 1, 2)).toBe(1);
  });
  it('minMax(-100, 500, -5) === -5', () => {
    expect(minMax(-100, 500, -5)).toBe(-5);
  });
  it('minMax(-100, -100500, 500) === -100', () => {
    expect(minMax(-100, -100500, 500)).toBe(-100);
  });
});
