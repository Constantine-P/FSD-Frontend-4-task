import normalizeToNum from '../functions/normalizeToNum';

describe('test normalizeToNum', () => {
  it('asd', () => {
    expect(normalizeToNum('asd')).toBe(0);
  });

  it('123', () => {
    expect(normalizeToNum(123)).toBe(123);
  });

  it('-123.456', () => {
    expect(normalizeToNum(-123.456)).toBe(-123.456);
  });
});
