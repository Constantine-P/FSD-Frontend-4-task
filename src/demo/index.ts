import './page/page.styl';
import '../slider-app/SliderJQ';
import Panel from '../panel/Panel';

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  const sliderContainer = card.querySelector('.slider');
  const panelContainers = card.querySelectorAll('.panel');

  const slider = $(sliderContainer).rangeSlider();

  panelContainers.forEach((panelContainer: HTMLElement) => {
    new Panel(panelContainer, slider);
  });
});
