import Model from '../layers/Model';
import Range from '../classes/Range';
import Scale from '../classes/Scale';
import { SliderType } from '../types/SliderType';

describe('test Model', () => {
  let model: Model;
  const options = {
    min: 2,
    max: 8,
    scaleMin: -10,
    scaleMax: 10,
    scaleSteps: '1',
    areTooltipsVisible: true,
    isRange: true,
    isScaleVisible: true,
    isReverseDirection: false,
    type: 'horizontal' as SliderType,
  };
  beforeEach(() => {
    model = new Model(options);
  });

  it('test get min', () => {
    expect(model.min).toBe(2);
  });

  it('test set min', () => {
    model.min = 3;
    expect(model.min).toBe(3);
    model.min = -20;
    expect(model.min).toBe(-10);
    model.min = 100;
    expect(model.min).toBe(-10);
  });

  it('test get max', () => {
    expect(model.max).toBe(8);
  });

  it('test set max', () => {
    model.max = 9;
    expect(model.max).toBe(9);
    model.max = 100;
    expect(model.max).toBe(10);
    model.max = -100;
    expect(model.max).toBe(10);
  });

  it('test get scaleMin', () => {
    expect(model.scaleMin).toBe(-10);
  });

  it('test set scaleMin', () => {
    model.scaleMin = -20;
    expect(model.scaleMin).toBe(-20);
    model.scaleMin = 20;
    expect(model.scaleMin).toBe(9);
  });

  it('test get scaleMax', () => {
    expect(model.scaleMax).toBe(10);
  });

  it('test set scaleMax', () => {
    model.scaleMax = 20;
    expect(model.scaleMax).toBe(20);
    model.scaleMax = -20;
    expect(model.scaleMax).toBe(-9);
  });

  it('test get scaleSteps', () => {
    expect(model.scaleSteps).toBe('1');
  });

  it('test set scaleSteps', () => {
    model.scaleSteps = '1 2 3';
    expect(model.scaleSteps).toBe('1 2 3');
    model.scaleSteps = '1*3 2*2.5 3*56';
    expect(model.scaleSteps).toBe('1*3 2*2.5 3*56');
    model.scaleSteps = 'asd asd 123';
    expect(model.scaleSteps).toBe('1*3 2*2.5 3*56');
  });

  it('test get data', () => {
    expect(model.data).toStrictEqual({
      min: 2,
      max: 8,
      scaleMin: -10,
      scaleMax: 10,
      scaleSteps: '1',
      range: new Range({ min: 2, max: 8 }),
      relRange: { min: 12 / 20, max: 18 / 20 },
      scale: { values: model.scale.values, positions: model.scale.positions },
    });
  });

  it('test set data', () => {
    model.data = {
      min: 1,
      max: 7,
      scaleMin: -11,
      scaleMax: 11,
      scaleSteps: '2',
    };
    expect(model.data).toStrictEqual({
      min: 1,
      max: 7,
      scaleMin: -11,
      scaleMax: 11,
      scaleSteps: '2',
      range: new Range({ min: 1, max: 7 }),
      relRange: { min: 12 / 22, max: 18 / 22 },
      scale: { values: model.scale.values, positions: model.scale.positions },
    });
  });

  it('test get range', () => {
    expect(model.range.min).toBe(2);
    expect(model.range.max).toBe(8);
  });

  it('test get relRange', () => {
    expect(model.relRange).toStrictEqual({ min: 12 / 20, max: 18 / 20 });
  });

  it('test get scale', () => {
    expect(model.scale)
      .toStrictEqual(new Scale({ min: -10, max: 10, steps: '1' }));
  });
});
