import IRange from "../interfaces/IRange";

export default class Range {
    private _min: number;
    private _max: number;

    constructor(range: IRange = { min: 0, max: 0 }) {
        this._min = (range.min <= range.max) ? range.min : range.max;
        this._max = (range.min > range.max) ? range.min : range.max;
    }

    get min() {
        return this._min
    }

    get max() {
        return this._max
    }

    get length() {
        return this.max - this.min
    }

    set min(value) {
        this._min = (value < this.max) ? value : this.max;
    }

    set max(value) {
        this._max = (value > this.min) ? value : this.min;
    }
}