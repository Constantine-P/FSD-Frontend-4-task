import isValidNumberSteps from '../../functions/isValidNumberSteps';

describe('isValidNumberSteps', () => {
  it('""', () => {
    expect(isValidNumberSteps('')).toBe(true);
  });

  it('"0"', () => {
    expect(isValidNumberSteps('0')).toBe(false);
  });

  it('"12 13 14"', () => {
    expect(isValidNumberSteps('12 13 14')).toBe(true);
  });

  it('"12.1 13.5 -54.4"', () => {
    expect(isValidNumberSteps('12.1 13.5 -54.4')).toBe(true);
  });

  it('"asd 13 14"', () => {
    expect(isValidNumberSteps('asd 13 14')).toBe(false);
  });

  it('"12 13 14a"', () => {
    expect(isValidNumberSteps('12 13 14a')).toBe(false);
  });

  it('"12 % 14"', () => {
    expect(isValidNumberSteps('12 % 14')).toBe(false);
  });

  it('"1123sdfsdf"', () => {
    expect(isValidNumberSteps('1123sdfsdf')).toBe(false);
  });

  it('undefined', () => {
    expect(isValidNumberSteps(undefined)).toBe(false);
  });

  it('"5*20"', () => {
    expect(isValidNumberSteps('5*20')).toBe(true);
  });

  it('"5*20 4*5.5 2*1.1"', () => {
    expect(isValidNumberSteps('5*20 4*5.5 2*1.1')).toBe(true);
  });
});
