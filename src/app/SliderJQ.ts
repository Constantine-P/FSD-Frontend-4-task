import Slider from './Slider';
import SliderOptions from './interfaces/SliderOptions';

$.fn.rangeSlider = function rangeSlider(options: SliderOptions,
  panels: HTMLElement | HTMLElement[] | JQuery): Slider {
  let pans = panels;
  if (panels instanceof Array) {
    pans = panels.map((item) => ((item instanceof jQuery) ? item[0] : item));
  } else if (panels instanceof jQuery) {
    const zero = 0;
    pans = panels[zero];
  }

  return new Slider(this.get(0), options, pans as HTMLElement | HTMLElement[]);
};
