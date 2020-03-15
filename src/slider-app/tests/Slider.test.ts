import Slider from '../Slider';
import Panel from '../../panel/Panel';
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
    slider = new Slider(sliderEl, options);
    new Panel(panel, slider);
  });

  test('test min', () => {
    expect(slider.min).toBe(2);
    slider.min = 3;
    expect(slider.min).toBe(3);
    slider.min = -20;
    expect(slider.min).toBe(-5);
    slider.min = 100;
    expect(slider.min).toBe(-5);
  });

  test('test max', () => {
    expect(slider.max).toBe(8);
    slider.max = 9;
    expect(slider.max).toBe(9);
    slider.max = 100;
    expect(slider.max).toBe(10);
    slider.max = -100;
    expect(slider.max).toBe(10);
  });

  test('test scaleMin', () => {
    expect(slider.scaleMin).toBe(-5);
    slider.scaleMin = -20;
    expect(slider.scaleMin).toBe(-20);
    slider.scaleMin = 20;
    expect(slider.scaleMin).toBe(9);
  });

  test('test scaleMax', () => {
    expect(slider.scaleMax).toBe(10);
    slider.scaleMax = 20;
    expect(slider.scaleMax).toBe(20);
    slider.scaleMax = -20;
    expect(slider.scaleMax).toBe(-4);
  });

  test('test scaleSteps', () => {
    expect(slider.scaleSteps).toBe('1');
    slider.scaleSteps = '1 2 3';
    expect(slider.scaleSteps).toBe('1 2 3');
    slider.scaleSteps = '1*3 2*2.5 3*56';
    expect(slider.scaleSteps).toBe('1*3 2*2.5 3*56');
    slider.scaleSteps = 'asd asd 123';
    expect(slider.scaleSteps).toBe('1*3 2*2.5 3*56');
  });

  test('test range', () => {
    expect(slider.range.min).toBe(2);
    expect(slider.range.max).toBe(8);

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

  test('test type', () => {
    expect(slider.type).toBe('horizontal');
    slider.type = 'vertical';
    expect(slider.type).toBe('vertical');
  });

  test('test isRange', () => {
    expect(slider.isRange).toBe(true);
    slider.isRange = false;
    expect(slider.isRange).toBe(false);
  });

  test('test areTooltipsVisible', () => {
    expect(slider.areTooltipsVisible).toBe(true);
    slider.areTooltipsVisible = false;
    expect(slider.areTooltipsVisible).toBe(false);
  });

  test('test isScaleVisible', () => {
    expect(slider.isScaleVisible).toBe(true);
    slider.isScaleVisible = false;
    expect(slider.isScaleVisible).toBe(false);
  });

  test('test isReverseDirection', () => {
    expect(slider.isReverseDirection).toBe(true);
    slider.isReverseDirection = false;
    expect(slider.isReverseDirection).toBe(false);
  });

  test('test data', () => {
    expect(slider.data).toStrictEqual({
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
      relRange: { min: 7 / 15, max: 13 / 15 },
      positions: '0'.repeat(16).split('').map((item, i) => i / 15),
      values: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    });
    const data = {
      min: -10,
      max: 5,
      scaleMin: -10,
      scaleMax: 20,
      scaleSteps: '5',
      areTooltipsVisible: false,
      isRange: false,
      isScaleVisible: false,
      isReverseDirection: false,
      type: 'vertical' as SliderType,
      relRange: { min: 0, max: 15 / 30 },
      positions: [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
      values: [-10, -5, 0, 5, 10, 15, 20],
    };
    slider.data = data;
    expect(slider.data).toStrictEqual(data);
  });
});
