import EventEmitter from '../../classes/EventEmitter';
import createElement from '../../functions/createElement';
import minMax from '../../functions/minMax';

class ElementView extends EventEmitter {
  protected element: HTMLDivElement;

  public side: Side;

  public size: Size;

  private positionValue: number;

  private lengthValue: number;

  private transitionDuration: string;

  constructor(options) {
    super();
    const {
      container, name, position, length, side, size,
    } = options;

    this.side = side;
    this.size = size;
    this.positionValue = position;
    this.lengthValue = length;
    this.transitionDuration = '';

    this.addElement(container, name);
    this.position = this.positionValue;
    this.length = this.lengthValue;
  }

  get position(): number {
    return this.positionValue;
  }

  set position(value) {
    this.positionValue = minMax(0, value, 1);
    ['top', 'bottom', 'left', 'right'].forEach((side) => {
      this.element.style[side] = '';
    });
    this.element.style[this.side] = `${this.positionValue * 100}%`;
  }

  get length(): number {
    return this.lengthValue;
  }

  set length(value) {
    this.lengthValue = minMax(0, value, 1);
    ['width', 'height'].forEach((side) => {
      this.element.style[side] = '';
    });
    this.element.style[this.size] = `${this.lengthValue * 100}%`;
  }

  transitionOn(): void {
    this.element.style.transitionDuration = this.transitionDuration;
  }

  transitionOff(): void {
    this.element.style.transitionDuration = '0s';
  }

  show(): void {
    this.element.classList.remove('hidden');
  }

  hide(): void {
    this.element.classList.add('hidden');
    this.position = 0;
  }

  update(): void {
    this.position = this.positionValue;
    this.length = this.lengthValue;
  }

  private addElement(container, name): void {
    this.element = createElement(name);
    container.appendChild(this.element);
    this.transitionDuration = this.element.style.transitionDuration;
  }
}

type Side = 'top' | 'bottom' | 'left' | 'right';
type Size = 'width' | 'height';

export default ElementView;
