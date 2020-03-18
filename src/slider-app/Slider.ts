import './resources/styles/styles.styl';
import Model from './layers/Model/Model';
import View from './layers/View/View';
import Controller from './layers/Controller/Controller';
import EventEmitter from './classes/EventEmitter';
import { SliderType } from './types/SliderType';
import SliderOptions from './interfaces/SliderOptions';
import RangeValue from './interfaces/RangeValue';
import TransmittedData from './interfaces/TransmittedData';
import DEFAULT_SLIDER_OPTIONS from './DEFAULT_SLIDER_OPTIONS';

class Slider extends EventEmitter {
  private readonly model: Model;

  private readonly controller: Controller;

  private readonly view: View;

  constructor(slider: HTMLElement, options?: SliderOptions) {
    super();
    const opts = { ...DEFAULT_SLIDER_OPTIONS, ...options } as SliderOptions;
    this.model = new Model(opts);
    this.view = new View(slider, opts);
    this.controller = new Controller(this.model, this.view);
    this.subscribe();
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

  get scaleStep(): number {
    return this.model.scaleStep;
  }

  set scaleStep(value: number) {
    this.model.scaleStep = value;
  }

  get range(): RangeValue {
    return this.model.range;
  }

  set range(value: RangeValue) {
    this.model.range = value;
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
    this.model.isRange = value;
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

  get data(): TransmittedData {
    return { ...this.model.data, ...this.view.model.data };
  }

  set data(value) {
    this.view.model.data = value;
    this.model.data = value;
  }

  private subscribe(): void {
    const handleModelChange = (name): void => {
      this.emit('change', name);
    };

    const handleViewChange = (name): void => {
      if (['min', 'max'].indexOf(name) === -1) this.emit('change', name);
    };

    this.model.on('change', handleModelChange);
    this.view.on('change', handleViewChange);
  }
}

export default Slider;
