import Range from '../classes/Range';

describe('test Range', () => {
  it('test getters', () => {
    const range = new Range({ min: -100, max: 100 });
    expect(range.min).toBe(-100);
    expect(range.max).toBe(100);
    expect(range.length).toBe(200);
  });
});
