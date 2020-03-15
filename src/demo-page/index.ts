import './index.styl';
import '../panel/panel.styl';
import '../slider-app/SliderJQ';
import Panel from '../panel/Panel';

const slider1 = $('#slider-1').rangeSlider({
  scaleSteps: '20',
});
new Panel(document.querySelector('#panel-11'), slider1);
new Panel(document.querySelector('#panel-12'), slider1);

const slider2 = $('#slider-2').rangeSlider({
  min: 2,
  max: 8,
  scaleMin: 0,
  scaleMax: 15,
  scaleSteps: '2 3 5 3 2',
  areTooltipsVisible: true,
  isRange: false,
  isScaleVisible: true,
  isReverseDirection: false,
  type: 'vertical',
});
new Panel(document.querySelector('#panel-21'), slider2);
new Panel(document.querySelector('#panel-22'), slider2);

const slider3 = $('#slider-3').rangeSlider({
  min: -40,
  max: 80,
  scaleMin: -50,
  scaleMax: 100,
  scaleSteps: '',
  areTooltipsVisible: true,
  isRange: true,
  isScaleVisible: false,
  isReverseDirection: true,
  type: 'vertical',
});
new Panel(document.querySelector('#panel-31'), slider3);
new Panel(document.querySelector('#panel-32'), slider3);

const slider4 = $('#slider-4').rangeSlider({
  min: 20,
  max: 80,
  scaleMin: 0,
  scaleMax: 100,
  scaleSteps: '5*10 2*25',
  areTooltipsVisible: false,
  isRange: false,
  isScaleVisible: true,
  isReverseDirection: false,
  type: 'horizontal',
});
new Panel(document.querySelector('#panel-41'), slider4);
new Panel(document.querySelector('#panel-42'), slider4);
