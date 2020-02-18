import EventEmitter from '../classes/EventEmitter';
import SliderOptions from '../interfaces/SliderOptions';
import RangeValue from '../interfaces/RangeValue';
import ViewScale from '../interfaces/ViewScale';
import TransitData from '../interfaces/TransitData';
import { SliderType } from '../types/SliderType';
import findClosest from '../functions/findClosest';
import minMax from '../functions/minMax';

class ViewModel extends EventEmitter {
  private _range: RangeValue;

  private _relRange: RangeValue;

  private _scale: ViewScale;

  private _type: SliderType;

  private _isRange: boolean;

  private _areTooltipsVisible: boolean;

  private _isScaleVisible: boolean;

  private _isReverseDirection: boolean;


  constructor(options: SliderOptions) {
    super();
    this._range = { min: options.min, max: options.max };
    this._relRange = { min: 0, max: 1 };
    this._scale = { positions: [], values: [] };
    this._type = options.type;
    this._isRange = options.isRange;
    this._areTooltipsVisible = options.areTooltipsVisible;
    this._isScaleVisible = options.isScaleVisible;
    this._isReverseDirection = options.isReverseDirection;
  }

  get scale(): ViewScale {
    return this._scale;
  }

  set scale(value: ViewScale) {
    this._scale = value;
  }

  get relRange(): RangeValue {
    return this._relRange;
  }

  set relRange(range: RangeValue) {
    this._relRange = {
      min: minMax(0, range.min, 1),
      max: minMax(0, range.max, 1),
    };
  }

  get type(): SliderType {
    return this._type;
  }

  set type(value: SliderType) {
    const isValueValid = (value === 'horizontal' || value === 'vertical');
    this._type = (isValueValid) ? value : 'horizontal';
    this.emit('change');
  }

  get isRange(): boolean {
    return this._isRange;
  }

  set isRange(value: boolean) {
    this._isRange = Boolean(value);
    this.emit('change');
  }

  get areTooltipsVisible(): boolean {
    return this._areTooltipsVisible;
  }

  set areTooltipsVisible(value: boolean) {
    this._areTooltipsVisible = Boolean(value);
    this.emit('change');
  }

  get isScaleVisible(): boolean {
    return this._isScaleVisible;
  }

  set isScaleVisible(value: boolean) {
    this._isScaleVisible = Boolean(value);
    this.emit('change');
  }

  get isReverseDirection(): boolean {
    return this._isReverseDirection;
  }

  set isReverseDirection(value: boolean) {
    this._isReverseDirection = Boolean(value);
    this.emit('change');
  }

  get range(): RangeValue {
    return this._range;
  }

  set range(value: RangeValue) {
    this._range = value;
  }

  get data(): TransitData {
    return {
      isRange: this.isRange,
      areTooltipsVisible: this.areTooltipsVisible,
      isScaleVisible: this.isScaleVisible,
      isReverseDirection: this.isReverseDirection,
      type: this.type,
    };
  }

  set data(value: TransitData) {
    const fields = ['range', 'relRange', 'scale', 'type',
      'isRange', 'areTooltipsVisible', 'isScaleVisible', 'isReverseDirection'];

    fields.forEach((key) => {
      if (value[key] !== undefined) {
        this[`_${key}`] = value[key];
      }
    });
  }

  updateRelRange(value: number): void {
    let x = value;
    if (this.scale.positions.toString() !== [].toString()) {
      x = findClosest(this.scale.positions, x);
    }

    if (this.isRange) {
      const distToMin = Math.abs(this.relRange.min - value);
      const distToMax = Math.abs(this.relRange.max - value);
      if (distToMin < distToMax) {
        this.relRange.min = x;
      } else {
        this.relRange.max = x;
      }
    } else {
      this.relRange.min = 0;
      this.relRange.max = x;
    }
    this.emit('change');
  }
}

export default ViewModel;
