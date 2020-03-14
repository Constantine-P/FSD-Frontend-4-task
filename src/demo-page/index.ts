import './index.styl';
import '../panel/panel.styl';
import '../slider-app/SliderJQ';
import Panel from '../panel/Panel';

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

new Panel(document.querySelector('#panel-11'), slider1);
new Panel(document.querySelector('#panel-12'), slider1);
