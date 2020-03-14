import EventEmitter from '../../classes/EventEmitter';
import { SliderType } from '../../types/SliderType';
import RangeValue from '../../interfaces/RangeValue';
import minMax from '../../functions/minMax';

class ViewModel extends EventEmitter {
  public positions: number[];

  public values: number[];

  private _minHandlePosition: number;

  private _maxHandlePosition: number;

  private _type: SliderType;

  private _isRange: boolean;

  private _isScaleVisible: boolean;

  private _isReverseDirection: boolean;

  private _areTooltipsVisible: boolean;

  constructor() {
    super();
    this.positions = [];
    this.values = [];
    this._minHandlePosition = 0;
    this._maxHandlePosition = 1;
    this._type = 'horizontal';
    this._isRange = true;
    this._isScaleVisible = true;
    this._isReverseDirection = false;
    this._areTooltipsVisible = true;
  }

  public get minHandleValue(): number {
    return this.values[this.positions.indexOf(this._minHandlePosition)];
  }

  public get maxHandleValue(): number {
    return this.values[this.positions.indexOf(this.maxHandlePosition)];
  }

  public get rangeLength(): number {
    return this.maxHandlePosition - this.minHandlePosition;
  }

  public get minHandlePosition(): number {
    return this._minHandlePosition;
  }

  public set minHandlePosition(value) {
    this._minHandlePosition = minMax(0, Number(value), 1);
  }

  public get maxHandlePosition(): number {
    return this._maxHandlePosition;
  }

  public set maxHandlePosition(value) {
    this._maxHandlePosition = minMax(0, Number(value), 1);
  }

  public get type(): SliderType {
    return this._type;
  }

  public set type(value: SliderType) {
    const sliderTypes = ['horizontal', 'vertical'];
    this._type = (sliderTypes.indexOf(value) > -1) ? value : sliderTypes[0] as SliderType;
    this.emit('change');
  }

  public get isRange(): boolean {
    return this._isRange;
  }

  public set isRange(value: boolean) {
    this._isRange = Boolean(value);
    this.emit('change');
  }

  public get isScaleVisible(): boolean {
    return this._isScaleVisible;
  }

  public set isScaleVisible(value: boolean) {
    this._isScaleVisible = Boolean(value);
    this.emit('change');
  }

  public get isReverseDirection(): boolean {
    return this._isReverseDirection;
  }

  public set isReverseDirection(value: boolean) {
    this._isReverseDirection = (typeof value === 'boolean') ? value : false;
    this.emit('change');
  }

  public get areTooltipsVisible(): boolean {
    return this._areTooltipsVisible;
  }

  public set areTooltipsVisible(value: boolean) {
    this._areTooltipsVisible = Boolean(value);
    this.emit('change');
  }

  public get data(): Data {
    const {
      positions, values, minHandlePosition, maxHandlePosition,
      type, isRange, isScaleVisible, isReverseDirection, areTooltipsVisible,
    } = this;
    return {
      positions,
      values,
      minHandlePosition,
      maxHandlePosition,
      type,
      isRange,
      isScaleVisible,
      isReverseDirection,
      areTooltipsVisible,
    };
  }

  public set data(value: Data) {
    this.disableEmitting();
    Object.keys(value).forEach((key) => {
      if (this[key] !== undefined) {
        this[key] = value[key];
      }
    });
    this.enableEmitting();
    this.emit('change');
  }

  public get dataToModel(): DataToModel {
    return {
      relRange: {
        min: this.minHandlePosition,
        max: this.maxHandlePosition,
      },
      isRange: this.isRange,
    };
  }
}

interface Data {
  positions?: number[];
  values?: number[];
  minHandlePosition?: number;
  maxHandlePosition?: number;
  type?: SliderType;
  isRange?: boolean;
  isScaleVisible?: boolean;
  isReverseDirection?: boolean;
  areTooltipsVisible?: boolean;
}

interface DataToModel {
  relRange: RangeValue;
  isRange: boolean;
}

export default ViewModel;
