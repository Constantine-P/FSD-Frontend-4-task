import isSimpleNumber from '../../functions/isSimpleNumber';

describe("isSimpleNumber test", () => {
  test("isSimpleNumber", () => {
    expect(isSimpleNumber(5)).toBeTruthy();
  });

  test("isSimpleNumber", () => {
    expect(isSimpleNumber(7)).toBeTruthy();
  });

  test("isSimpleNumber", () => {
    expect(isSimpleNumber(11)).toBeTruthy();
  });

  test("isSimpleNumber", () => {
    expect(isSimpleNumber(13)).toBeTruthy();
  });

  test("isSimpleNumber", () => {
    expect(isSimpleNumber(17)).toBeTruthy();
  });

  test("isSimpleNumber", () => {
    expect(isSimpleNumber(19)).toBeTruthy();
  });

  test("isSimpleNumber", () => {
    expect(isSimpleNumber(4)).toBeFalsy();
  });

  test("isSimpleNumber", () => {
    expect(isSimpleNumber(10)).toBeFalsy();
  });

  test("isSimpleNumber", () => {
    expect(isSimpleNumber(21)).toBeFalsy();
  });
});
