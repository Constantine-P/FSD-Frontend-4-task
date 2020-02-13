import Model from "./Model";
import View from "./View";
import PanelView from './PanelView';
import Scale from "../classes/Scale";
import Range from "../classes/Range";

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

  private addHandlers() {
    this.model.on("change", this.modelChangeHandler.bind(this));
    this.view.model.on('change', this.viewModelChangeHandler.bind(this));

    if (this.panels) {
      this.panels.forEach(panel => {
        panel.on("change", this.panelChangeHandler.bind(this, panel));
      });
    }
  }

  private modelChangeHandler() {
    this.updateViewModel();
    if (this.panels) this.updatePanels();
  }

  private viewModelChangeHandler() {
    this.updateModel();
    if (this.panels) this.updatePanels();
  }

  private panelChangeHandler(panel) {
    this.view.model.data = panel.data;
    this.model.data = panel.data;
    this.updateViewModel();
    this.updatePanels();
  }

  private updateModel() {
      this.model.relRange = this.view.model.relRange;
  }

  private updateViewModel() {
      this.view.model.relRange = <Range>this.model.relRange;
      this.view.model.outputRange = (<Range>this.model.range).range;
      this.view.model.scale = <Scale>this.model.scale;
      this.view.render();
  }

  private updatePanels() {
      this.panels.forEach(panel => {
        panel.data = this.model.data;
        panel.data = this.view.model.data;
      });
    }
}

export default Controller;
