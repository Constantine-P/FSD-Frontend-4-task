import Slider from '../Slider';
import {SliderType} from '../types/SliderType';
import '@testing-library/jest-dom';
import ViewModel from '../layers/ViewModel';

require('jsdom-global')();

describe("test Scale", function () {
  let slider: Slider;
  const options = {
    range: {
      min: 2,
      max: 8,
    },
    scale: {
      min: -5,
      max: 10,
      steps: "1"
    },
    isVisibleTooltip: true,
    isRange: true,
    isVisibleScale: true,
    isReverseDirection: true,
    type: <SliderType>"horizontal",
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
      <input type="checkbox" data-js="isVisibleTooltip" checked>
      <input type="checkbox" data-js="isVisibleScale" checked>
      <input type="checkbox" data-js="isReverseDirection" checked>
      <select data-js="type">
        <option>horizontal</option>
        <option selected>vertical</option>
      </select>
    </div>`;
    const sliderEl = document.querySelector(".slider") as HTMLElement;
    const panel = document.querySelector(".panel") as HTMLElement;
    slider = new Slider(sliderEl, options, panel);
  });

  it("test get range", function () {
    expect(slider.range.min).toBe(2);
    expect(slider.range.max).toBe(8)
  });

  it("test set range", function () {
    slider.range = {
      min: -100500,
      max: 100500
    };

    expect(slider.range.min).toBe(-5);
    expect(slider.range.max).toBe(10);

    slider.scale.steps = "3";
    slider.range = {
      min: -4,
      max: 9
    };
    expect(slider.range.min).toBe(-2);
    expect(slider.range.max).toBe(7);
  });

  it("test get scale", function () {
    expect(slider.scale.min).toBe(-5);
    expect(slider.scale.max).toBe(10);
    expect(slider.scale.steps).toBe("1");
  });

  it("test set scale", function () {
    slider.scale = {
      min: -100,
      max: 100,
      steps: "75"
    };
    expect(slider.scale.min).toBe(-100);
    expect(slider.scale.max).toBe(100);
    expect(slider.scale.steps).toStrictEqual("75");
  });

  it("test get type", function () {
    expect(slider.type).toBe("horizontal");
  });

  it("test set type", function () {
    slider.type = "vertical";
    expect(slider.type).toBe("vertical");
  });


  it("test get isRange", function () {
    expect(slider.isRange).toBe(true);
  });

  it("test set isRange", function () {
    slider.isRange = false;
    expect(slider.isRange).toBe(false);
  });


  it("test get isVisibleTooltip", function () {
    expect(slider.isVisibleTooltip).toBe(true);
  });

  it("test set isVisibleTooltip", function () {
    slider.isVisibleTooltip = false;
    expect(slider.isVisibleTooltip).toBe(false);
  });


  it("test get isVisibleScale", function () {
    expect(slider.isVisibleScale).toBe(true);
  });

  it("test set isVisibleScale", function () {
    slider.isVisibleScale = false;
    expect(slider.isVisibleScale).toBe(false);
  });

  it("test get isReverseDirection", function () {
    expect(slider.isReverseDirection).toBe(true);
  });

  it("test set isReverseDirection", function () {
    slider.isReverseDirection = false;
    expect(slider.isReverseDirection).toBe(false);
  });
});
