import PanelView from '../layers/PanelView';
import {SliderType} from '../types/SliderType';
import '@testing-library/jest-dom';

require('jsdom-global')();

describe('test PanelView', function () {
  let panelView: PanelView;

  beforeEach(() => {
    document.body.innerHTML = `
    <div class="panel">
      <input type="number" data-js="rangeMin" value="10">
      <input type="number" data-js="rangeMax" value="25">
      <input type="number" data-js="scaleMin" value="0">
      <input type="number" data-js="scaleMax" value="50">
      <input type="text"   data-js="steps" value="6">
      <input type="checkbox" data-js="isRange" checked>
      <input type="checkbox" data-js="isVisibleTooltip" checked>
      <input type="checkbox" data-js="isVisibleScale" checked>
      <input type="checkbox" data-js="isReverseDirection" checked>
      <select data-js="type">
        <option>horizontal</option>
        <option selected>vertical</option>
      </select>
    </div>`;
    const panel = document.querySelector('.panel') as HTMLElement;
    panelView = new PanelView(panel);
  });

  it('test git/set data', function () {
    const data = {
      range: {
        min: 11,
        max: 12,
      },
      scale: {
        min: -20,
        max: 30,
        steps: "123 456"
      },
      type: "horizontal" as SliderType,
      isRange: false,
      isVisibleScale: false,
      isVisibleTooltip: false,
      isReverseDirection: false,
    };
    panelView.data = data;
    expect(panelView.data).toStrictEqual(data);
  });

});
