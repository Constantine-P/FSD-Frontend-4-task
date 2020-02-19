import isNumeric from '../functions/isNumeric';

describe('isNumeric', () => {
  it('0', () => {
    expect(isNumeric(0)).toBe(true);
  });

  it('1.23', () => {
    expect(isNumeric(1.23)).toBe(true);
  });

  it('-12.34', () => {
    expect(isNumeric(-12.34)).toBe(true);
  });

  it('"0"', () => {
    expect(isNumeric('0')).toBe(false);
  });

  it('asd', () => {
    expect(isNumeric('0')).toBe(false);
  });

  it('[123]', () => {
    expect(isNumeric([123])).toBe(false);
  });

  it('"-12.34"', () => {
    expect(isNumeric('-12.34')).toBe(false);
  });

  it('NaN', () => {
    expect(isNumeric(NaN)).toBe(false);
  });

  it('undefined', () => {
    expect(isNumeric(undefined)).toBe(false);
  });

  it('null', () => {
    expect(isNumeric(null)).toBe(false);
  });

  it('1, 2, -3.5', () => {
    expect(isNumeric(1, 2, -3.5)).toBe(true);
  });

  it('1, 2, -3.5, "5"', () => {
    expect(isNumeric(1, 2, -3.5, '5')).toBe(false);
  });
});
