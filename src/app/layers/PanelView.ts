import EventEmitter from '../classes/EventEmitter';
import PanelElements from '../interfaces/PanelElements';
import SliderOptions from '../interfaces/SliderOptions';
import TransitData from '../interfaces/TransitData';
import Slider from '../Slider';

class PanelView extends EventEmitter {
  private readonly elements: PanelElements;

  private readonly panelModel: SliderOptions;

  private readonly slider: Slider;

  constructor(panel: HTMLElement, slider: Slider) {
    super();
    this.panelModel = {};
    this.elements = {};
    this.slider = slider;
    this.initElements(panel);
    this.addChangeHandlers();
    this.subscribeOnSliderChange();
  }

  get model(): TransitData {
    return this.panelModel;
  }

  set model(value: TransitData) {
    Object.keys(value).forEach((key) => {
      if (this.elements[key] !== null && this.elements[key] !== undefined) {
        this.panelModel[key] = value[key];
      }
    });
    this.updateElementsByModel();
  }

  private initElements(panel): void {
    Array.from(panel.querySelectorAll('*'))
      .filter((item) => (item instanceof HTMLInputElement || item instanceof HTMLSelectElement))
      .forEach((item) => {
        this.elements[(item as HTMLElement).dataset.js] = item;
      });
  }

  private updateModelByElements(): void {
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

  private updateElementsByModel(): void {
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
      this.updateModelByElements();
      this.slider.data = this.model;
      // console.log('panel update slider');
    };
    Object.values(this.elements).forEach((el) => {
      el.addEventListener('change', elementChangeHandler);
    });
  }

  private subscribeOnSliderChange(): void {
    const updateModelBySlider = (): void => {
      this.model = this.slider.data;
      this.updateElementsByModel();
      // console.log('slider update panel');
    };
    updateModelBySlider();
    // console.log('panel-model: ', this.model);

    const handleSliderChange = (): void => updateModelBySlider();
    this.slider.on('change', handleSliderChange);
  }
}

export default PanelView;
