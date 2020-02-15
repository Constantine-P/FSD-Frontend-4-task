
import Model from "./layers/Model";
import View from "./layers/View";
import Controller from "./layers/Controller";
import PanelView from "./layers/PanelView";
import ISliderOptions from "./interfaces/ISliderOptions";
import IRange from "./interfaces/IRange";
import IScale from "./interfaces/IScale";
import {SliderType} from "./types/SliderType";

export default class Slider {
  private readonly model: Model;
  private readonly controller: Controller;
  private readonly view: View;
  private readonly panels: PanelView[];

  constructor(slider: HTMLElement, options: ISliderOptions, panels?: HTMLElement | HTMLElement[]) {
    if (panels instanceof HTMLElement) {
      panels = [panels];
    }
    this.model = new Model(options);
    this.view = new View(slider, options);
    this.panels = (panels) ? panels.map(panel => new PanelView(panel)) : null;
    this.controller = new Controller(this.model, this.view, this.panels);
  }

  get range() {
    return this.model.range;
  }

  set range(range: IRange) {
    this.model.range = range as IRange;
  }

  get scale() {
    return this.model.scale;
  }

  set scale(scale: IScale) {
    this.model.scale = scale;
  }

  get type() {
    return this.view.model.type;
  }

  set type(value: SliderType) {
    this.view.model.type = value;
  }

  get isRange() {
    return this.view.model.isRange;
  }

  set isRange(value: boolean) {
    this.view.model.isRange = value;
  }

  get isVisibleTooltip() {
    return this.view.model.isVisibleTooltip;
  }

  set isVisibleTooltip(value: boolean) {
    this.view.model.isVisibleTooltip = value;
  }

  get isVisibleScale() {
    return this.view.model.isVisibleScale;
  }

  set isVisibleScale(value: boolean) {
    this.view.model.isVisibleScale = value;
  }

  get isReverseDirection() {
    return this.view.model.isReverseDirection;
  }

  set isReverseDirection(value: boolean) {
    this.view.model.isReverseDirection = value;
  }

};
