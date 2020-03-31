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
    this.view.updateScale();
  }

  private addHandlers(): void {
    const modelChangeHandler = (): void => {
      this.updateView();
    };

    const viewChangeHandler = (e: string): void => {
      this.updateModel(e);
    };

    this.model.on('change', modelChangeHandler);
    this.view.on('change', viewChangeHandler);
  }

  private updateModel(e: string): void {
    if (e === 'min') this.model.relMin = this.view.model.minHandlePosition;
    if (e === 'max') this.model.relMax = this.view.model.maxHandlePosition;
    if (e === 'isRange') this.model.isRange = this.view.model.isRange;
  }

  private updateView(): void {
    const {
      scaleMin, scaleMax, scaleStep, min, max, relMin, relMax,
    } = this.model;
    const isUpdateScale = (this.view.model.scaleStep !== scaleStep)
    || (this.view.model.scaleMin !== scaleMin)
    || (this.view.model.scaleMax !== scaleMax);
    this.view.model.data = {
      minHandleValue: min,
      maxHandleValue: max,
      minHandlePosition: relMin,
      maxHandlePosition: relMax,
    };
    if (isUpdateScale) {
      this.view.model.data = {
        scaleMin, scaleMax, scaleStep,
      };
      this.view.updateScale();
    }
  }
}

export default Controller;
