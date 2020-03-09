import LinearScaleView from './LinearScaleView';
import DEFAULT_VIEW_OPTIONS from './DEFAULT_VIEW_OPTIONS';
import EventEmitter from '../../classes/EventEmitter';
import SliderOptions from '../../interfaces/SliderOptions';
import ViewOptions from '../../interfaces/ViewOptions';
import HandleView from './HandleView';
import ElementView from './ElementView';

class View extends EventEmitter {
  private readonly slider: HTMLElement;

  private scale: LinearScaleView;

  private minHandle: HandleView;

  private maxHandle: HandleView;

  private rangeLine: ElementView;

  private viewOptions: ViewOptions;

  public model: {
    positions: number[];
    values: number[];
    positionRange: { min: number; max: number };
    getValueRange(): { min: number; max: number };
    getRangeLength(): number;
  };

  constructor(slider: HTMLElement, options: SliderOptions) {
    super();
    this.slider = slider;
    this.init(options);
    this.scale.on('scaleMouseDown', this.handleScaleMouseDown.bind(this));
    this.scale.on('scaleMouseMove', this.handleScaleMouseMove.bind(this));
  }

  public get range(): { min: number; max: number } {
    return this.model.positionRange;
  }

  public set range(value: { min: number; max: number }) {
    this.model.positionRange = value;
    this.updateElementsByModel();
    this.scale.renderValues();
  }

  public get options(): ViewOptions {
    return this.viewOptions;
  }

  public set options(value) {
    Object.keys(this.viewOptions).forEach((key) => {
      if (value[key] !== undefined) {
        this.viewOptions[key] = value[key];
      }
    });
    this.alignSliderCSSClass();
    this.alignElementsVisibility();
    this.updateElementsSideAndSize();
    this.scale.renderValues();
    this.emit('options-change');
  }

  private init(options): void {
    this.model = {
      positions: [],
      values: [],
      positionRange: { min: 0, max: 1 },
      getValueRange: (): { min: number; max: number } => ({
        min: this.model.values[this.model.positions.indexOf(this.model.positionRange.min)],
        max: this.model.values[this.model.positions.indexOf(this.model.positionRange.max)],
      }),
      getRangeLength: (): number => this.model.positionRange.max - this.model.positionRange.min,
    };

    Object.assign(DEFAULT_VIEW_OPTIONS, options);

    const {
      type, isRange, isScaleVisible, areTooltipsVisible, isReverseDirection,
    } = options;

    this.viewOptions = {
      type, isRange, isScaleVisible, areTooltipsVisible, isReverseDirection,
    };

    this.scale = new LinearScaleView({
      container: this.slider,
      side: 'left',
      size: 'width',
    });

    this.minHandle = new HandleView({
      container: this.scale.element,
      name: 'handle',
      position: 0,
      side: 'left',
      size: 'width',
    });

    this.maxHandle = new HandleView({
      container: this.scale.element,
      name: 'handle',
      position: 1,
      side: 'left',
      size: 'width',
    });

    this.rangeLine = new ElementView({
      container: this.scale.element,
      name: 'rangeLine',
      position: 0,
      length: 1,
      side: 'left',
      size: 'width',
    });
  }

  private enableRange(): void {
    this.minHandle.show();
  }

  private disableRange(): void {
    this.minHandle.hide();
    this.model.positionRange.min = 0;
  }

  private showTooltips(): void {
    this.minHandle.showTooltip();
    this.maxHandle.showTooltip();
  }

  private hideTooltips(): void {
    this.minHandle.hideTooltip();
    this.maxHandle.hideTooltip();
  }

  private update(): void {

  }

  private alignElementsVisibility(): void {
    const { isRange, isScaleVisible, areTooltipsVisible } = this.options;
    if (isRange) this.enableRange(); else this.disableRange();
    if (areTooltipsVisible) this.showTooltips(); else this.hideTooltips();
    this.scale.areValuesVisible = isScaleVisible;
  }

  private updateElementsSideAndSize(): void {
    ['minHandle', 'maxHandle', 'rangeLine', 'scale'].forEach((name) => {
      this[name].side = this.side;
      this[name].size = this.size;
      if (name !== 'scale') this[name].update();
    });
  }

  private get side(): string {
    const { type, isReverseDirection } = this.options;
    return (type === 'horizontal')
      ? (isReverseDirection) ? 'right' : 'left'
      : (isReverseDirection) ? 'top' : 'bottom';
  }

  private get size(): string {
    return (this.options.type === 'horizontal') ? 'width' : 'height';
  }

  private updateElementsByModel(): void {
    this.scale.model = this.model;
    this.minHandle.position = this.model.positionRange.min;
    this.maxHandle.position = this.model.positionRange.max;
    this.rangeLine.position = this.model.positionRange.min;
    this.rangeLine.length = this.model.getRangeLength();
    this.minHandle.tooltipValue = this.model.getValueRange().min;
    this.maxHandle.tooltipValue = this.model.getValueRange().max;
  }

  private alignSliderCSSClass(): void {
    ['horizontal', 'horizontal-reverse', 'vertical', 'vertical-reverse']
      .forEach((item) => this.slider.classList.remove(`slider_${item}`));
    if (this.options.type === 'vertical') {
      this.slider.classList.add('slider_vertical');
      if (this.options.isReverseDirection) this.slider.classList.add('slider_vertical-reverse');
    }
    if (this.options.type === 'horizontal') {
      this.slider.classList.add('slider_horizontal');
      if (this.options.isReverseDirection) this.slider.classList.add('slider_horizontal-reverse');
    }
  }

  private handleScaleMouseDown(position): void {
    [this.minHandle, this.maxHandle, this.rangeLine].forEach((item) => item.transitionOn());
    this.updateHandlesPosition(position);
    this.emit('change');
  }

  private handleScaleMouseMove(position): void {
    [this.minHandle, this.maxHandle, this.rangeLine].forEach((item) => item.transitionOff());
    this.updateHandlesPosition(position);
    this.emit('change');
  }

  private updateHandlesPosition(position): void {
    const distanceToMin = Math.abs(position - this.minHandle.position);
    const distanceToMax = Math.abs(position - this.maxHandle.position);
    if (distanceToMin < distanceToMax && this.options.isRange) {
      this.model.positionRange.min = position;
    } else {
      this.model.positionRange.max = position;
    }
  }
}

export default View;
