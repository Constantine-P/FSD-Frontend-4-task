import isDefined from '../functions/isDefined';

describe('isDefined', () => {
  it('a = 1', () => {
    const a = 1;
    expect(isDefined(a)).toBe(true);
  });
  it('a not defined', () => {
    let a;
    expect(isDefined(a)).toBe(false);
  });

  it('a = 1, b = 0, c = "c"', () => {
    let a = 1;
    let b = 0;
    let c = "c";
    expect(isDefined(a, b, c)).toBe(true);
  });

  it('a = 1, b = 0, c = undefined', () => {
    let a = 1;
    let b = 0;
    let c = undefined;
    expect(isDefined(a, b, c)).toBe(false);
  });
});
