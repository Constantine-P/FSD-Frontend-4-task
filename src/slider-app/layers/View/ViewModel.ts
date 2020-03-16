import EventEmitter from '../../classes/EventEmitter';
import { SliderType } from '../../types/SliderType';
import TransmittedData from '../../interfaces/TransmittedData';

class ViewModel extends EventEmitter {
  public scaleMin: number;

  public scaleMax: number;

  public scaleStep: number;

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
    this.scaleMin = 0;
    this.scaleMax = 1;
    this.scaleStep = 1;
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

  get rangeLength(): number {
    return this.maxHandlePosition - this.minHandlePosition;
  }

  get type(): SliderType {
    return this._type;
  }

  set type(value: SliderType) {
    const sliderTypes = ['horizontal', 'vertical'];
    this._type = (sliderTypes.indexOf(value) > -1) ? value : sliderTypes[0] as SliderType;
    this.emit('change', 'type');
  }

  get isRange(): boolean {
    return this._isRange;
  }

  set isRange(value: boolean) {
    this._isRange = Boolean(value);
    this.emit('change', 'isRange');
  }

  get isScaleVisible(): boolean {
    return this._isScaleVisible;
  }

  set isScaleVisible(value: boolean) {
    this._isScaleVisible = Boolean(value);
    this.emit('change', 'isScaleVisible');
  }

  get isReverseDirection(): boolean {
    return this._isReverseDirection;
  }

  set isReverseDirection(value: boolean) {
    this._isReverseDirection = (typeof value === 'boolean') ? value : false;
    this.emit('change', 'isReverseDirection');
  }

  get areTooltipsVisible(): boolean {
    return this._areTooltipsVisible;
  }

  set areTooltipsVisible(value: boolean) {
    this._areTooltipsVisible = Boolean(value);
    this.emit('change', 'areTooltipsVisible');
  }

  get data(): TransmittedData {
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

  set data(value: TransmittedData) {
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
