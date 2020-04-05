import EventEmitter from '../../classes/EventEmitter';
import Side from '../../types/Side';
import Size from '../../types/Size';
import createElement from '../../functions/createElement';
import minMax from '../../functions/minMax';

interface IOptions {
  container: HTMLElement;
  name: string;
  position: number;
  side: Side;
  size: Size;
}

class ElementView extends EventEmitter {
  protected element: HTMLElement;

  public side: Side;

  public size: Size;

  private positionValue: number;

  private transitionDuration: string;

  private readonly name: string;

  constructor(options: IOptions) {
    super();
    const {
      container, name, position, side, size,
    } = options;

    this.side = side;
    this.size = size;
    this.positionValue = position;
    this.transitionDuration = '';
    this.name = name;

    this.addElement(container, name);
    this.position = this.positionValue;
  }

  get position(): number {
    return this.positionValue;
  }

  set position(value) {
    this.positionValue = minMax(0, value, 1);
    ['top', 'bottom', 'left', 'right'].forEach((side: Side) => {
      this.element.style[side] = '';
    });
    this.element.style[this.side] = `${this.positionValue * 100}%`;
  }

  transitionOn(): void {
    this.element.style.transitionDuration = this.transitionDuration;
  }

  transitionOff(): void {
    this.element.style.transitionDuration = '0s';
  }

  show(): void {
    this.element.classList.remove(`slider__${this.name}_hidden`);
  }

  hide(): void {
    this.element.classList.add(`slider__${this.name}_hidden`);
    this.position = 0;
  }

  update(): void {
    this.position = this.positionValue;
  }

  private addElement(container: HTMLElement, name: string): void {
    this.element = createElement(name);
    container.appendChild(this.element);
    this.transitionDuration = this.element.style.transitionDuration;
  }
}

export default ElementView;
