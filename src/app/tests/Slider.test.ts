import Slider from '../Slider';
import { SliderType } from '../types/SliderType';
import '@testing-library/jest-dom';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')();

describe('test Scale', () => {
  let slider: Slider;
  const options = {
    min: 2,
    max: 8,
    scaleMin: -5,
    scaleMax: 10,
    scaleSteps: '1',
    areTooltipsVisible: true,
    isRange: true,
    isScaleVisible: true,
    isReverseDirection: true,
    type: 'horizontal' as SliderType,
  };
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="slider"></div>
    <div class="panel">
      <input type="number" data-js="rangeMin" value="10">
      <input type="number" data-js="rangeMax" value="25">
      <input type="number" data-js="scaleMin" value="0">
      <input type="number" data-js="scaleMax" value="50">
      <input type="text"   data-js="steps" value="6">
      <input type="checkbox" data-js="isRange" checked>
      <input type="checkbox" data-js="areTooltipsVisible" checked>
      <input type="checkbox" data-js="isScaleVisible" checked>
      <input type="checkbox" data-js="isReverseDirection" checked>
      <select data-js="type">
        <option>horizontal</option>
        <option selected>vertical</option>
      </select>
    </div>`;
    const sliderEl = document.querySelector('.slider') as HTMLElement;
    const panel = document.querySelector('.panel') as HTMLElement;
    slider = new Slider(sliderEl, options, panel);
  });

  it('test get range', () => {
    expect(slider.range.min).toBe(2);
    expect(slider.range.max).toBe(8);
  });

  it('test set range', () => {
    slider.range = {
      min: -100500,
      max: 100500,
    };

    expect(slider.range.min).toBe(-5);
    expect(slider.range.max).toBe(10);

    slider.scaleSteps = '3';
    slider.range = {
      min: -4,
      max: 9,
    };
    expect(slider.range.min).toBe(-2);
    expect(slider.range.max).toBe(7);
  });

  it('test get type', () => {
    expect(slider.type).toBe('horizontal');
  });

  it('test set type', () => {
    slider.type = 'vertical';
    expect(slider.type).toBe('vertical');
  });

  it('test get isRange', () => {
    expect(slider.isRange).toBe(true);
  });

  it('test set isRange', () => {
    slider.isRange = false;
    expect(slider.isRange).toBe(false);
  });

  it('test get areTooltipsVisible', () => {
    expect(slider.areTooltipsVisible).toBe(true);
  });

  it('test set areTooltipsVisible', () => {
    slider.areTooltipsVisible = false;
    expect(slider.areTooltipsVisible).toBe(false);
  });

  it('test get isScaleVisible', () => {
    expect(slider.isScaleVisible).toBe(true);
  });

  it('test set isScaleVisible', () => {
    slider.isScaleVisible = false;
    expect(slider.isScaleVisible).toBe(false);
  });

  it('test get isReverseDirection', () => {
    expect(slider.isReverseDirection).toBe(true);
  });

  it('test set isReverseDirection', () => {
    slider.isReverseDirection = false;
    expect(slider.isReverseDirection).toBe(false);
  });
});
