import Model from '../../layers/Model/Model';
import ISliderOptions from '../../interfaces/ISliderOptions';

describe('test Model', () => {
  let model: Model;
  const options: ISliderOptions = {
    min: 2,
    max: 8,
    scaleMin: -10,
    scaleMax: 10,
    scaleStep: 1,
    areTooltipsVisible: true,
    isRange: true,
    isScaleVisible: true,
    isReverseDirection: false,
    type: 'horizontal',
  };
  beforeEach(() => {
    model = new Model(options);
  });

  test('test min', () => {
    expect(model.min).toBe(2);
    model.min = 3;
    expect(model.min).toBe(3);
    model.min = -20;
    expect(model.min).toBe(-10);
    model.min = 100;
    expect(model.min).toBe(-10);
  });

  test('test max', () => {
    expect(model.max).toBe(8);
    model.max = 9;
    expect(model.max).toBe(9);
    model.max = 100;
    expect(model.max).toBe(10);
    model.max = -100;
    expect(model.max).toBe(10);
  });

  test('test scaleMin', () => {
    expect(model.scaleMin).toBe(-10);
    model.scaleMin = -20;
    expect(model.scaleMin).toBe(-20);
    model.scaleMin = 20;
    expect(model.scaleMin).toBe(-20);
    model.scaleMin = 5;
    expect(model.scaleMin).toBe(5);
    model.scaleMin = 9;
    expect(model.scaleMin).toBe(9);
  });

  test('test scaleMax', () => {
    expect(model.scaleMax).toBe(10);
    model.scaleMax = 20;
    expect(model.scaleMax).toBe(20);
    model.scaleMax = -20;
    expect(model.scaleMax).toBe(20);
    model.scaleMax = 0;
    expect(model.scaleMax).toBe(20);
    model.scaleMax = 7;
    expect(model.scaleMax).toBe(7);
  });

  test('test scaleStep', () => {
    expect(model.scaleStep).toBe(1);
    model.scaleStep = 2;
    expect(model.scaleStep).toBe(2);
  });

  test('test data', () => {
    expect(model.data).toStrictEqual({
      min: 2,
      max: 8,
      scaleMin: -10,
      scaleMax: 10,
      scaleStep: 1,
      relRange: {
        min: 0.6,
        max: 0.9,
      },
    });
    model.data = {
      min: 1,
      max: 7,
      scaleMin: -11,
      scaleMax: 11,
      scaleStep: 2,
    };
    expect(model.data).toStrictEqual({
      min: 1,
      max: 7,
      scaleMin: -11,
      scaleMax: 11,
      scaleStep: 2,
      relRange: {
        min: 12 / 22,
        max: 18 / 22,
      },
    });
  });

  test('test range', () => {
    expect(model.range).toStrictEqual({ min: 2, max: 8 });
    model.range = { min: 0, max: 5 };
    expect(model.range).toStrictEqual({ min: 0, max: 5 });
  });

  test('test relRange', () => {
    expect(model.relRange).toStrictEqual({ min: 12 / 20, max: 18 / 20 });
    model.relRange = { min: 1 / 20, max: 5 / 20 };
    expect(model.relRange).toStrictEqual({ min: 1 / 20, max: 5 / 20 });
  });

  test('test invalid data', () => {
    const opts = {
      scaleMin: 500,
      scaleMax: 100,
      scaleStep: 10,
      isScaleVisible: true,
    };
    model = new Model(opts);
    expect(model.data).toStrictEqual({
      min: 0,
      max: 100,
      scaleMin: 0,
      scaleMax: 100,
      scaleStep: 25,
      relRange: {
        min: 0,
        max: 1,
      },
    });
  });
});
