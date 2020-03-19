import EventEmitter from '../../classes/EventEmitter';
import createElement from '../../functions/createElement';
import isSimpleNumber from '../../functions/isSimpleNumber';

class LinearScaleView extends EventEmitter {
  protected elementItem: HTMLDivElement;

  private scaleValues: HTMLDivElement;

  public side: Side;

  public size: Size;

  public areValuesVisible: boolean;

  public model: {
    scaleMin: number;
    scaleMax: number;
    scaleStep: number;
  };

  constructor(options) {
    super();
    this.init(options);
    this.addHandlers();
  }

  get element(): HTMLDivElement {
    return this.elementItem;
  }

  public renderValues(): void {
    this.scaleValues.innerHTML = '';
    if (!this.areValuesVisible) return;

    const { scaleMin, scaleMax, scaleStep } = this.model;
    const scaleSize = Number(this.scaleValues.getBoundingClientRect()[this.size]);
    const minGap = 4;
    const minRelativeGap = minGap / scaleSize;
    const maxValueSymbolNumber = Math.max(`${scaleMax}`.length, `${scaleMin}`.length);
    const maxValueSize = this.symbolSize * ((this.size === 'width') ? maxValueSymbolNumber : 1);
    const maxValueRelativeSize = maxValueSize / scaleSize;
    const stepNumber = (scaleMax - scaleMin) / scaleStep;
    const round = (val, accuracy): number => Math.round(val * (10 ** accuracy)) / (10 ** accuracy);
    const basePositionStep = round(1 / stepNumber, 10);
    let positionStep = basePositionStep;
    let multiplier = 1;

    while ((positionStep - maxValueRelativeSize) < minRelativeGap) {
      multiplier += 1;
      positionStep = basePositionStep * multiplier;
    }
    const condition = isSimpleNumber(stepNumber, multiplier) && multiplier !== 1;

    if (!(condition)) {
      while (stepNumber % multiplier !== 0) multiplier += 1;
    } else {
      this.appendValueElement(1, `${scaleMax}`);
    }

    positionStep = basePositionStep * multiplier;
    const visibleValueStep = scaleStep * multiplier;
    const offset = condition ? positionStep : 0;

    for (let i = 0, position = 0; round(position, 2) <= 1 - offset; i += 1) {
      this.appendValueElement(position, scaleMin + visibleValueStep * i);
      position = round(position + positionStep, 4);
    }
  }

  private init(options): void {
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

  private addElements(container): void {
    this.elementItem = createElement('scale');
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

  private appendValueElement(position, text): void {
    const value = createElement('scaleValue');
    value.textContent = `${text}`;
    value.style[this.side] = `${position * 100}%`;
    this.scaleValues.append(value);
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

type Side = 'top' | 'bottom' | 'left' | 'right';

type Size = 'width' | 'height';

interface Position {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export default LinearScaleView;
