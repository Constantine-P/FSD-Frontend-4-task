import EventEmitter from '../../classes/EventEmitter';
import RangeValue from '../../interfaces/RangeValue';
import TransmittedData from '../../interfaces/TransmittedData';
import SliderOptions from '../../interfaces/SliderOptions';
import normalizeToNum from '../../functions/normalizeToNum';
import minMax from '../../functions/minMax';
import throwParamError from '../../functions/throwError';
import DEFAULT_SLIDER_OPTIONS from '../../DEFAULT_SLIDER_OPTIONS';

class Model extends EventEmitter {
  private minValue: number;

  private maxValue: number;

  private scaleMinValue: number;

  private scaleMaxValue: number;

  private scaleStepValue: number;

  private isRangeValue: boolean;

  constructor(options: SliderOptions) {
    super();
    let opts = { ...DEFAULT_SLIDER_OPTIONS, ...options };
    if (!this.isValid(opts)) {
      throwParamError('Slider options is not valid, options set to default');
      opts = DEFAULT_SLIDER_OPTIONS;
    }
    this.init(opts);
    this.data = opts;
  }

  get min(): number {
    return this.minValue;
  }

  set min(value: number) {
    const {
      scaleMin, scaleMax, max, isRange,
    } = this;
    let val = this.round(normalizeToNum(value, scaleMax));
    const isValid = (val >= scaleMin) && (val < scaleMax) && (val < max);
    if (!isValid) val = scaleMin;
    this.minValue = (isRange) ? val : scaleMin;
    this.emit('change', 'min');
  }

  get max(): number {
    return this.maxValue;
  }

  set max(value: number) {
    const {
      scaleMin, scaleMax, min, isRange,
    } = this;
    let val = this.round(normalizeToNum(value, scaleMax));
    const isValid = (isRange ? val > scaleMin : val >= scaleMin)
      && (val <= scaleMax) && (isRange ? val > min : true);
    if (!isValid) val = scaleMax;
    this.maxValue = val;
    this.emit('change', 'max');
  }

  get scaleMin(): number {
    return this.scaleMinValue;
  }

  set scaleMin(value: number) {
    let val = normalizeToNum(value, this.min);
    if (val >= this.scaleMax) val = this.scaleMin;
    this.scaleMinValue = val;
    this.scaleMax = this.scaleMaxValue;
    if (val > this.min) {
      this.min = val;
    } else {
      this.min = this.minValue;
    }
    if (val > this.max) {
      this.max = val;
    } else {
      this.max = this.maxValue;
    }
    this.emit('change', 'scaleMin');
  }

  get scaleMax(): number {
    return this.scaleMaxValue;
  }

  set scaleMax(value: number) {
    let val = normalizeToNum(value, this.max);
    if (val <= this.scaleMin) val = this.scaleMax;
    if (val < this.max && val < this.min) {
      val = this.scaleMaxValue;
    } if (val < this.max) {
      this.max = val;
    }
    val = this.round(val);
    this.scaleMaxValue = val;
    this.emit('change', 'scaleMax');
  }

  get scaleStep(): number {
    return this.scaleStepValue;
  }

  set scaleStep(value: number) {
    let val = Math.abs(normalizeToNum(value, 1));
    val = minMax(1, val, this.scaleLength);
    this.scaleStepValue = val;
    this.scaleMax = this.scaleMaxValue;
    this.min = this.minValue;
    this.max = this.maxValue;
    this.emit('change', 'scaleStep');
  }

  get scaleLength(): number {
    return Math.abs(this.scaleMax - this.scaleMin);
  }

  get range(): RangeValue {
    return { min: this.min, max: this.max };
  }

  set range(value: RangeValue) {
    this.min = value.min;
    this.max = value.max;
  }

  get relRange(): RangeValue {
    return ({
      min: this.relMin,
      max: this.relMax,
    });
  }

  set relRange(value: RangeValue) {
    this.relMin = value.min;
    this.relMax = value.max;
  }

  get relMin(): number {
    return (this.min - this.scaleMin) / this.scaleLength;
  }

  set relMin(value: number) {
    this.min = value * this.scaleLength + this.scaleMin;
  }

  get relMax(): number {
    return (this.max - this.scaleMin) / this.scaleLength;
  }

  set relMax(value: number) {
    this.max = value * this.scaleLength + this.scaleMin;
  }

  get isRange(): boolean {
    return this.isRangeValue;
  }

  set isRange(value: boolean) {
    this.isRangeValue = value;
    if (this.min === this.max) this.max += this.scaleStep;
  }

  get data(): TransmittedData {
    const {
      min, max, scaleMin, scaleMax, scaleStep, relRange,
    } = this;
    return {
      min, max, scaleMin, scaleMax, scaleStep, relRange,
    };
  }

  set data(value: TransmittedData) {
    const fields = ['scaleStep', 'scaleMin', 'scaleMax', 'min', 'max', 'isRange', 'relRange'];
    fields.forEach((key) => {
      if (value[key] !== undefined) {
        this[key] = value[key];
      }
    });
  }

  private isValid = (options): boolean => {
    const {
      min, max, scaleMin, scaleMax, scaleStep,
    } = options;
    return ((min < max) && (scaleMin < scaleMax)
      && (min >= scaleMin) && (max <= scaleMax)
      && (scaleStep <= scaleMax - scaleMin));
  };

  private init(options): void {
    this.scaleMinValue = options.scaleMin;
    this.scaleMaxValue = options.scaleMax;
    this.minValue = options.min;
    this.maxValue = options.max;
    this.scaleStepValue = options.scaleStep;
    this.isRangeValue = options.isRange;
  }

  private round(value: number): number {
    return Math.round((value - this.scaleMin) / this.scaleStep) * this.scaleStep + this.scaleMin;
  }
}

export default Model;
