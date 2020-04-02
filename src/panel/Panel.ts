import Slider from '../slider-app/Slider';
import EventEmitter from '../slider-app/classes/EventEmitter';
import ISliderOptions from '../slider-app/interfaces/ISliderOptions';
import IRangeValue from '../slider-app/interfaces/IRangeValue';

type PanelKey = keyof ISliderOptions;

type PanelValue = number | string | boolean | IRangeValue;

interface IPanelModel {
  [name: string]: PanelValue;
}

interface PanelElements {
  [name: string]: HTMLInputElement | HTMLSelectElement;
}

class Panel extends EventEmitter {
  private readonly elements: PanelElements;

  private readonly panelModel: IPanelModel;

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

  get model(): ISliderOptions {
    return this.panelModel;
  }

  set model(value: ISliderOptions) {
    Object.keys(value).forEach((key: PanelKey) => {
      if (this.elements[key] !== undefined) {
        this.panelModel[key] = value[key];
      }
    });
    this.updateElementsByModel();
  }

  private initElements(panel: HTMLElement): void {
    const elements = Array.from(panel.querySelectorAll('*'));
    const inputElements = elements.filter((item) => item instanceof HTMLInputElement);
    const selectElements = elements.filter((item) => item instanceof HTMLSelectElement);

    inputElements.forEach((item: HTMLInputElement) => {
      const key = item.dataset.js;
      this.elements[key] = item;
    });

    selectElements.forEach((item: HTMLSelectElement) => {
      const key = item.dataset.js;
      this.elements[key] = item;
    });
  }

  private updateModelByElements(): void {
    Object.keys(this.elements).forEach((key: PanelKey) => {
      const elem = this.elements[key];
      const isElemTypeCheckbox = (elem instanceof HTMLInputElement && elem.type === 'checkbox');
      const isElemTypeNumber = (elem instanceof HTMLInputElement && elem.type === 'number');
      const isElemSupportTextValue = ((elem instanceof HTMLInputElement && elem.type === 'text')
        || elem instanceof HTMLSelectElement);

      if (isElemTypeNumber) {
        (this.model[key] as number) = +elem.value;
      } else if (isElemTypeCheckbox) {
        (this.model[key] as boolean) = (elem as HTMLInputElement).checked;
      } else if (isElemSupportTextValue) {
        (this.model[key] as string) = elem.value;
      }
    });
  }

  private updateElementsByModel(): void {
    Object.keys(this.elements).forEach((key: PanelKey) => {
      this.updateElementByModel(key);
    });
  }

  private updateElementByModel(key: PanelKey): void {
    const elem = this.elements[key];
    if (!elem) return;
    const value = this.model[key];

    const isElemSupportValue = ((elem instanceof HTMLInputElement
      && (elem.type === 'number' || elem.type === 'text'))
      || (elem instanceof HTMLSelectElement))
      && value !== undefined;

    const isElemTypeCheckbox = (elem instanceof HTMLInputElement && elem.type === 'checkbox'
      && typeof value === 'boolean');

    if (isElemSupportValue) {
      elem.value = `${value}`;
    } else if (isElemTypeCheckbox) {
      (elem as HTMLInputElement).checked = Boolean(value);
    }
  }

  private addChangeHandlers(): void {
    const elementChangeHandler = (e: Event): void => {
      if (!(e.target instanceof HTMLElement)) return;

      const keys = ['min', 'max', 'scaleMin', 'scaleMax', 'scaleStep', 'units', 'type',
        'isRange', 'areTooltipsVisible', 'isScaleVisible', 'isReverseDirection'];

      if (keys.indexOf(e.target.dataset.js) < 0) return;

      const key: PanelKey = e.target.dataset.js as PanelKey;
      this.updateModelByElements();
      (this.slider[key] as PanelValue) = this.model[key];
    };

    Object.values(this.elements).forEach((el) => {
      el.addEventListener('change', elementChangeHandler);
    });
  }

  private subscribeOnSliderChange(): void {
    const updateModelBySlider = (key: PanelKey): void => {
      if (key) {
        (this.model[key] as PanelValue) = this.slider[key];
        this.updateElementByModel(key);
      } else {
        this.model = this.slider.data;
        this.updateElementsByModel();
      }
    };
    updateModelBySlider(null);

    const handleSliderChange = (name: PanelKey): void => {
      updateModelBySlider(name);
    };
    this.slider.on('change', handleSliderChange);
  }
}

export default Panel;
