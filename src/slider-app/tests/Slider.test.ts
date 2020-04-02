import Slider from '../Slider';
import Panel from '../../panel/Panel';
import ISliderOptions from '../interfaces/ISliderOptions';
import '@testing-library/jest-dom';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')();

describe('test Scale', () => {
  let slider: Slider;
  const options: ISliderOptions = {
    min: 2,
    max: 8,
    scaleMin: -5,
    scaleMax: 10,
    scaleStep: 1,
    areTooltipsVisible: true,
    isRange: true,
    isScaleVisible: true,
    isReverseDirection: true,
    type: 'horizontal',
  };
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="slider"
      data-min = "-2500"
      data-max = "-2000"
      data-scale-min = "-10000"
      data-scale-max = "10000"
      data-scale-step = "1"
      data-are-tooltips-visible = "true"
      data-is-range = "true"
      data-is-scale-visible = "true"
      data-is-reverse-direction = "false"
      data-type = "horizontal"
      data-units = "Дж"
    ></div>
    <div class="panel">
      <input type="number"   data-js="min" name="min">
      <input type="number"   data-js="max" name="max">
      <input type="number"   data-js="scaleMin" name="scaleMin">
      <input type="number"   data-js="scaleMax" name="scaleMax">
      <input type="number"   data-js="scaleStep" name="scaleStep">
      <input type="checkbox" data-js="isRange" name="isRange" checked>
      <input type="checkbox" data-js="areTooltipsVisible" name="areTooltipsVisible" checked>
      <input type="checkbox" data-js="isScaleVisible" name="isScaleVisible" checked>
      <input type="checkbox" data-js="isReverseDirection" name="isReverseDirection" checked>
      <select data-js="type">
        <option>horizontal</option>
        <option selected>vertical</option>
      </select>
    </div>`;
    const sliderEl: HTMLElement = document.querySelector('.slider');
    const panel: HTMLElement = document.querySelector('.panel');
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
    expect(slider.scaleMin).toBe(-20);
  });

  test('test scaleMax', () => {
    expect(slider.scaleMax).toBe(10);
    slider.scaleMax = 20;
    expect(slider.scaleMax).toBe(20);
    slider.scaleMax = -20;
    expect(slider.scaleMax).toBe(20);
  });

  test('test scaleStep', () => {
    expect(slider.scaleStep).toBe(1);
    slider.scaleStep = 2;
    expect(slider.scaleStep).toBe(2);
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
      scaleStep: 1,
      areTooltipsVisible: true,
      isRange: true,
      isScaleVisible: true,
      isReverseDirection: true,
      type: 'horizontal',
      relRange: { min: 7 / 15, max: 13 / 15 },
      units: 'Дж',
    });
    const data: ISliderOptions = {
      min: -10,
      max: 5,
      scaleMin: -10,
      scaleMax: 20,
      scaleStep: 5,
      areTooltipsVisible: false,
      isRange: false,
      isScaleVisible: false,
      isReverseDirection: false,
      type: 'vertical',
      units: 'zxc',
    };
    slider.data = data;
    expect(slider.data).toStrictEqual({
      ...data, relRange: { min: 0, max: 15 / 30 },
    });
  });
});
