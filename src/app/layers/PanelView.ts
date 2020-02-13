import EventEmitter from "../classes/EventEmitter";
import IRange from '../interfaces/IRange';
import IScale from '../interfaces/IScale';
import ITransmittedData from '../interfaces/ITransmittedData';
import IPanelElements from '../interfaces/IPanelElements';
import IPanelModel from '../interfaces/IPanelModel';
import {SliderType} from '../types/SliderType';

class PanelView extends EventEmitter {
  private readonly _elements: IPanelElements;
  private readonly _model: IPanelModel;

  constructor(panel: HTMLElement) {
    super();
    this._model = {};
    this._elements = {};
    this.initElements(panel);
    this.addChangeHandlers();
  }

  get data(): ITransmittedData {
    return {
      range: this.range,
      scale: this.scale,
      type: this.type,
      isRange: this.isRange,
      isVisibleScale: this.isVisibleScale,
      isVisibleTooltip: this.isVisibleTooltip,
      isReverseDirection: this.isReverseDirection,
    }
  }

  set data(value: ITransmittedData) {
    Object.keys(value).forEach(key => {
      if (this[key] !== null) {
        this[key] = value[key];
      }
    });
    this.updateElements();
  }

  private get range(): IRange {
    return {
      min: this._model.rangeMin,
      max: this._model.rangeMax
    }
  }

  private set range(value: IRange) {
    if (value.min < this.scale.min) value.min = this.scale.min;
    if (value.max > this.scale.max) value.max = this.scale.max;
    this._model.rangeMin = value.min;
    this._model.rangeMax = value.max;
  }

  private get scale(): IScale {
    return {
      min: this._model.scaleMin,
      max: this._model.scaleMax,
      steps: this._model.steps
    }
  }

  private set scale(value: IScale) {
    this._model.scaleMin = value.min;
    this._model.scaleMax = value.max;
    this._model.steps = value.steps;
  }

  private get isRange(): boolean {
    return this._model.isRange;
  }

  private set isRange(value: boolean) {
    this._model.isRange = value;
  }

  private get isVisibleTooltip(): boolean {
    return this._model.isVisibleTooltip;
  }

  private set isVisibleTooltip(value: boolean) {
    this._model.isVisibleTooltip = value;
  }

  private get isVisibleScale(): boolean {
    return this._model.isVisibleScale;
  }

  private set isVisibleScale(value: boolean) {
    this._model.isVisibleScale = value;
  }

  private get isReverseDirection(): boolean {
    return this._model.isReverseDirection;
  }

  private set isReverseDirection(value: boolean) {
    this._model.isReverseDirection = value;
  }

  private get type(): SliderType {
    return this._model.type;
  }

  private set type(value: SliderType) {
    this._model.type = value;
  }

  private initElements(panel) {
    const elements = Array.from(panel.querySelectorAll("*")) as HTMLElement[];
    elements.forEach(item => {
      const isItemValidElement = () => (item instanceof HTMLInputElement || item instanceof HTMLSelectElement);
      if (isItemValidElement()) {
        this._elements[item.dataset.js] = item;
      }
    });
  }

  private updateModel() {
    Object.keys(this._elements).forEach(key => {
      const element = this._elements[key];
      const isItemTypeNumber = () => (element instanceof HTMLInputElement && element.type === "number");
      const isItemTypeCheckbox = () => (element instanceof HTMLInputElement && element.type === "checkbox");
      const isItemTypeText = () => (element instanceof HTMLInputElement && element.type === "text");

      if (isItemTypeNumber()) {
        this._model[key] = +(<HTMLInputElement>element).value;
      } else if (isItemTypeCheckbox()) {
        this._model[key] = (<HTMLInputElement>element).checked;
      } else if (isItemTypeText()) {
        this._model[key] = element.value;
      } else if (element instanceof HTMLSelectElement) {
        this._model[key] = element.value;
      }
    })
  }

  private updateElements() {
    Object.keys(this._elements).forEach(key => {
      const element = this._elements[key];
      const isItemHasValue = () => ((element instanceof HTMLInputElement
        && (element.type === "number" || element.type === "text"))
        || element instanceof HTMLSelectElement);
      const isItemTypeCheckbox = () => (element instanceof HTMLInputElement && element.type === "checkbox");

      if (isItemHasValue()) {
        element.value = this._model[key];
      } else if (isItemTypeCheckbox()) {
        element.checked = this._model[key];
      }

    })
  }

  private addChangeHandlers() {
    const panelElementChangeHandler = () => {
      this.updateModel();
      this.emit('change');
    };
    Object.values(this._elements).forEach(element => {
      element.addEventListener("change", panelElementChangeHandler)
    });
  }

}

export default PanelView;
