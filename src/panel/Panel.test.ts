import Panel from './Panel';
import Slider from '../slider-app/Slider';
import { SliderType } from '../slider-app/types/SliderType';
import '@testing-library/jest-dom';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')();

describe('test PanelView', () => {
  let panelView: Panel;

  beforeEach(() => {
    document.body.innerHTML = `
    <div class="slider"></div>
    <div class="panel">
      <input type="number" data-js="min" value="10">
      <input type="number" data-js="max" value="25">
      <input type="number" data-js="scaleMin" value="0">
      <input type="number" data-js="scaleMax" value="50">
      <input type="text"   data-js="scaleSteps" value="6">
      <input type="checkbox" data-js="isRange" checked>
      <input type="checkbox" data-js="areTooltipsVisible" checked>
      <input type="checkbox" data-js="isScaleVisible" checked>
      <input type="checkbox" data-js="isReverseDirection" checked>
      <select data-js="type">
        <option>horizontal</option>
        <option selected>vertical</option>
      </select>
    </div>`;
    const sliderElement = document.querySelector('.slider') as HTMLElement;
    const slider = new Slider(sliderElement, {});
    const panelElement = document.querySelector('.panel') as HTMLElement;
    panelView = new Panel(panelElement, slider);
  });

  it('test git/set model', () => {
    const data = {
      min: 11,
      max: 12,
      scaleMin: -20,
      scaleMax: 30,
      scaleSteps: '123 456',
      type: 'horizontal' as SliderType,
      isRange: false,
      isScaleVisible: false,
      areTooltipsVisible: false,
      isReverseDirection: false,
    };
    panelView.model = data;
    expect(panelView.model).toStrictEqual(data);
  });
});
