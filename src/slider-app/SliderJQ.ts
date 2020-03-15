import Slider from './Slider';
import SliderOptions from './interfaces/SliderOptions';

$.fn.rangeSlider = function rangeSlider(options: SliderOptions = {}): Slider {
  return new Slider(this.get(0), options);
};
