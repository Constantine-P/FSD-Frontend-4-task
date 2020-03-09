import Model from '../Model/Model';
import View from '../View/View';
import RangeValue from '../../interfaces/RangeValue';

class Controller {
  private readonly model: Model;

  private readonly view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.addHandlers();
    this.updateViewModel();
  }

  private addHandlers(): void {
    this.model.on('change', this.modelChangeHandler.bind(this));
    this.view.on('change', this.viewChangeHandler.bind(this));
    this.view.on('options-change', this.viewOptionsChangeHandler.bind(this));
  }

  private modelChangeHandler(): void {
    this.updateViewModel();
  }

  private viewChangeHandler(): void {
    this.updateModel();
  }

  private viewOptionsChangeHandler(): void {
    this.model.isRange = this.view.options.isRange;
    this.model.relRange = this.view.range as RangeValue;
  }

  private updateModel(): void {
    this.model.relRange = this.view.range as RangeValue;
  }

  private updateViewModel(): void {
    this.view.model.positions = this.model.scale.positions;
    this.view.model.values = this.model.scale.values;
    this.view.range = this.model.relRange;
  }
}

export default Controller;
