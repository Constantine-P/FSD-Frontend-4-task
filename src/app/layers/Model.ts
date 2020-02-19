import EventEmitter from '../classes/EventEmitter';
import SliderOptions from '../interfaces/SliderOptions';
import Range from '../classes/Range';
import Scale from '../classes/Scale';
import isValidNumberSteps from '../functions/isValidNumberSteps';
import normalizeToNum from '../functions/normalizeToNum';
import RangeValue from '../interfaces/RangeValue';
import TransitData from '../interfaces/TransitData';
import findClosest from '../functions/findClosest';

class Model extends EventEmitter {
  _min: number;

  _max: number;

  _scaleMin: number;

  _scaleMax: number;

  _scaleSteps: string;

  isRange: boolean;

  constructor(options: SliderOptions) {
    super();
    const defaultOptions: SliderOptions = {
      min: Number.MIN_SAFE_INTEGER, max: 0, scaleMin: 0, scaleMax: 0, scaleSteps: '',
    };
    Object.assign(defaultOptions, options);
    this._scaleMin = Number.MIN_SAFE_INTEGER;
    this._scaleMax = Number.MAX_SAFE_INTEGER;
    this._min = Number.MIN_SAFE_INTEGER;
    this._max = Number.MAX_SAFE_INTEGER;
    this._scaleSteps = '';
    this.isRange = true;
    this.data = options;
  }

  get min(): number {
    return this._min;
  }

  set min(value: number) {
    let val = findClosest(
      this.scale.values,
      Math.round(normalizeToNum(value, this.scaleMin)),
      this._min,
    );
    const isNotValid = val < this.scaleMin || val > this.scaleMax || val >= this.max;
    if (isNotValid) val = this._min;/* Math.max(this._min, this.scaleMin); */
    this._min = val;
    this.emit('change');
  }

  get max(): number {
    return this._max;
  }

  set max(value: number) {
    let val = findClosest(
      this.scale.values,
      Math.round(normalizeToNum(value, this.scaleMax)),
      this._max,
    );
    const isNotValid = val < this.scaleMin || val > this.scaleMax
      || (this.isRange ? val <= this.min : false);
    if (isNotValid) val = this._max;
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
    this._scaleSteps = isValidNumberSteps(value) ? value : this._scaleSteps;
    this.emit('change');
  }

  get data(): TransitData {
    return {
      min: this._min,
      max: this._max,
      scaleMin: this._scaleMin,
      scaleMax: this._scaleMax,
      scaleSteps: this._scaleSteps,
      range: this.range,
      relRange: this.relRange,
      scale: { values: this.scale.values, positions: this.scale.positions },
    };
  }

  set data(value: TransitData) {
    const fields = ['scaleMin', 'scaleMax', 'scaleSteps', 'min', 'max', 'isRange'];
    this.disableEmitting();
    fields.forEach((key) => {
      if (value[key] !== undefined && this[key] !== value[key]) {
        this[key] = value[key];
      }
    });
    this.enableEmitting();
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
    this.min = value.min * this.scale.length + this.scaleMin;
    this.max = value.max * this.scale.length + this.scaleMin;
  }

  get scale(): Scale {
    return new Scale({ min: this.scaleMin, max: this.scaleMax, steps: this.scaleSteps });
  }
}

export default Model;
