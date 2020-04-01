import EventEmitter from '../../classes/EventEmitter';
import Side from '../../types/Side';
import Size from '../../types/Size';
import createElement from '../../functions/createElement';
import getPositions from '../../functions/getPositions';
import round10 from '../../functions/round10';

interface IOptions {
  container: HTMLElement;
  side: Side;
  size: Size;
}

type Position = {
  [key in Side]: number;
};

class LinearScaleView extends EventEmitter {
  protected elementItem: HTMLElement;

  private scaleLine: HTMLElement;

  private scaleValues: HTMLElement;

  public side: Side;

  public size: Size;

  public areValuesVisible: boolean;

  public model: {
    scaleMin: number;
    scaleMax: number;
    scaleStep: number;
  };

  constructor(options: IOptions) {
    super();
    this.init(options);
    this.addHandlers();
  }

  get element(): HTMLElement {
    return this.elementItem;
  }

  public renderValues(): void {
    this.scaleValues.innerHTML = '';
    if (!this.areValuesVisible) return;

    const { scaleMin, scaleMax, scaleStep } = this.model;

    const scaleSize = Number(this.scaleValues.getBoundingClientRect()[this.size]);
    const maxValueSymbolNumber = Math.max(`${scaleMax}`.length, `${scaleMin}`.length);

    const maxValueSize = this.symbolSize * ((this.size === 'width') ? maxValueSymbolNumber : 1);
    const minGap = Math.max(
      0.5 * maxValueSize,
      ((this.size === 'width'))
        ? 1.5 * this.symbolSize
        : 0.8 * this.symbolSize,
    );

    const stepNumber = (scaleMax - scaleMin) / scaleStep;
    const baseStep = round10(1 / stepNumber, 10);
    const size = (maxValueSize + minGap) / scaleSize || 0.01;

    const positions = getPositions({ base: 1, baseStep, size });

    positions.forEach((value) => {
      this.appendValueElement(value, round10(scaleMin + value * (scaleMax - scaleMin), 0));
    });
  }

  private init(options: IOptions): void {
    const { container, side, size } = options;
    this.side = side;
    this.size = size;
    this.areValuesVisible = true;
    this.model = {
      scaleMin: 0,
      scaleMax: 1,
      scaleStep: 1,
    };
    this.addElements(container);
  }

  private addElements(container: HTMLElement): void {
    this.elementItem = createElement('scale');
    ['scaleLine', 'scaleValues'].forEach((item: 'scaleLine' | 'scaleValues') => {
      this[item] = createElement(item);
      this.element.append(this[item]);
    });
    container.append(this.element);
  }

  private addHandlers(): void {
    const handleMouseDown = (e: MouseEvent): void => {
      if (!(e.target instanceof HTMLElement)) return;

      if (this.scaleValues.contains(e.target)) {
        const valueElem = e.target;
        const { scaleMin, scaleMax } = this.model;
        const value = Number(valueElem.textContent.split('\xa0').join(''));
        const position = (value - scaleMin) / (scaleMax - scaleMin);
        this.emit('scaleMouseDown', position);
        return;
      }

      this.emit('scaleMouseDown', this.getPosition(e));

      const handleMouseMove = (event: MouseEvent): void => {
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

  private getPosition(e: MouseEvent): number {
    function getClickCoordsRelativeToBlock(event: MouseEvent, base: HTMLElement): Position {
      const baseBox = base.getBoundingClientRect();
      return {
        left: (event.clientX - baseBox.left) / baseBox.width,
        right: (-event.clientX + baseBox.right) / baseBox.width,
        top: (event.clientY - baseBox.top) / baseBox.height,
        bottom: (-event.clientY + baseBox.bottom) / baseBox.height,
      };
    }

    return getClickCoordsRelativeToBlock(e, this.element)[this.side];
  }

  private appendValueElement(position: number, value: number): void {
    const element = createElement('scaleValue');
    element.textContent = `${value.toLocaleString()}`;
    element.style[this.side] = `${position * 100}%`;
    this.scaleValues.append(element);
  }

  private get symbolSize(): number {
    const symbol = createElement('scaleValue');
    symbol.textContent = '0';
    this.scaleValues.append(symbol);
    const symbolSize = Number(symbol.getBoundingClientRect()[this.size]);
    this.scaleValues.removeChild(symbol);
    return symbolSize;
  }
}

export default LinearScaleView;
