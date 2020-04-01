import EventEmitter from '../../classes/EventEmitter';
import SliderType from '../../types/SliderType';

interface IViewModelData {
  minHandlePosition?: number;
  maxHandlePosition?: number;
  minHandleValue?: number;
  maxHandleValue?: number;
  scaleMin?: number;
  scaleMax?: number;
  scaleStep?: number;
  isRange?: boolean;
  areTooltipsVisible?: boolean;
  isScaleVisible?: boolean;
  isReverseDirection?: boolean;
  type?: SliderType;
  units?: string;
}

class ViewModel extends EventEmitter {
  public scaleMin: number;

  public scaleMax: number;

  public scaleStep: number;

  public minHandleValue: number;

  public maxHandleValue: number;

  public minHandlePosition: number;

  public maxHandlePosition: number;

  private typeValue: SliderType;

  private isIRangeValue: boolean;

  private isScaleVisibleValue: boolean;

  private isReverseDirectionValue: boolean;

  private areTooltipsVisibleValue: boolean;

  public unitsValue: string;

  constructor() {
    super();
    this.scaleMin = 0;
    this.scaleMax = 1;
    this.scaleStep = 1;
    this.minHandleValue = 0;
    this.maxHandleValue = 1;
    this.minHandlePosition = 0;
    this.maxHandlePosition = 1;
    this.typeValue = 'horizontal';
    this.isIRangeValue = true;
    this.isScaleVisibleValue = true;
    this.isReverseDirectionValue = false;
    this.areTooltipsVisibleValue = true;
    this.unitsValue = '';
  }

  get rangeLength(): number {
    return this.maxHandlePosition - this.minHandlePosition;
  }

  get type(): SliderType {
    return this.typeValue;
  }

  set type(value: SliderType) {
    const sliderTypes = ['horizontal', 'vertical'];
    this.typeValue = (sliderTypes.indexOf(value) > -1) ? value : sliderTypes[0] as SliderType;
    this.emit('change', 'type');
  }

  get isRange(): boolean {
    return this.isIRangeValue;
  }

  set isRange(value: boolean) {
    this.isIRangeValue = Boolean(value);
    if (value === false) {
      this.minHandlePosition = 0;
      this.emit('change', 'min');
    }
    this.emit('change', 'isRange');
  }

  get isScaleVisible(): boolean {
    return this.isScaleVisibleValue;
  }

  set isScaleVisible(value: boolean) {
    this.isScaleVisibleValue = Boolean(value);
    this.emit('change', 'isScaleVisible');
  }

  get isReverseDirection(): boolean {
    return this.isReverseDirectionValue;
  }

  set isReverseDirection(value: boolean) {
    this.isReverseDirectionValue = (typeof value === 'boolean') ? value : false;
    this.emit('change', 'isReverseDirection');
  }

  get areTooltipsVisible(): boolean {
    return this.areTooltipsVisibleValue;
  }

  set areTooltipsVisible(value: boolean) {
    this.areTooltipsVisibleValue = Boolean(value);
    this.emit('change', 'areTooltipsVisible');
  }

  get units(): string {
    return this.unitsValue;
  }

  set units(value: string) {
    this.unitsValue = value;
    this.emit('change', 'units');
  }

  get data(): IViewModelData {
    const {
      type, isRange, isScaleVisible, isReverseDirection, areTooltipsVisible, units,
    } = this;
    return {
      type,
      isRange,
      isScaleVisible,
      isReverseDirection,
      areTooltipsVisible,
      units,
    };
  }

  set data(value: IViewModelData) {
    type ViewModelKey = keyof IViewModelData;

    this.disableEmitting();
    Object.keys(value).forEach((key: ViewModelKey) => {
      if (this[key] !== undefined) {
        (this[key] as number | string | boolean | SliderType) = value[key];
      }
    });
    this.enableEmitting();
    this.emit('change');
  }
}

export default ViewModel;
