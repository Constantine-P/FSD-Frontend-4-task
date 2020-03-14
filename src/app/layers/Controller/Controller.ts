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
    this.view.on('change-by-click', viewChangeHandler);
  }

  private updateModel(): void {
    this.model.data = this.view.model.dataToModel;
    this.model.emit('change');
    // console.log('controller update model');
  }

  private updateView(): void {
    this.view.model.data = this.model.dataToView;
    // console.log('controller update view-model');
  }
}

export default Controller;
