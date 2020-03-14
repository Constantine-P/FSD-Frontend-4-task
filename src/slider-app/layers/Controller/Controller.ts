import Model from '../Model/Model';
import View from '../View/View';

class Controller {
  private readonly model: Model;

  private readonly view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.addHandlers();
    this.updateView();
  }

  private addHandlers(): void {
    const modelChangeHandler = (): void => {
      this.updateView();
    };

    const viewChangeHandler = (): void => {
      this.updateModel();
    };

    this.model.on('change', modelChangeHandler);
    this.view.on('change', viewChangeHandler);
  }

  private updateModel(): void {
    this.model.data = {
      relRange: {
        min: this.view.model.minHandlePosition,
        max: this.view.model.maxHandlePosition,
      },
      isRange: this.view.model.isRange,
    };
    this.model.emit('change');
  }

  private updateView(): void {
    this.view.model.data = {
      minHandleValue: this.model.min,
      maxHandleValue: this.model.max,
      minHandlePosition: this.model.relRange.min,
      maxHandlePosition: this.model.relRange.max,
      positions: this.model.scale.positions,
      values: this.model.scale.values,
    };
  }
}

export default Controller;
