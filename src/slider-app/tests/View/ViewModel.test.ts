import ViewModel from '../../layers/View/ViewModel';

describe('test ViewModel', () => {
  let model: ViewModel;

  beforeEach(() => {
    model = new ViewModel();
  });

  test('test rangeLength', () => {
    expect(model.rangeLength).toBe(1);
  });

  test('test minHandlePosition', () => {
    expect(model.minHandlePosition).toBe(0);
    model.minHandlePosition = 0.6;
    expect(model.minHandlePosition).toBe(0.6);
  });

  test('test maxHandlePosition', () => {
    expect(model.maxHandlePosition).toBe(1);
    model.maxHandlePosition = 0.6;
    expect(model.maxHandlePosition).toBe(0.6);
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
      type: 'horizontal',
    });
  });

  test('test set data', () => {
    model.data = {
      minHandlePosition: 0.2,
    };
    expect(model.minHandlePosition).toBe(0.2);
  });
});
