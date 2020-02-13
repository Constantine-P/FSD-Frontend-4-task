import Controller from "../layers/Controller";
import Model from "../layers/Model";
import View from "../layers/View";
import PanelView from "../layers/PanelView";
import {SliderType} from "../types/SliderType";
import '@testing-library/jest-dom';

require('jsdom-global')();

describe("test Controller", function () {
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
  let model: Model;
  let view: View;
  let panelView: PanelView;

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
    const slider = document.querySelector(".slider") as HTMLElement;
    const panel = document.querySelector(".panel") as HTMLElement;
    model = new Model(options);
    view = new View(slider, options);
    panelView = new PanelView(panel);
    new Controller(model, view, [panelView]);
  });

  it("test model change", function () {
    model.range.min = -2;
    model.range.max = 9;
    expect(view.model.relRange.min).toBe(0.2);
    expect(panelView.data).toStrictEqual({
      range: {
        min: -2,
        max: 9,
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
    });
  });

  it("test view change", function () {
    view.model.updateRelRange(1);
    view.model.updateRelRange(0.2);
    expect(model.range.max).toBe(10);
    expect(model.range.min).toBe(-2);
    expect(panelView.data).toStrictEqual({
      range: {
        min: -2,
        max: 10,
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
    });
  });

  it("test panelView change", function () {
    panelView.data = {
      scale: {
        min: -100,
        max: 200,
        steps: "5"
      },
      range: {
        min: -20,
        max: 25,
      },
      isVisibleTooltip: false,
      isRange: true,
      isVisibleScale: false,
      isReverseDirection: true,
      type: <SliderType>"vertical",
    };
    panelView.emit("change");
    expect(model.range.min).toBe(-20);
    expect(model.range.max).toBe(25);
    expect(model.scale.min).toBe(-100);
    expect(model.scale.max).toBe(200);
    expect(model.scale.steps).toBe("5");
    expect(view.model.isRange).toBe(true);
    expect(view.model.isVisibleTooltip).toBe(false);
    expect(view.model.isVisibleScale).toBe(false);
    expect(view.model.isReverseDirection).toBe(true);
    expect(view.model.relRange.max).toBe(125/300);
    expect(view.model.relRange.min).toBe(80/300);
  });

  it("test model and view without panels connection", function () {
    new Controller(model, view);
    model.range.min = -2;
    model.range.max = 9;
    view.model.updateRelRange(1);
    view.model.updateRelRange(0.2);
    expect(view.model.relRange.min).toBe(0.2);
    expect(panelView.data).toStrictEqual({
      range: {
        min: -2,
        max: 10,
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
    });
  });
});
