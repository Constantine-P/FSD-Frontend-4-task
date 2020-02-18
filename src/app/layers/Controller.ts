import Model from './Model';
import View from './View';
import PanelView from './PanelView';

class Controller {
  private readonly model: Model;

  private readonly view: View;

  private readonly panels: PanelView[];

  constructor(model: Model, view: View, panels?: PanelView[]) {
    this.model = model;
    this.view = view;
    this.panels = panels;

    this.addHandlers();
    this.updateViewModel();
    if (this.panels) this.updatePanels();
    this.view.render();
  }

  private addHandlers(): void {
    this.model.on('change', this.modelChangeHandler.bind(this));
    this.view.model.on('change', this.viewModelChangeHandler.bind(this));

    if (this.panels) {
      this.panels.forEach((panel) => {
        panel.on('change', this.panelChangeHandler.bind(this, panel));
      });
    }
  }

  private modelChangeHandler(): void {
    this.updateViewModel();
    if (this.panels) this.updatePanels();
  }

  private viewModelChangeHandler(): void {
    this.updateModel();
    if (this.panels) this.updatePanels();
  }

  private panelChangeHandler(panel): void {
    this.view.model.data = panel.data;
    this.model.data = panel.data;
    const isRangeMinDisabled = (!this.view.model.isRange
      && (this.model.range.min !== this.model.scale.min));

    if (isRangeMinDisabled) {
      this.model.disableEmitting();
      this.model.min = this.model.scaleMin;
      this.model.enableEmitting();
    }
    this.updateViewModel();
    this.updatePanels();
  }

  private updateModel(): void {
    this.model.relRange = this.view.model.relRange;
  }

  private updateViewModel(): void {
    this.view.model.data = this.model.data;
    this.view.render();
  }

  private updatePanels(): void {
    this.panels.forEach((panel: PanelView) => {
      panel.data = Object.assign(this.model.data, this.view.model.data);
    });
  }
}

export default Controller;
