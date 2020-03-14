import DEFAULT_MODEL_OPTIONS from './DEFAULT_MODEL_OPTIONS';
import EventEmitter from '../../classes/EventEmitter';
import Range from '../../classes/Range';
import Scale from '../../classes/Scale';
import RangeValue from '../../interfaces/RangeValue';
import TransmittedData from '../../interfaces/TransmittedData';
import SliderOptions from '../../interfaces/SliderOptions';
import findClosest from '../../functions/findClosest';
import isValidNumberSteps from '../../functions/isValidNumberSteps';
import normalizeToNum from '../../functions/normalizeToNum';

class Model extends EventEmitter {
  private _min: number;

  private _max: number;

  private _scaleMin: number;

  private _scaleMax: number;

  private _scaleSteps: string;

  private isSlide: boolean;

  public isRange: boolean;

  constructor(options: SliderOptions) {
    super();
    Object.assign(DEFAULT_MODEL_OPTIONS, options);
    this._scaleMin = Number.MIN_SAFE_INTEGER;
    this._scaleMax = Number.MAX_SAFE_INTEGER;
    this._min = Number.MIN_SAFE_INTEGER;
    this._max = Number.MAX_SAFE_INTEGER;
    this._scaleSteps = '';
    this.isRange = true;
    this.isSlide = true;
    this.data = options;
  }

  get min(): number {
    return this._min;
  }

  set min(value: number) {
    const {
      scale, scaleMin, scaleMax, _min, max, isRange, isSlide,
    } = this;
    let val = findClosest(
      scale.values,
      Math.round(normalizeToNum(value, scaleMin)),
      (isSlide) ? _min : null,
    );
    const isNotValid = (val < scaleMin) || (val > scaleMax) || (val >= max);
    if (isNotValid) val = _min;
    this._min = (isRange) ? val : scaleMin;
    this.emit('change');
  }

  get max(): number {
    return this._max;
  }

  set max(value: number) {
    const {
      scale, scaleMin, scaleMax, _max, min, isRange, isSlide,
    } = this;
    let val = findClosest(
      scale.values,
      Math.round(normalizeToNum(value, scaleMax)),
      (isSlide) ? _max : null,
    );
    const isNotValid = (val < scaleMin) || (val > scaleMax) || (isRange ? val <= min : false);
    if (isNotValid) val = _max;
    this._max = val;
    this.emit('change');
  }

  get scaleMin(): number {
    return this._scaleMin;
  }

  set scaleMin(value: number) {
    let val = normalizeToNum(value, this.min);
    if (val >= this.scaleMax) val = this.scaleMax - 1;
    if (val > this.min) this.min = val;
    if (val > this.max) this.max = val;
    this._scaleMin = val;
    this.emit('change');
  }

  get scaleMax(): number {
    return this._scaleMax;
  }

  set scaleMax(value: number) {
    let val = normalizeToNum(value, this.max);
    if (val <= this.scaleMin) val = this.scaleMin + 1;
    if (val < this.min) this.min = val;
    if (val < this.max) this.max = val;
    this._scaleMax = val;
    this.emit('change');
  }

  get scaleSteps(): string {
    return this._scaleSteps;
  }

  set scaleSteps(value: string) {
    if (isValidNumberSteps(value)) {
      this._scaleSteps = value;
      this.emit('change');
    }
  }

  get range(): Range {
    return new Range({ min: this.min, max: this.max });
  }

  set range(value: Range) {
    this.min = value.min;
    this.max = value.max;
  }

  get relRange(): RangeValue {
    return ({
      min: (this.min - this.scaleMin) / this.scale.length,
      max: (this.max - this.scaleMin) / this.scale.length,
    });
  }

  set relRange(value: RangeValue) {
    this.isSlide = false;
    this.min = value.min * this.scale.length + this.scaleMin;
    this.max = value.max * this.scale.length + this.scaleMin;
    this.isSlide = true;
  }

  get scale(): Scale {
    return new Scale({ min: this.scaleMin, max: this.scaleMax, steps: this.scaleSteps });
  }

  get data(): TransmittedData {
    const {
      min, max, scaleMin, scaleMax, scaleSteps,
    } = this;
    return {
      min, max, scaleMin, scaleMax, scaleSteps, // eslint-disable-line object-property-newline
      relRange: this.relRange,
      positions: this.scale.positions,
      values: this.scale.values,
    };
  }

  set data(value: TransmittedData) {
    const fields = ['scaleMin', 'scaleMax', 'scaleSteps', 'min', 'max', 'isRange', 'relRange'];
    this.disableEmitting();
    fields.forEach((key) => {
      if (value[key] !== undefined) {
        this[key] = value[key];
      }
    });
    this.enableEmitting();
    this.emit('change');
  }
}

export default Model;
