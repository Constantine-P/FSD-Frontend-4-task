import EventEmitter from '../classes/EventEmitter';
import PanelElements from '../interfaces/PanelElements';
import SliderOptions from '../interfaces/SliderOptions';
import TransitData from '../interfaces/TransitData';

class PanelView extends EventEmitter {
  private readonly elements: PanelElements;

  private readonly model: SliderOptions;

  constructor(panel: HTMLElement) {
    super();
    this.model = {};
    this.elements = {};
    this.initElements(panel);
    this.addChangeHandlers();
  }

  get data(): TransitData {
    return this.model;
  }

  set data(value: TransitData) {
    Object.keys(value).forEach((key) => {
      if (this.elements[key] !== null && this.elements[key] !== undefined) {
        this.model[key] = value[key];
      }
    });
    this.updateElements();
  }

  private initElements(panel): void {
    Array.from(panel.querySelectorAll('*'))
      .filter((item) => (item instanceof HTMLInputElement || item instanceof HTMLSelectElement))
      .forEach((item) => {
        this.elements[(item as HTMLElement).dataset.js] = item;
      });
  }

  private updateModel(): void {
    Object.keys(this.elements).forEach((key) => {
      const el = this.elements[key];
      const isItemSupportTextValue = (el.type === 'text' || el instanceof HTMLSelectElement);

      if (el.type === 'number') {
        this.model[key] = +el.value;
      } else if (el.type === 'checkbox') {
        this.model[key] = el.checked;
      } else if (isItemSupportTextValue) {
        this.model[key] = el.value;
      }
    });
  }

  private updateElements(): void {
    Object.keys(this.elements).forEach((key) => {
      const el = this.elements[key];
      const isItemHasValue = (el.type === 'number' || el.type === 'text' || el instanceof HTMLSelectElement)
        && this.model[key] !== undefined;

      if (isItemHasValue) {
        el.value = this.model[key];
      } else if (el.type === 'checkbox') {
        el.checked = this.model[key];
      }
    });
  }

  private addChangeHandlers(): void {
    const elementChangeHandler = (): void => {
      this.updateModel();
      this.emit('change');
    };
    Object.values(this.elements).forEach((el) => {
      el.addEventListener('change', elementChangeHandler);
    });
  }
}

export default PanelView;
