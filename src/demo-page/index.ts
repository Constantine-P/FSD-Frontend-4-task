import './index.styl';
import '../panel/panel.styl';
import '../slider-app/SliderJQ';
import Panel from '../panel/Panel';

const sliderWrappers = document.querySelectorAll('.slider-wrapper');

sliderWrappers.forEach((wrapper) => {
  const sliderContainer = wrapper.querySelector('.slider');
  const panelContainers = wrapper.querySelectorAll('.panel');

  const slider = $(sliderContainer).rangeSlider();

  panelContainers.forEach((panelContainer: HTMLElement) => {
    new Panel(panelContainer, slider);
  });
});
