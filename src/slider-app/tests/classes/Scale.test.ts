import Scale from '../../classes/Scale';

describe('test Scale', () => {
  it('test get steps', () => {
    const scale = new Scale({ min: -100, max: 100, steps: '50' });
    expect(scale.steps).toBe('50');
  });

  it('test get values', () => {
    let scale = new Scale({ min: -100, max: 100, steps: '50' });
    expect(scale.values).toStrictEqual([-100, -50, 0, 50, 100]);

    scale = new Scale({ min: -100, max: 100, steps: '10 20 30' });
    expect(scale.values).toStrictEqual([-100, -90, -70, -40, 100]);

    scale = new Scale({ min: -100, max: 100, steps: '' });
    expect(scale.values).toStrictEqual([]);
  });

  it('test get positions', () => {
    let scale = new Scale({ min: -100, max: 100, steps: '50' });
    expect(scale.positions).toStrictEqual([0.00, 0.25, 0.50, 0.75, 1.00]);

    scale = new Scale({ min: -100, max: 100, steps: '10 20 30' });
    expect(scale.positions).toStrictEqual([0, 0.05, 0.15, 0.3, 1]);
  });
});
