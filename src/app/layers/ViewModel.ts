import EventEmitter from "../classes/EventEmitter";
import Range from "../classes/Range";
import ISliderOptions from "../interfaces/ISliderOptions";
import IRange from "../interfaces/IRange";
import IViewScale from "../interfaces/IViewScale";
import ITransmittedData from "../interfaces/ITransmittedData";
import {SliderType} from "../types/SliderType";
import findClosest from "../functions/findClosest";
import minMax from "../functions/minMax";


export default class ViewModel extends EventEmitter {
    private _relRange: Range;
    private _scale: IViewScale;
    private _type: SliderType;
    private _isRange: boolean;
    private _isVisibleTooltip: boolean;
    private _isVisibleScale: boolean;
    private _isReverseDirection: boolean;
    private _range: IRange;

    constructor(options: ISliderOptions) {
        super();
        this._type = "";
        this._isRange = true;
        this._isVisibleTooltip = true;
        this._isVisibleScale = true;
        this._isReverseDirection = true;
        this._scale = { positions: [], values: [] };
        this._relRange = new Range();
        this._range = { min: 0, max: 0 };

        this.init(options);
    }

    init(options) {
        this.type               = options.type;
        this.isRange            = options.isRange;
        this.isVisibleTooltip   = options.isVisibleTooltip;
        this.isVisibleScale     = options.isVisibleScale;
        this.isReverseDirection = options.isReverseDirection;
        this.scale = { positions: [], values: [] };
        this.relRange = new Range( { min: 0, max: 1 } );
        this.range = { min: options.range.min, max: options.range.max };
    }

    get scale(): IViewScale {
        return this._scale;
    }

    set scale(value: IViewScale) {
        this._scale = value;
    }

    get relRange(): Range {
        return this._relRange;
    }

    set relRange(range: Range) {
        this._relRange.min = minMax(0, range.min, 1);
        this._relRange.max = minMax(0, range.max, 1);
    }

    get type() {
        return this._type;
    }

    set type(value: SliderType) {
        this._type = value;
        this.emit('change');
    }

    get isRange() {
        return this._isRange;
    }

    set isRange(value: boolean) {
        this._isRange = Boolean(value);
        this.emit('change');
    }

    get isVisibleTooltip() {
        return this._isVisibleTooltip;
    }

    set isVisibleTooltip(value: boolean) {
        this._isVisibleTooltip = Boolean(value);
        this.emit('change');
    }

    get isVisibleScale() {
        return this._isVisibleScale;
    }

    set isVisibleScale(value: boolean) {
        this._isVisibleScale = Boolean(value);
        this.emit('change');
    }

    get isReverseDirection() {
        return this._isReverseDirection;
    }

    set isReverseDirection(value: boolean) {
        this._isReverseDirection = Boolean(value);
        this.emit('change');
    }

    get range(): IRange {
        return this._range;
    }

    set range(value: IRange) {
        this._range = value;
    }

    get data(): ITransmittedData {
        return {
            isRange: this.isRange,
            isVisibleTooltip: this.isVisibleTooltip,
            isVisibleScale: this.isVisibleScale,
            isReverseDirection: this.isReverseDirection,
            type: this.type
        }
    }

    set data(value: ITransmittedData) {
        const fields = ["range", "relRange", "scale", "isRange", "isVisibleTooltip", "isVisibleScale",
            "isReverseDirection", "type"];

        fields.forEach(key => {
            if (value[key] !== undefined) {
                this[`_${key}`] = value[key];
            }
        });
    }

    updateRelRange(x: number) {
        const distToMin = Math.abs(this.relRange.min - x);
        const distToMax = Math.abs(this.relRange.max - x);

        if (this.scale.positions.toString() !== [].toString()) {
            x = findClosest(this.scale.positions, x);
        }

        if (this.isRange) {
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
};
