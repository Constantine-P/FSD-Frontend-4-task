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

  private addTooltip(): void {
    this.tooltip = createElement('tooltip');
    this.tooltip.textContent = '0';
    this.element.append(this.tooltip);
  }
}

export default HandleView;
