import EventEmitter from '../../classes/EventEmitter';
import SliderOptions from '../../interfaces/SliderOptions';
import DEFAULT_VIEW_OPTIONS from './DEFAULT_VIEW_OPTIONS';
import LinearScaleView from './LinearScaleView';
import ElementView from './ElementView';
import HandleView from './HandleView';
import ViewModel from './ViewModel';

class View extends EventEmitter {
  private readonly slider: HTMLElement;

  private scale: LinearScaleView;

  private minHandle: HandleView;

  private maxHandle: HandleView;

  private rangeLine: ElementView;

  public model: ViewModel;

  constructor(slider: HTMLElement, options: SliderOptions) {
    super();
    this.slider = slider;
    this.init(options);
    this.addHandlers();
  }

  private init(options): void {
    this.model = new ViewModel();

    Object.assign(DEFAULT_VIEW_OPTIONS, options);

    this.model.data = options;

    this.scale = new LinearScaleView({
      container: this.slider,
      side: this.side,
      size: this.size,
    });

    this.minHandle = new HandleView({
      container: this.scale.element,
      name: 'handle',
      position: 0,
      side: this.side,
      size: this.size,
    });

    this.maxHandle = new HandleView({
      container: this.scale.element,
      name: 'handle',
      position: 1,
      side: this.side,
      size: this.size,
    });

    this.rangeLine = new ElementView({
      container: this.scale.element,
      name: 'rangeLine',
      position: 0,
      length: 1,
      side: this.side,
      size: this.size,
    });
  }

  private addHandlers(): void {
    const handleScaleMouseDown = (position): void => {
      [this.minHandle, this.maxHandle, this.rangeLine].forEach((item) => item.transitionOn());
      this.updateHandlesPosition(position);
    };

    const handleScaleMouseMove = (position): void => {
      [this.minHandle, this.maxHandle, this.rangeLine].forEach((item) => item.transitionOff());
      this.updateHandlesPosition(position);
    };

    const handleModelChange = (): void => {
      this.update();
    };

    this.scale.on('scaleMouseDown', handleScaleMouseDown);
    this.scale.on('scaleMouseMove', handleScaleMouseMove);
    this.model.on('change', handleModelChange);
  }

  private get side(): string {
    const { type, isReverseDirection } = this.model;
    return (type === 'horizontal')
      ? (isReverseDirection) ? 'right' : 'left'
      : (isReverseDirection) ? 'top' : 'bottom';
  }

  private get size(): string {
    return (this.model.type === 'horizontal') ? 'width' : 'height';
  }

  private update(): void {
    this.alignSliderCSSClass();
    this.alignElementsVisibility();
    this.updateElementsSideAndSize();
    this.updateElementsByModel();
    this.scale.renderValues();
  }

  private alignSliderCSSClass(): void {
    ['horizontal', 'horizontal-reverse', 'vertical', 'vertical-reverse']
      .forEach((item) => this.slider.classList.remove(`slider_${item}`));
    if (this.model.type === 'vertical') {
      this.slider.classList.add('slider_vertical');
      if (this.model.isReverseDirection) this.slider.classList.add('slider_vertical-reverse');
    }
    if (this.model.type === 'horizontal') {
      this.slider.classList.add('slider_horizontal');
      if (this.model.isReverseDirection) this.slider.classList.add('slider_horizontal-reverse');
    }
  }

  private alignElementsVisibility(): void {
    const enableRange = (): void => {
      this.minHandle.show();
    };

    const disableRange = (): void => {
      this.minHandle.hide();
      this.model.minHandlePosition = 0;
    };

    const showTooltips = (): void => {
      this.minHandle.showTooltip();
      this.maxHandle.showTooltip();
    };

    const hideTooltips = (): void => {
      this.minHandle.hideTooltip();
      this.maxHandle.hideTooltip();
    };

    const { isRange, isScaleVisible, areTooltipsVisible } = this.model;
    if (isRange) enableRange(); else disableRange();
    if (areTooltipsVisible) showTooltips(); else hideTooltips();
    this.scale.areValuesVisible = isScaleVisible;
  }

  private updateElementsSideAndSize(): void {
    ['minHandle', 'maxHandle', 'rangeLine', 'scale'].forEach((name) => {
      this[name].side = this.side;
      this[name].size = this.size;
      if (name !== 'scale') this[name].update();
    });
  }

  private updateElementsByModel(): void {
    this.scale.model = this.model;
    this.minHandle.position = this.model.minHandlePosition;
    this.maxHandle.position = this.model.maxHandlePosition;
    this.rangeLine.position = this.model.minHandlePosition;
    this.rangeLine.length = this.model.rangeLength;
    this.minHandle.tooltipValue = this.model.minHandleValue;
    this.maxHandle.tooltipValue = this.model.maxHandleValue;
  }

  private updateHandlesPosition(position): void {
    const distanceToMin = Math.abs(position - this.minHandle.position);
    const distanceToMax = Math.abs(position - this.maxHandle.position);
    if (distanceToMin < distanceToMax && this.model.isRange) {
      this.model.minHandlePosition = position;
    } else {
      this.model.maxHandlePosition = position;
    }
    this.emit('change-by-click');
  }
}

export default View;
