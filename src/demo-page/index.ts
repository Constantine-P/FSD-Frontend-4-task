import './index.styl';
import '../app/SliderJQ';
import PanelView from '../app/layers/PanelView';

const slider1 = $('#slider-1').rangeSlider({
  min: -40,
  max: 80,
  scaleMin: -50,
  scaleMax: 100,
  scaleSteps: '25',
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
  // slider1.type = 'kkk';
  // slider1.isReverseDirection = 'asd';
  // slider1.isScaleVisible = false;
  // slider1.min = 0;
}, 100);
