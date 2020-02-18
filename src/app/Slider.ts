import Model from './layers/Model';
import View from './layers/View';
import Controller from './layers/Controller';
import PanelView from './layers/PanelView';
import Range from './classes/Range';
import SliderOptions from './interfaces/SliderOptions';
import RangeValue from './interfaces/RangeValue';
import { SliderType } from './types/SliderType';
import './styles/styles.styl';

class Slider {
  private readonly model: Model;

  private readonly controller: Controller;

  private readonly view: View;

  private readonly panels: PanelView[];

  constructor(slider: HTMLElement, options: SliderOptions, panels?: HTMLElement | HTMLElement[]) {
    const validPanels = (panels instanceof HTMLElement) ? [panels] : panels;
    this.model = new Model(options);
    this.view = new View(slider, options);
    this.panels = (validPanels) ? validPanels.map((panel) => new PanelView(panel)) : null;
    this.controller = new Controller(this.model, this.view, this.panels);
  }

  get min(): number {
    return this.model.min;
  }

  set min(value: number) {
    this.model.min = value;
  }

  get max(): number {
    return this.model.max;
  }

  set max(value: number) {
    this.model.max = value;
  }

  get scaleMin(): number {
    return this.model.scaleMin;
  }

  set scaleMin(value: number) {
    this.model.scaleMin = value;
  }

  get scaleMax(): number {
    return this.model.scaleMax;
  }

  set scaleMax(value: number) {
    this.model.scaleMax = value;
  }

  get scaleSteps(): string {
    return this.model.scaleSteps;
  }

  set scaleSteps(value: string) {
    this.model.scaleSteps = value;
  }

  get range(): RangeValue {
    return this.model.range;
  }

  set range(range: RangeValue) {
    this.model.range = new Range(range);
  }

  get type(): SliderType {
    return this.view.model.type;
  }

  set type(value: SliderType) {
    this.view.model.type = value;
  }

  get isRange(): boolean {
    return this.view.model.isRange;
  }

  set isRange(value: boolean) {
    this.view.model.isRange = value;
  }

  get areTooltipsVisible(): boolean {
    return this.view.model.areTooltipsVisible;
  }

  set areTooltipsVisible(value: boolean) {
    this.view.model.areTooltipsVisible = value;
  }

  get isScaleVisible(): boolean {
    return this.view.model.isScaleVisible;
  }

  set isScaleVisible(value: boolean) {
    this.view.model.isScaleVisible = value;
  }

  get isReverseDirection(): boolean {
    return this.view.model.isReverseDirection;
  }

  set isReverseDirection(value: boolean) {
    this.view.model.isReverseDirection = value;
  }
}

export default Slider;
