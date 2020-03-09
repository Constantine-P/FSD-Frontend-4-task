import EventEmitter from '../../classes/EventEmitter';
import createElement from '../../functions/createElement';
import getClickCoordsRelativeToBlock from '../../functions/getClickCoordsRelativeToBlock';

type side = 'top' | 'bottom' | 'left' | 'right';
type size = 'width' | 'height';

class LinearScaleView extends EventEmitter {
  private _element: HTMLDivElement;

  private scaleValues: HTMLDivElement;

  public side: side;

  public size: size;

  public areValuesVisible: boolean;

  public model: { positions: number[]; values: number[] };

  constructor(options) {
    super();
    const { container, side, size } = options;
    this.side = side;
    this.size = size;
    this.areValuesVisible = true;
    this.model = { positions: [], values: [] };
    this.addElements(container);
    this.addHandlers();
  }

  public get element(): HTMLDivElement {
    return this._element;
  }

  private addElements(container): void {
    this._element = createElement('scale');
    ['scaleLine', 'scaleValues'].forEach((item) => {
      this[item] = createElement(item);
      this.element.append(this[item]);
    });
    container.append(this.element);
  }

  private addHandlers(): void {
    const handleMouseDown = (e): void => {
      this.emit('scaleMouseDown', this.getPosition(e));

      const handleMouseMove = (event): void => {
        this.emit('scaleMouseMove', this.getPosition(event));
      };

      const handleMouseUp = (): void => {
        window.removeEventListener('mousemove', handleMouseMove);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };
    this.element.addEventListener('mousedown', handleMouseDown);
  }

  private getPosition(e): number {
    return getClickCoordsRelativeToBlock(e, this.element)[this.side];
  }

  public renderValues(): void {
    this.scaleValues.innerHTML = '';
    if (!this.areValuesVisible) return;
    this.model.positions.forEach((item, i) => {
      const value = createElement('scaleValue');
      value.style[this.side] = `${item * 100}%`;
      value.textContent = `${this.model.values[i]}`;
      this.scaleValues.append(value);
    });
  }
}

export default LinearScaleView;
