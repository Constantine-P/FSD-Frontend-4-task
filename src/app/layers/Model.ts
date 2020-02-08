import EventEmitter from "../classes/EventEmitter";
import Scale from "../classes/Scale";
import Range from "../classes/Range";
import minMax from "../functions/minMax";
import ISliderOptions from "../interfaces/ISliderOptions";
import IRange from "../interfaces/IRange";
import IScale from "../interfaces/IScale";

export default class Model extends EventEmitter {
    private _range: Range;
    private _scale: Scale;

    constructor(options: ISliderOptions) {
        super();
        let defaultOptions = {
            range: {
                min: 0,
                max: 100
            },
            scale: {
                min: 0,
                max: 100,
                steps: "1"
            }
        };
        Object.assign(defaultOptions, options);
        this._scale = new Scale();
        this._range = new Range();

        this.init(options);
    }

    private init(options) {
        this._range = new Range(options.range);
        this._scale = new Scale(options.scale);
    }

    get range() {
        return this._range;
    }

    set range(range: IRange) {
        this._range.min = minMax(
            this.scale.min,
            range.min,
            Math.min(this._range.max, this.scale.max)
        );
        this._range.max = minMax(
            Math.max(this._range.min, this.scale.min),
            range.max,
            this.scale.max
        );
        this.emit("change");
    }

    get relRange() {
        return {
            min: (this.range.min - this.scale.min) / (<Scale>this.scale).length,
            max: (this.range.max - this.scale.min) / (<Scale>this.scale).length,
        };
    }

    set relRange(range: IRange) {
        range.min = minMax(0, range.min, 1);
        range.max = minMax(0, range.max, 1);
        this.range.min = range.min * (<Scale>this.scale).length + this.scale.min;
        this.range.max = range.max * (<Scale>this.scale).length + this.scale.min;
        this.emit('change');
    }

    get scale(): IScale | Scale {
        return this._scale;
    }

    set scale(scale: IScale | Scale) {
        if (scale instanceof Scale) {
            this._scale = scale;
        }
        this._scale.min   = scale.min;
        this._scale.max   = scale.max;
        if (scale.steps !== undefined) this._scale.steps = scale.steps;
        this.emit('change');
    }

    get exportedData() {
        return {
            min: this.range.min,
            max: this.range.max,
        }
    }
}