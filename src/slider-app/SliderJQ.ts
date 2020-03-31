import Slider from './Slider';
import ISliderOptions from './interfaces/ISliderOptions';

$.fn.rangeSlider = function rangeSlider(options: ISliderOptions = {}): Slider {
  return new Slider(this.get(0), options);
};
