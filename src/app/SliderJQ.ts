import Slider from "./Slider";
import ISliderOptions from './interfaces/ISliderOptions';
// import "@types/jquery";

$.fn.rangeSlider = function (options: ISliderOptions, panels: HTMLElement | HTMLElement[] | JQuery) {

  if (panels instanceof Array) {
    panels = panels.map(item => {
      return (item instanceof jQuery) ? item[0] : item;
    });
  } else if (panels instanceof jQuery) {
    panels = panels[0];
  }
  return new Slider(this.get(0), options, <HTMLElement | HTMLElement[]>panels);
};
