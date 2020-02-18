import EventEmitter from '../classes/EventEmitter';
import SliderOptions from '../interfaces/SliderOptions';
import Range from '../classes/Range';
import Scale from '../classes/Scale';
import isValidNumberSteps from '../functions/isValidNumberSteps';
import normalizeToNum from '../functions/normalizeToNum';
import minMax from '../functions/minMax';
import RangeValue from '../interfaces/RangeValue';
import TransitData from '../interfaces/TransitData';
import findClosest from '../functions/findClosest';

class Model extends EventEmitter {
  _min: number;

  _max: number;

  _scaleMin: number;

  _scaleMax: number;

  _scaleSteps: string;

  constructor(options: SliderOptions) {
    super();
    const defaultOptions: SliderOptions = {
      min: 0, max: 0, scaleMin: 0, scaleMax: 0, scaleSteps: '',
    };
    Object.assign(defaultOptions, options);
    this._min = options.min;
    this._max = options.max;
    this._scaleMin = options.scaleMin;
    this._scaleMax = options.scaleMax;
    this._scaleSteps = options.scaleSteps;
  }

  get min(): number {
    return this._min;
  }

  set min(value: number) {
    this._min = minMax(
      this.scaleMin,
      // normalizeToNum(value),
      findClosest(this.scale.values, normalizeToNum(value), this._min),
      Math.min(this.max, this.scaleMax),
    );
    this.emit('change');
  }

  get max(): number {
    return this._max;
  }

  set max(value: number) {
    this._max = minMax(
      Math.max(this.min, this.scaleMin),
      // normalizeToNum(value),
      findClosest(this.scale.values, normalizeToNum(value), this._max),
      this.scaleMax,
    );
    this.emit('change');
  }

  get scaleMin(): number {
    return this._scaleMin;
  }

  set scaleMin(value: number) {
    const val = normalizeToNum(value);
    this._scaleMin = (val > this.scaleMax) ? this.scaleMax : val;
    this.emit('change');
  }

  get scaleMax(): number {
    return this._scaleMax;
  }

  set scaleMax(value: number) {
    const val = normalizeToNum(value);
    this._scaleMax = (val < this.scaleMin) ? this.scaleMin : val;
    this.emit('change');
  }

  get scaleSteps(): string {
    return this._scaleSteps;
  }

  set scaleSteps(value: string) {
    this._scaleSteps = isValidNumberSteps(value) ? value : '';
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
    const fields = ['scaleMin', 'scaleMax', 'scaleSteps', 'min', 'max'];
    this.disableEmitting();
    fields.forEach((key) => {
      if (value[key] !== undefined) this[key] = value[key];
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
