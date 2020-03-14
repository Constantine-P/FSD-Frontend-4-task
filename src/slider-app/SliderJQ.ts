import Slider from './Slider';
import SliderOptions from './interfaces/SliderOptions';

$.fn.rangeSlider = function rangeSlider(options: SliderOptions = {},
  panels?: HTMLElement | HTMLElement[] | JQuery): Slider {
  let pans = panels;
  if (panels instanceof Array) {
    pans = panels.map((item) => ((item instanceof jQuery) ? item[0] : item));
  } else if (panels instanceof jQuery) {
    // eslint-disable-next-line prefer-destructuring
    pans = panels[0];
  }

  return new Slider(this.get(0), options);
};
