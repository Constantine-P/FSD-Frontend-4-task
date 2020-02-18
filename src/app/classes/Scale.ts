import Range from './Range';
import ScaleValue from '../interfaces/ScaleValue';

export default class Scale extends Range {
  private readonly _steps: string;

  constructor(value: ScaleValue = { min: 0, max: 0, steps: '' }) {
    super(value);
    this._steps = value.steps;
  }

  get steps(): string {
    return this._steps;
  }

  get positions(): number[] {
    return this.values.map((item) => (item - this.min) / this.length);
  }

  get values(): number[] {
    const steps = this.parseSteps;

    if (steps.length === 0) return [];

    let array = [this.min];

    if (steps.length === 1) {
      const step = steps[0];
      const n = this.length / step + 1;

      for (let i = 1; i < n; i += 1) {
        array.push(step * i + this.min);
      }

      while (array.slice(-1)[0] > this.max) {
        array.pop();
      }

      if (array.slice(-1)[0] < this.max) {
        array.push(this.max);
      }

      return array;
    }

    array = array.concat(steps.map((item) => item + this.min));

    while (array.slice(-1)[0] > this.max) {
      array.pop();
    }

    if (array.slice(-1)[0] < this.max) {
      array.push(this.max);
    }
    return array;
  }

  private get parseSteps(): number[] {
    if (this._steps === '') return [];
    const arr = [];
    this._steps.split(' ').forEach((item: string) => {
      if (item.split('*').length === 2) {
        const quantity = +item.split('*')[0];
        const value = +item.split('*')[1];
        arr.push(...(`${value}~`).repeat(quantity).slice(0, -1).split('~').map(Number));
      } else {
        arr.push(+item);
      }
    });
    arr.reduce((prev, curr, i) => {
      arr[i] = prev + curr;
      return arr[i];
    });
    return arr;
  }
}
