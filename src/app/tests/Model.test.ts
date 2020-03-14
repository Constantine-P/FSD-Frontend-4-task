import Model from '../layers/Model/Model';
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
    expect(model.scaleMin).toBe(9);
  });

  test('test scaleMax', () => {
    expect(model.scaleMax).toBe(10);
    model.scaleMax = 20;
    expect(model.scaleMax).toBe(20);
    model.scaleMax = -20;
    expect(model.scaleMax).toBe(-9);
  });

  test('test scaleSteps', () => {
    expect(model.scaleSteps).toBe('1');
    model.scaleSteps = '1 2 3';
    expect(model.scaleSteps).toBe('1 2 3');
    model.scaleSteps = '1*3 2*2.5 3*56';
    expect(model.scaleSteps).toBe('1*3 2*2.5 3*56');
    model.scaleSteps = 'asd asd 123';
    expect(model.scaleSteps).toBe('1*3 2*2.5 3*56');
  });

  test('test data', () => {
    expect(model.data).toStrictEqual({
      min: 2,
      max: 8,
      scaleMin: -10,
      scaleMax: 10,
      scaleSteps: '1',
      // range: new Range({ min: 2, max: 8 }),
      // relRange: { min: 12 / 20, max: 18 / 20 },
      // scale: { values: model.scale.values, positions: model.scale.positions },
    });
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
      // range: new Range({ min: 1, max: 7 }),
      // relRange: { min: 12 / 22, max: 18 / 22 },
      // scale: { values: model.scale.values, positions: model.scale.positions },
    });
  });

  // test('test set dataFromView', () => {
  //   model.dataFromView = {
  //     relRange: {
  //       min: 0.2,
  //       max: 0.4,
  //     },
  //     isRange: false,
  //   };
  //   expect(model.data).toStrictEqual({
  //     min: -6,
  //     max: -2,
  //     scaleMin: -10,
  //     scaleMax: 10,
  //     scaleSteps: '1',
  //     // range: new Range({ min: -6, max: -2 }),
  //     // relRange: { min: 0.2, max: 0.4 },
  //     // scale: { values: model.scale.values, positions: model.scale.positions },
  //   });
  // });

  test('test get dataToView', () => {
    expect(model.dataToView).toStrictEqual({
      minHandlePosition: 0.6,
      maxHandlePosition: 0.9,
      positions: '0'.repeat(21).split('').map((item, i) => i / 20),
      values: '0'.repeat(21).split('').map((item, i) => i - 10),
    });
  });

  test('test range', () => {
    expect(model.range).toStrictEqual(new Range({ min: 2, max: 8 }));
    model.range = new Range({ min: 0, max: 5 });
  });

  // test('test get relRange', () => {
  //   expect(model.relRange).toStrictEqual({ min: 12 / 20, max: 18 / 20 });
  // });
});
