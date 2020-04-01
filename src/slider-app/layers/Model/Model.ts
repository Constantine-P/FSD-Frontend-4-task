import EventEmitter from '../../classes/EventEmitter';
import IRangeValue from '../../interfaces/IRangeValue';
import ITransmittedData from '../../interfaces/ITransmittedData';
import ISliderOptions from '../../interfaces/ISliderOptions';
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

  private isIRangeValue: boolean;

  constructor(options: ISliderOptions) {
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
    return (this.isRange) ? this.minValue : this.scaleMin;
  }

  set min(value: number) {
    const {
      scaleMin, scaleMax, max,
    } = this;
    let val = this.round(normalizeToNum(value, scaleMax));
    const isValid = (val >= scaleMin) && (val < scaleMax) && (val < max);
    if (!isValid) val = scaleMin;
    this.minValue = val;
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

  get range(): IRangeValue {
    return { min: this.min, max: this.max };
  }

  set range(value: IRangeValue) {
    this.min = value.min;
    this.max = value.max;
  }

  get relRange(): IRangeValue {
    return ({
      min: this.relMin,
      max: this.relMax,
    });
  }

  set relRange(value: IRangeValue) {
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
    return this.isIRangeValue;
  }

  set isRange(value: boolean) {
    this.isIRangeValue = value;
    if (this.min === this.max) this.max += this.scaleStep;
    if (this.min > this.max) this.min = this.scaleMin;
    this.emit('change', 'isRange');
  }

  get data(): ITransmittedData {
    const {
      min, max, scaleMin, scaleMax, scaleStep, relRange,
    } = this;
    return {
      min, max, scaleMin, scaleMax, scaleStep, relRange,
    };
  }

  set data(value: ITransmittedData) {
    type ModelKeys = 'scaleStep' | 'scaleMin' | 'scaleMax' | 'min' | 'max' | 'isRange' | 'relRange';
    const fields = ['scaleStep', 'scaleMin', 'scaleMax', 'min', 'max', 'isRange', 'relRange'];
    fields.forEach((key: ModelKeys) => {
      if (value[key] !== undefined) {
        (this[key] as number | boolean | IRangeValue) = value[key];
      }
    });
  }

  private isValid = (options: ISliderOptions): boolean => {
    const {
      min, max, scaleMin, scaleMax, scaleStep,
    } = options;
    return ((min < max) && (scaleMin < scaleMax)
      && (min >= scaleMin) && (max <= scaleMax)
      && (scaleStep <= scaleMax - scaleMin));
  };

  private init(options: ISliderOptions): void {
    this.scaleMinValue = options.scaleMin;
    this.scaleMaxValue = options.scaleMax;
    this.minValue = options.min;
    this.maxValue = options.max;
    this.scaleStepValue = options.scaleStep;
    this.isIRangeValue = options.isRange;
  }

  private round(value: number): number {
    return Math.round((value - this.scaleMin) / this.scaleStep) * this.scaleStep + this.scaleMin;
  }
}

export default Model;
