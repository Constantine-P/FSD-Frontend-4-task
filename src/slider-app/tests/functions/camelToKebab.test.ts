import camelToKebab from '../../functions/camelToKebab';

describe('test camelToKebab', () => {
  it('test camelToKebab', () => {
    expect(camelToKebab('someVariableName')).toBe('some-variable-name');
  });
  it('test scale', () => {
    expect(camelToKebab('scale')).toBe('scale');
  });
});
