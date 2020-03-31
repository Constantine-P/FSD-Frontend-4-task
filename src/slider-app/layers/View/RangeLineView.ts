import ElementView from './ElementView';
import Side from '../../types/Side';
import Size from '../../types/Size';
import minMax from '../../functions/minMax';

interface IOptions {
  container: HTMLElement;
  name: string;
  position: number;
  side: Side;
  size: Size;
  length: number;
}

class RangeLineView extends ElementView {
  private lengthValue: number;

  constructor(options: IOptions) {
    super(options);
    this.lengthValue = options.length;
    this.length = this.lengthValue;
  }

  get length(): number {
    return this.lengthValue;
  }

  set length(value) {
    this.lengthValue = minMax(0, value, 1);
    ['width', 'height'].forEach((side: Size) => {
      this.element.style[side] = '';
    });
    this.element.style[this.size] = `${this.lengthValue * 100}%`;
  }

  update(): void {
    super.update();
    this.length = this.lengthValue;
  }
}

export default RangeLineView;
