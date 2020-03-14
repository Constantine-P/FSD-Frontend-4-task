import EventEmitter from '../../classes/EventEmitter';
import createElement from '../../functions/createElement';
import minMax from '../../functions/minMax';

type side = 'top' | 'bottom' | 'left' | 'right';
type size = 'width' | 'height';

class ElementView extends EventEmitter {
  protected element: HTMLDivElement;

  public side: side;

  public size: size;

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

  public get position(): number {
    return this.positionValue;
  }

  public set position(value) {
    this.positionValue = minMax(0, value, 1);
    ['top', 'bottom', 'left', 'right'].forEach((side) => {
      this.element.style[side] = '';
    });
    this.element.style[this.side] = `${this.positionValue * 100}%`;
  }

  public get length(): number {
    return this.lengthValue;
  }

  public set length(value) {
    this.lengthValue = minMax(0, value, 1);
    ['width', 'height'].forEach((side) => {
      this.element.style[side] = '';
    });
    this.element.style[this.size] = `${this.lengthValue * 100}%`;
  }

  public transitionOn(): void {
    this.element.style.transitionDuration = this.transitionDuration;
  }

  public transitionOff(): void {
    this.element.style.transitionDuration = '0s';
  }

  public show(): void {
    this.element.classList.remove('hidden');
  }

  public hide(): void {
    this.element.classList.add('hidden');
    this.position = 0;
  }

  public update(): void {
    this.position = this.positionValue;
    this.length = this.lengthValue;
  }

  private addElement(container, name): void {
    this.element = createElement(name);
    container.appendChild(this.element);
    this.transitionDuration = this.element.style.transitionDuration;
  }
}

export default ElementView;
