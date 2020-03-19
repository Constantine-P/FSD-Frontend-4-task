import ElementView from './ElementView';
import createElement from '../../functions/createElement';

class HandleView extends ElementView {
  private tooltip: HTMLDivElement;

  constructor(options) {
    super(options);
    this.addTooltip();
  }

  public set tooltipValue(value: string | number) {
    this.tooltip.textContent = `${value}`;
  }

  public showTooltip(): void {
    this.tooltip.classList.remove('hidden');
  }

  public hideTooltip(): void {
    this.tooltip.classList.add('hidden');
  }

  public get tooltipSize(): number {
    return this.tooltip.getBoundingClientRect()[this.size];
  }

  public set tooltipTranslateValue(value: number | null) {
    if (value === null && this.tooltip.style.transform === '') {
      return;
    }
    if (value === null) {
      this.tooltip.style.transform = '';
      return;
    }
    const translate = this.size === 'width' ? 'translateX' : 'translateY';
    const sign = (this.side === 'top' || this.side === 'left') ? 1 : -1;
    this.tooltip.style.transform = `${translate}(${(-0.5 + sign * value) * 100}%)`;
  }

  private addTooltip(): void {
    this.tooltip = createElement('tooltip');
    this.tooltip.textContent = '0';
    this.element.append(this.tooltip);
  }
}

export default HandleView;
