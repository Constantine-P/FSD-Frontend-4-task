import LinearScaleView from './LinearScaleView';
import HandleView from './HandleView';
import ViewModel from './ViewModel';
import EventEmitter from '../../classes/EventEmitter';
import ISliderOptions from '../../interfaces/ISliderOptions';
import Side from '../../types/Side';
import Size from '../../types/Size';
import minMax from '../../functions/minMax';
import DEFAULT_SLIDER_OPTIONS from '../../DEFAULT_SLIDER_OPTIONS';
import RangeLineView from './RangeLineView';

class View extends EventEmitter {
  private readonly slider: HTMLElement;

  private scale: LinearScaleView;

  private minHandle: HandleView;

  private maxHandle: HandleView;

  private rangeLine: RangeLineView;

  public model: ViewModel;

  constructor(slider: HTMLElement, options: ISliderOptions) {
    super();
    this.slider = slider;
    this.init(options);
    this.addHandlers();
  }

  private init(options: ISliderOptions): void {
    this.model = new ViewModel();
    this.model.data = { ...DEFAULT_SLIDER_OPTIONS, ...options };

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

    this.rangeLine = new RangeLineView({
      container: this.scale.element,
      name: 'rangeLine',
      position: 0,
      length: 1,
      side: this.side,
      size: this.size,
    });
  }

  private addHandlers(): void {
    const handleScaleMouseDown = (position: number): void => {
      [this.minHandle, this.maxHandle, this.rangeLine].forEach((item) => item.transitionOn());
      this.updateHandlesPosition(position);
    };

    const handleScaleMouseMove = (position: number): void => {
      const pos = minMax(0, position, 1);
      [this.minHandle, this.maxHandle, this.rangeLine].forEach((item) => item.transitionOff());
      this.updateHandlesPosition(pos);
    };

    const handleModelChange = (name: string): void => {
      this.update();
      if (['type', 'isScaleVisible', 'isReverseDirection'].indexOf(name) > -1) this.updateScale();
      this.emit('change', name);
    };

    const handleWindowResize = (): void => {
      this.updateScale();
      this.alignTooltips();
    };

    this.scale.on('scaleMouseDown', handleScaleMouseDown);
    this.scale.on('scaleMouseMove', handleScaleMouseMove);
    this.model.on('change', handleModelChange);
    window.addEventListener('resize', handleWindowResize);
  }

  private get side(): Side {
    const { type, isReverseDirection } = this.model;
    return (type === 'horizontal')
      ? (isReverseDirection) ? 'right' : 'left'
      : (isReverseDirection) ? 'top' : 'bottom';
  }

  private get size(): Size {
    return (this.model.type === 'horizontal') ? 'width' : 'height';
  }

  private update(): void {
    this.alignSliderCSSClass();
    this.alignElementsVisibility();
    this.updateElementsSideAndSize();
    this.updateElementsByModel();
    this.alignTooltips();
  }

  public updateScale(): void {
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
    const {
      minHandle, maxHandle, rangeLine, scale,
    } = this;
    [minHandle, maxHandle, rangeLine].forEach((item) => {
      const name = item;
      name.side = this.side;
      name.size = this.size;
      name.update();
    });
    scale.side = this.side;
    scale.size = this.size;
  }

  private updateElementsByModel(): void {
    const {
      minHandlePosition, maxHandlePosition, rangeLength, minHandleValue, maxHandleValue, units,
      isRange,
    } = this.model;
    this.scale.model = this.model;
    this.minHandle.position = minHandlePosition;
    this.maxHandle.position = maxHandlePosition;
    this.rangeLine.position = minHandlePosition;
    this.rangeLine.length = rangeLength;
    if (isRange) {
      this.minHandle.tooltipValue = `${minHandleValue.toLocaleString('ru-RU')}${(units ? '\xa0' : '')}${units}`;
    }
    this.maxHandle.tooltipValue = `${maxHandleValue.toLocaleString('ru-RU')}${(units ? '\xa0' : '')}${units}`;
  }

  private updateHandlesPosition(position: number): void {
    const distanceToMin = Math.abs(position - this.minHandle.position);
    const distanceToMax = Math.abs(position - this.maxHandle.position);
    if (distanceToMin < distanceToMax && this.model.isRange) {
      this.model.minHandlePosition = position;
      this.emit('change', 'min');
    } else {
      this.model.maxHandlePosition = position;
      this.emit('change', 'max');
    }
  }

  private alignTooltips(): void {
    const scaleSize = Number(this.scale.element.getBoundingClientRect()[this.size]);
    const distanceBetweenHandles = (this.model.maxHandlePosition - this.model.minHandlePosition)
      * scaleSize;
    const tooltipValueSize = (this.minHandle.tooltipSize + this.maxHandle.tooltipSize) * 0.5;
    const gap = 0.1;
    const overlayValue = (distanceBetweenHandles - tooltipValueSize) / tooltipValueSize - gap;

    if (overlayValue < 0 && this.model.isRange) {
      this.minHandle.tooltipTranslateValue = overlayValue / 2;
      this.maxHandle.tooltipTranslateValue = -overlayValue / 2;
    } else {
      this.minHandle.tooltipTranslateValue = null;
      this.maxHandle.tooltipTranslateValue = null;
    }
  }
}

export default View;
