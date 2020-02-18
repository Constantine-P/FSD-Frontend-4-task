import ViewModel from './ViewModel';
import EventEmitter from '../classes/EventEmitter';
import SliderOptions from '../interfaces/SliderOptions';
import SliderElements from '../interfaces/SliderElements';
import DirectionStyles from '../interfaces/DirectionStyles';
import getClickCoordsRelativeToBlock from '../functions/getClickCoordsRelativeToBlock';
import camelToKebab from '../functions/camelToKebab';
import toPercent from '../functions/toPercent';

class View extends EventEmitter {
  private readonly _slider: HTMLElement;

  private readonly _elements: SliderElements;

  readonly model: ViewModel;

  constructor(slider: HTMLElement, options: SliderOptions) {
    super();
    this._slider = slider;
    this._elements = {
      minHandle: null,
      maxHandle: null,
      scaleLine: null,
      rangeLine: null,
      minTooltip: null,
      maxTooltip: null,
      scaleValues: null,
    };

    const defaultOptions = {
      type: 'horizontal',
      isRange: false,
      areTooltipsVisible: true,
      isScaleVisibleValues: true,
      isReverseDirection: false,
    };
    Object.assign(defaultOptions, options);

    this.model = new ViewModel(options);
    this.addSliderElements();
    this.alignElementsVisibility();
    this.addSliderClickEventHandlers();
  }

  private addSliderElements(): void {
    const sliderInner = document.createElement('div');
    sliderInner.classList.add('slider-inner');
    this._slider.append(sliderInner);

    Object.keys(this._elements).forEach((elem) => {
      this._elements[elem] = document.createElement('div');
      this._elements[elem].classList.add(camelToKebab(elem));
      sliderInner.append(this._elements[elem]);
    });
  }

  private addSliderClickEventHandlers(): void {
    const els = this._elements;
    const transition = getComputedStyle(els.maxHandle).transitionDuration;

    const moveHandler = (e: MouseEvent): void => {
      this.updateModelRelRange(e);
      this.render();
    };

    const targets = [els.minHandle, els.maxHandle, els.scaleLine, els.rangeLine];

    const clickHandler = (e): void => {
      if (targets.indexOf(e.target as HTMLElement) !== -1) {
        moveHandler(e);
      }
    };

    this._slider.addEventListener('click', clickHandler);

    const mouseDownHandler = (e): void => {
      if (targets.indexOf(e.target as HTMLElement) !== -1) {
        this.elementsTransition = '0ms';
        this._slider.addEventListener('mousemove', moveHandler);
      }
    };

    const mouseUpHandler = (): void => {
      this._slider.removeEventListener('mousemove', moveHandler);
      this.elementsTransition = transition;
    };

    this._slider.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);
  }

  private clearElementsStyles(): void {
    Object.keys(this._elements).forEach((el) => {
      ['width', 'height', 'transform', 'top', 'bottom', 'left', 'right'].forEach((style) => {
        this._elements[el].style[style] = '';
      });
    });
  }

  private alignElementsStyles(): void {
    const setStyle = (el: string, style: string, value: string): void => {
      this._elements[el].style[style] = value;
    };
    const min = toPercent(this.model.relRange.min);
    const max = toPercent(this.model.relRange.max);
    const length = toPercent(this.model.relRange.max - this.model.relRange.min);
    const { position, size } = this.dirStyles;
    const { tooltipTransform, handleTransform } = this.dirStyles;

    setStyle('minHandle', position, min);
    setStyle('minTooltip', position, min);
    setStyle('maxTooltip', position, max);
    this._elements.minTooltip.textContent = `${this.model.range.min}`;
    this._elements.maxTooltip.textContent = `${this.model.range.max}`;
    setStyle('rangeLine', position, (this.model.isRange) ? min : '0');
    setStyle('rangeLine', size, (this.model.isRange) ? length : max);
    setStyle('maxHandle', position, max);
    setStyle('minHandle', 'transform', handleTransform);
    setStyle('maxHandle', 'transform', handleTransform);
    setStyle('minTooltip', 'transform', tooltipTransform);
    setStyle('maxTooltip', 'transform', tooltipTransform);
  }

  private alignElementsVisibility(): void {
    const hide = (el: string): void => this._elements[el].classList.add('hidden');
    const show = (el: string): void => this._elements[el].classList.remove('hidden');
    const isMinTooltipVisible = this.model.isRange && this.model.areTooltipsVisible;

    if (this.model.areTooltipsVisible) show('maxTooltip'); else hide('maxTooltip');
    if (isMinTooltipVisible) show('minTooltip'); else hide('minTooltip');
    if (this.model.isRange) show('minHandle'); else hide('minHandle');
    if (this.model.isScaleVisible) show('scaleValues'); else hide('scaleValues');
  }

  private alignSliderCSSClass(): void {
    if (this.model.type === 'vertical') {
      this._slider.classList.add('slider__vertical');
      this._slider.classList.remove('slider__horizontal');
    } else
    if (this.model.type === 'horizontal') {
      this._slider.classList.add('slider__horizontal');
      this._slider.classList.remove('slider__vertical');
    }
  }

  private get dirStyles(): DirectionStyles {
    const styles: DirectionStyles = {
      position: 'top',
      size: 'height',
      handleTransform: '',
      tooltipTransform: '',
    };

    if (this.model.type === 'horizontal') {
      styles.size = 'width';

      if (this.model.isReverseDirection) {
        styles.position = 'right';
        styles.handleTransform = 'translateX(50%)';
        styles.tooltipTransform = 'translateX(50%)';
      } else {
        styles.position = 'left';
        styles.handleTransform = 'translateX(-50%)';
        styles.tooltipTransform = 'translateX(-50%)';
      }
    } else {
      styles.size = 'height';

      if (this.model.isReverseDirection) {
        styles.position = 'top';
        styles.handleTransform = 'translateY(-50%) rotate(90deg)';
        styles.tooltipTransform = 'translateY(-50%)';
      } else {
        styles.position = 'bottom';
        styles.handleTransform = 'translateY(50%) rotate(90deg)';
        styles.tooltipTransform = 'translateY(50%)';
      }
    }

    return styles;
  }

  private set elementsTransition(value) {
    Object.keys(this._elements).forEach((elem) => {
      if (this._elements[elem]) {
        this._elements[elem].style.transitionDuration = value;
      }
    });
  }

  private renderScaleValues(): void {
    this._elements.scaleValues.innerHTML = '';

    if (!this.model.isScaleVisible) return;

    this.model.scale.positions.forEach((item: number, i: number) => {
      const value = document.createElement('div');
      value.classList.add('value');
      value.textContent = this.model.scale.values[i].toString();
      value.style[this.dirStyles.position] = toPercent(item);
      value.style.transform = this.dirStyles.tooltipTransform;
      this._elements.scaleValues.append(value);
    });
  }

  private updateModelRelRange(event): void {
    const { position, size } = this.dirStyles;
    const getX = (e): number => {
      const { scaleLine } = this._elements;
      const scaleLength = scaleLine.getBoundingClientRect()[size];
      return getClickCoordsRelativeToBlock(e, scaleLine)[position] / scaleLength;
    };
    this.model.updateRelRange(getX(event));
  }

  public render(): void {
    this.alignSliderCSSClass();
    this.alignElementsVisibility();
    this.renderScaleValues();
    this.clearElementsStyles();
    this.alignElementsStyles();
  }
}

export default View;
