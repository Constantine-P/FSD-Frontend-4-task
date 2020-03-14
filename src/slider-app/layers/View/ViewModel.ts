import EventEmitter from '../../classes/EventEmitter';
import { SliderType } from '../../types/SliderType';
import TransmittedData from '../../interfaces/TransmittedData';

class ViewModel extends EventEmitter {
  public positions: number[];

  public values: number[];

  public minHandleValue: number;

  public maxHandleValue: number;

  public minHandlePosition: number;

  public maxHandlePosition: number;

  private _type: SliderType;

  private _isRange: boolean;

  private _isScaleVisible: boolean;

  private _isReverseDirection: boolean;

  private _areTooltipsVisible: boolean;

  constructor() {
    super();
    this.positions = [];
    this.values = [];
    this.minHandleValue = 0;
    this.maxHandleValue = 1;
    this.minHandlePosition = 0;
    this.maxHandlePosition = 1;
    this._type = 'horizontal';
    this._isRange = true;
    this._isScaleVisible = true;
    this._isReverseDirection = false;
    this._areTooltipsVisible = true;
  }

  public get rangeLength(): number {
    return this.maxHandlePosition - this.minHandlePosition;
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

  public get data(): TransmittedData {
    const {
      type, isRange, isScaleVisible, isReverseDirection, areTooltipsVisible,
    } = this;
    return {
      type,
      isRange,
      isScaleVisible,
      isReverseDirection,
      areTooltipsVisible,
    };
  }

  public set data(value: TransmittedData) {
    this.disableEmitting();
    Object.keys(value).forEach((key) => {
      if (this[key] !== undefined) {
        this[key] = value[key];
      }
    });
    this.enableEmitting();
    this.emit('change');
  }
}

export default ViewModel;
