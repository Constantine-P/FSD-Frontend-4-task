import Model from './layers/Model';
import View from './layers/View';
import Controller from './layers/Controller';
import PanelView from './layers/PanelView';
import Range from './classes/Range';
import SliderOptions from './interfaces/SliderOptions';
import RangeValue from './interfaces/RangeValue';
import { SliderType } from './types/SliderType';
import './styles/styles.styl';
import isNumeric from './functions/isNumeric';
import throwParamError from './functions/throwError';
import isDefined from './functions/isDefined';
import isValidNumberSteps from './functions/isValidNumberSteps';

class Slider {
  private readonly model: Model;

  private readonly controller: Controller;

  private readonly view: View;

  private readonly panels: PanelView[];

  constructor(slider: HTMLElement, options: SliderOptions, panels?: HTMLElement | HTMLElement[]) {
    const validPanels = (panels instanceof HTMLElement) ? [panels] : panels;
    const defaultOptions: SliderOptions = {
      min: Number.MIN_SAFE_INTEGER,
      max: 1,
      scaleMin: 0,
      scaleMax: 1,
      scaleSteps: '',
      areTooltipsVisible: true,
      isRange: true,
      isScaleVisible: true,
      isReverseDirection: false,
      type: 'horizontal',
    };
    Slider.validateOptions(options);
    const opts = Object.assign(defaultOptions, options);
    this.model = new Model(opts);
    this.view = new View(slider, opts);
    this.panels = (validPanels) ? validPanels.map((panel) => new PanelView(panel)) : null;
    this.controller = new Controller(this.model, this.view, this.panels);
  }

  get min(): number {
    return this.model.min;
  }

  set min(value: number) {
    if (isNumeric(value)) {
      if (value < this.scaleMin) throwParamError('min < scaleMin');
      if (value > this.scaleMax) throwParamError('min > scaleMax');
      if (value >= this.max) throwParamError('min >= max');
    } else {
      throwParamError(`wrong min value, "${value}" is not a number`);
    }
    this.model.min = value;
  }

  get max(): number {
    return this.model.max;
  }

  set max(value: number) {
    if (isNumeric(value)) {
      if (value < this.scaleMin) throwParamError('max < scaleMin');
      if (value > this.scaleMax) throwParamError('max > scaleMax');
      if (value <= this.min) throwParamError('max <= min');
    } else {
      throwParamError(`wrong max value, "${value}" is not a number`);
    }
    this.model.max = value;
  }

  get scaleMin(): number {
    return this.model.scaleMin;
  }

  set scaleMin(value: number) {
    if (isNumeric(value)) {
      if (value >= this.scaleMax) throwParamError('scaleMin >= scaleMax');
      if (value > this.min) throwParamError('scaleMin > min');
      if (value > this.max) throwParamError('scaleMin > max');
    } else {
      throwParamError(`wrong scaleMin value, "${value}" is not a number`);
    }
    this.model.scaleMin = value;
  }

  get scaleMax(): number {
    return this.model.scaleMax;
  }

  set scaleMax(value: number) {
    if (isNumeric(value)) {
      if (this.scaleMin >= value) throwParamError('scaleMin >= scaleMax');
      if (value < this.min) throwParamError('scaleMax < min');
      if (value < this.max) throwParamError('scaleMax < max');
    } else {
      throwParamError(`wrong scaleMax value, "${value}" is not a number`);
    }
    this.model.scaleMax = value;
  }

  get scaleSteps(): string {
    return this.model.scaleSteps;
  }

  set scaleSteps(value: string) {
    if (!isValidNumberSteps(value)) throwParamError('scaleSteps value is not valid');
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
    if (['horizontal', 'vertical'].indexOf(value) === -1) throwParamError('wrong type value');
    this.view.model.type = value;
  }

  get isRange(): boolean {
    return this.view.model.isRange;
  }

  set isRange(value: boolean) {
    if (typeof value !== 'boolean') throwParamError(`wrong isRange value, "${value}" is not boolean`);
    this.view.model.isRange = value;
  }

  get areTooltipsVisible(): boolean {
    return this.view.model.areTooltipsVisible;
  }

  set areTooltipsVisible(value: boolean) {
    if (typeof value !== 'boolean') throwParamError(`wrong areTooltipsVisible value, "${value}" is not boolean`);
    this.view.model.areTooltipsVisible = value;
  }

  get isScaleVisible(): boolean {
    return this.view.model.isScaleVisible;
  }

  set isScaleVisible(value: boolean) {
    if (typeof value !== 'boolean') throwParamError(`wrong isScaleVisible value, "${value}" is not boolean`);
    this.view.model.isScaleVisible = value;
  }

  get isReverseDirection(): boolean {
    return this.view.model.isReverseDirection;
  }

  set isReverseDirection(value: boolean) {
    if (typeof value !== 'boolean') throwParamError(`wrong isReverseDirection value, "${value}" is not boolean`);
    this.view.model.isReverseDirection = value;
  }

  private static validateOptions(options: SliderOptions): void {
    const numericParams = ['scaleMin', 'scaleMax', 'min', 'max'];
    const booleanParams = ['isRange', 'isReverseDirection', 'isScaleVisible', 'areTooltipsVisible'];
    const {
      scaleMin, scaleMax, scaleSteps, min, max,
    } = options;

    Object.keys(options).forEach((key) => {
      const isNotNumeric = numericParams.indexOf(key) > -1 && !isNumeric(options[key]);
      if (isNotNumeric) {
        throwParamError(`wrong ${key} value, ${options[key]} is not a number`);
      }
    });

    Object.keys(options).forEach((key) => {
      const isNotBoolean = booleanParams.indexOf(key) > -1 && typeof options[key] !== 'boolean';
      if (isNotBoolean) throwParamError(`wrong ${key} value, ${options[key]} is not boolean`);
    });

    if (isNumeric(scaleMin, scaleMax) && scaleMin >= scaleMax) {
      throwParamError('scaleMin >= scaleMax');
    }
    if (isNumeric(scaleMin, min) && min < scaleMin) throwParamError('min < scaleMin');
    if (isNumeric(scaleMax, min) && min > scaleMax) throwParamError('min > scaleMax');
    if (isNumeric(scaleMax, max) && max > scaleMax) throwParamError('max > scaleMax');
    if (isNumeric(scaleMin, max) && max < scaleMin) throwParamError('max < scaleMin');
    if (isNumeric(min, max) && min > max) throwParamError('min > max');
    if (isNumeric(min, max) && min === max) throwParamError('min === max');
    if (isDefined(scaleSteps) && !isValidNumberSteps(scaleSteps)) {
      throwParamError('scaleSteps is not valid');
    }
  }
}

export default Slider;
