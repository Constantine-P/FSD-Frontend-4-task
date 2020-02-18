import ViewModel from '../layers/ViewModel';
import { SliderType } from '../types/SliderType';

describe('test ViewModel', () => {
  const options = {
    min: 2,
    max: 8,
    scaleMin: -10,
    scaleMax: 10,
    scaleSteps: '1',
    areTooltipsVisible: true,
    isRange: true,
    isScaleVisible: true,
    isReverseDirection: true,
    type: 'horizontal' as SliderType,
  };

  let viewModel: ViewModel;
  beforeEach(() => {
    viewModel = new ViewModel(options);
  });

  it('test get relRange', () => {
    expect(viewModel.relRange.min).toBe(0);
    expect(viewModel.relRange.max).toBe(1);
  });

  it('test set relRange', () => {
    viewModel.relRange = { min: 0.2, max: 0.7 };
    expect(viewModel.relRange.min).toBe(0.2);
    expect(viewModel.relRange.max).toBe(0.7);
  });

  it('test get scale', () => {
    expect(viewModel.scale).toStrictEqual({ positions: [], values: [] });
  });

  it('test set scale', () => {
    viewModel.scale = { positions: [1, 2, 3], values: [4, 5, 6] };
    expect(viewModel.scale).toStrictEqual({ positions: [1, 2, 3], values: [4, 5, 6] });
  });

  it('test get type', () => {
    expect(viewModel.type).toBe('horizontal');
  });

  it('test set type', () => {
    viewModel.type = 'vertical';
    expect(viewModel.type).toBe('vertical');
  });

  it('test get isRange', () => {
    expect(viewModel.isRange).toBe(true);
  });

  it('test set isRange', () => {
    viewModel.isRange = false;
    expect(viewModel.isRange).toBe(false);
  });

  it('test get areTooltipsVisible', () => {
    expect(viewModel.areTooltipsVisible).toBe(true);
  });

  it('test set areTooltipsVisible', () => {
    viewModel.areTooltipsVisible = false;
    expect(viewModel.areTooltipsVisible).toBe(false);
  });

  it('test get isScaleVisible', () => {
    expect(viewModel.isScaleVisible).toBe(true);
  });

  it('test set isScaleVisible', () => {
    viewModel.isScaleVisible = false;
    expect(viewModel.isScaleVisible).toBe(false);
  });

  it('test get isReverseDirection', () => {
    expect(viewModel.isReverseDirection).toBe(true);
  });

  it('test set isReverseDirection', () => {
    viewModel.isReverseDirection = false;
    expect(viewModel.isReverseDirection).toBe(false);
  });

  it('test get range', () => {
    expect(viewModel.range).toStrictEqual({ min: 2, max: 8 });
  });

  it('test set range', () => {
    viewModel.range = { min: 123, max: 456 };
    expect(viewModel.range).toStrictEqual({ min: 123, max: 456 });
  });

  it('test updateRelRange', () => {
    viewModel.updateRelRange(0.6);
    expect(viewModel.relRange).toStrictEqual({ min: 0, max: 0.6 });

    viewModel.updateRelRange(0.2);
    expect(viewModel.relRange).toStrictEqual({ min: 0.2, max: 0.6 });

    viewModel.scale = { positions: [0.1, 0.3, 0.7, 1], values: [1, 2, 3, 4] };

    viewModel.updateRelRange(0.25);
    viewModel.updateRelRange(0.8);
    expect(viewModel.relRange).toStrictEqual({ min: 0.3, max: 0.7 });
  });
});
