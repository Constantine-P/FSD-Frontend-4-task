import EventEmitter from '../slider-app/classes/EventEmitter';
import SliderOptions from '../slider-app/interfaces/SliderOptions';
import TransmittedData from '../slider-app/interfaces/TransmittedData';
import Slider from '../slider-app/Slider';

class Panel extends EventEmitter {
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

  get model(): TransmittedData {
    return this.panelModel;
  }

  set model(value: TransmittedData) {
    Object.keys(value).forEach((key) => {
      if (this.elements[key] !== undefined) {
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
      this.updateElementByModel(key);
    });
  }

  private updateElementByModel(name): void {
    const el = this.elements[name];
    if (!el) return;
    const isItemHasValue = (el.type === 'number' || el.type === 'text' || el instanceof HTMLSelectElement)
      && this.model[name] !== undefined;

    if (isItemHasValue) {
      el.value = this.model[name];
    } else if (el.type === 'checkbox') {
      el.checked = this.model[name];
    }
  }

  private addChangeHandlers(): void {
    const elementChangeHandler = (e): void => {
      this.updateModelByElements();
      this.slider[e.target.name] = this.model[e.target.name];
    };
    Object.values(this.elements).forEach((el) => {
      el.addEventListener('change', elementChangeHandler);
    });
  }

  private subscribeOnSliderChange(): void {
    const updateModelBySlider = (name): void => {
      if (name) {
        this.model[name] = this.slider[name];
        this.updateElementByModel(name);
        // console.log(`updateModelBySlider -> ${name}`);
      } else {
        this.model = this.slider.data;
        this.updateElementsByModel();
        // console.log('this.model = this.slider.data;');
      }
    };
    updateModelBySlider(null);

    const handleSliderChange = (name): void => {
      updateModelBySlider(name);
    };
    this.slider.on('change', handleSliderChange);
  }
}

interface PanelElements {
  rangeMin?: HTMLInputElement;
  rangeMax?: HTMLInputElement;
  scaleMin?: HTMLInputElement;
  scaleMax?: HTMLInputElement;
  steps?: HTMLInputElement;
  isRange?: HTMLInputElement;
  areTooltipsVisible?: HTMLInputElement;
  isScaleVisible?: HTMLInputElement;
  isReverseDirection?: HTMLInputElement;
  type?: HTMLSelectElement;
}

export default Panel;
