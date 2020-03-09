import './index.styl';
import '../app/SliderJQ';
import PanelView from '../app/layers/PanelView';

const slider1 = $('#slider-1').rangeSlider({
  min: -40,
  max: 80,
  scaleMin: -60,
  scaleMax: 100,
  scaleSteps: '10',
  areTooltipsVisible: true,
  isRange: true,
  isScaleVisible: true,
  isReverseDirection: false,
  type: 'horizontal',
});

new PanelView(document.querySelector('#panel-11'), slider1);
new PanelView(document.querySelector('#panel-12'), slider1);

setTimeout(() => {
  // slider1.isRange = false;
  slider1.type = 'vertical';
  // slider1.isReverseDirection = true;
  // slider1.min = 0;
}, 1);
