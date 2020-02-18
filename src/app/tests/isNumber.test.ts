import isNumber from '../functions/isNumber';

describe('isNumber', () => {
  it('0', () => {
    expect(isNumber(0)).toBe(true);
  });

  it('1.23', () => {
    expect(isNumber(1.23)).toBe(true);
  });

  it('-12.34', () => {
    expect(isNumber(-12.34)).toBe(true);
  });

  it('"0"', () => {
    expect(isNumber('0')).toBe(false);
  });

  it('asd', () => {
    expect(isNumber('0')).toBe(false);
  });

  it('[123]', () => {
    expect(isNumber([123])).toBe(false);
  });

  it('"-12.34"', () => {
    expect(isNumber('-12.34')).toBe(false);
  });

  it('NaN', () => {
    expect(isNumber(NaN)).toBe(false);
  });

  it('undefined', () => {
    expect(isNumber(undefined)).toBe(false);
  });

  it('null', () => {
    expect(isNumber(null)).toBe(false);
  });
});
