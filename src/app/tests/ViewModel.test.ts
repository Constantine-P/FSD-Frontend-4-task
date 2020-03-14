import ViewModel from '../layers/View/ViewModel';

describe('test ViewModel', () => {
  let model: ViewModel;

  beforeEach(() => {
    model = new ViewModel();
  });

  test('test positions', () => {
    expect(model.positions).toStrictEqual([]);
    model.positions = [1, 2, 3];
    expect(model.positions).toStrictEqual([1, 2, 3]);
  });

  test('test values', () => {
    expect(model.values).toStrictEqual([]);
    model.values = [1, 2, 3];
    expect(model.values).toStrictEqual([1, 2, 3]);
  });

  test('test minHandleValue', () => {
    expect(model.minHandleValue).toBe(undefined);
    model.positions = [0, 1];
    model.values = [10, 20];
    expect(model.minHandleValue).toBe(10);
  });

  test('test maxHandleValue', () => {
    expect(model.maxHandleValue).toBe(undefined);
    model.positions = [0, 1];
    model.values = [10, 20];
    expect(model.maxHandleValue).toBe(20);
  });

  test('test rangeLength', () => {
    expect(model.rangeLength).toBe(1);
  });

  test('test minHandlePosition', () => {
    expect(model.minHandlePosition).toBe(0);
    model.minHandlePosition = 0.6;
    expect(model.minHandlePosition).toBe(0.6);
    model.minHandlePosition = 2;
    expect(model.minHandlePosition).toBe(1);
  });

  test('test maxHandlePosition', () => {
    expect(model.maxHandlePosition).toBe(1);
    model.maxHandlePosition = 0.6;
    expect(model.maxHandlePosition).toBe(0.6);
    model.maxHandlePosition = -2;
    expect(model.maxHandlePosition).toBe(0);
  });

  test('test type', () => {
    expect(model.type).toBe('horizontal');
    model.type = 'vertical';
    expect(model.type).toBe('vertical');
  });

  test('test isRange', () => {
    expect(model.isRange).toBe(true);
    model.isRange = false;
    expect(model.isRange).toBe(false);
  });

  test('test areTooltipsVisible', () => {
    expect(model.areTooltipsVisible).toBe(true);
    model.areTooltipsVisible = false;
    expect(model.areTooltipsVisible).toBe(false);
  });

  test('test isScaleVisible', () => {
    expect(model.isScaleVisible).toBe(true);
    model.isScaleVisible = false;
    expect(model.isScaleVisible).toBe(false);
  });

  test('test isReverseDirection', () => {
    expect(model.isReverseDirection).toBe(false);
    model.isReverseDirection = true;
    expect(model.isReverseDirection).toBe(true);
  });

  test('test get data', () => {
    expect(model.data).toStrictEqual({
      areTooltipsVisible: true,
      isRange: true,
      isReverseDirection: false,
      isScaleVisible: true,
      maxHandlePosition: 1,
      minHandlePosition: 0,
      positions: [],
      type: 'horizontal',
      values: [],
    });
  });

  test('test set data', () => {
    model.data = {
      minHandlePosition: 0.2,
    };
    expect(model.minHandlePosition).toBe(0.2);
  });

  test('test get dataToModel', () => {
    expect(model.dataToModel).toStrictEqual({
      relRange: {
        min: 0,
        max: 1,
      },
      isRange: true,
    });
  });

});
