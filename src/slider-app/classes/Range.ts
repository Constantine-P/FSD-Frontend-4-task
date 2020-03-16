import RangeValue from '../interfaces/RangeValue';
import EventEmitter from './EventEmitter';

class Range extends EventEmitter {
  private readonly _min: number;

  private readonly _max: number;

  constructor(value: RangeValue = { min: 0, max: 0 }) {
    super();
    this._min = value.min;
    this._max = value.max;
  }

  get min(): number {
    return this._min;
  }

  get max(): number {
    return this._max;
  }

  get length(): number {
    return this.max - this.min;
  }
}

export default Range;
