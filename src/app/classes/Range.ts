import IRange from "../interfaces/IRange";
import EventEmitter from "./EventEmitter";
import isNumber from "../functions/isNumber";

export default class Range extends EventEmitter{
    private _min: number;
    private _max: number;

    constructor(range: IRange = { min: 0, max: 0 }) {
        super();
        this.normalize();
        this._min = (range.min <= range.max) ? range.min : range.max;
        this._max = (range.min > range.max) ? range.min : range.max;
    }

    private normalize() {
        if (!isNumber(this._min)) {
            this.min = 0;
        }
        if (!isNumber(this._max)) {
            this.max = 0;
        }
    }

    get min(): number {
        return this._min;
    }

    set min(value: number) {
        if (!isNumber(value)) {
            value = 0;
        }
        this._min = (value < this.max) ? value : this.max;
        this.emit("change");
    }

    get max(): number {
        return this._max;
    }

    set max(value: number) {
        if (!isNumber(value)) {
            value = 0;
        }
        this._max = (value > this.min) ? value : this.min;
        this.emit("change");
    }

    get range(): IRange {
        return {
            min: this.min,
            max: this.max
        }
    }

    set range(value: IRange) {
        if (!isNumber(value.min)) {
            value.min = 0;
        }
        if (!isNumber(value.max)) {
            value.max = 0;
        }
        this._min = (value.min <= value.max) ? value.min : value.max;
        this._max = (value.max > value.min)  ? value.max : value.min;
        this.emit("change");
    }

    get length(): number {
        return this.max - this.min;
    }

}
