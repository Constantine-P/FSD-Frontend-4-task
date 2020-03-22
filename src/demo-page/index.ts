import './index.styl';
import '../panel/panel.styl';
import '../slider-app/SliderJQ';
import Panel from '../panel/Panel';

const slider1 = $('#slider-1').rangeSlider({
  min: -2500,
  max: -2000,
  scaleMin: -10000,
  scaleMax: 10000,
  scaleStep: 1,
  areTooltipsVisible: true,
  isRange: true,
  isScaleVisible: true,
  isReverseDirection: false,
  type: 'horizontal',
  units: 'кПа',
});
new Panel(document.querySelector('#panel-11'), slider1);
new Panel(document.querySelector('#panel-12'), slider1);

const slider2 = $('#slider-2').rangeSlider({
  min: 2,
  max: 30,
  scaleMin: 0,
  scaleMax: 38,
  scaleStep: 1,
  areTooltipsVisible: true,
  isRange: false,
  isScaleVisible: true,
  isReverseDirection: false,
  type: 'vertical',
  units: 'попугаев',
});
new Panel(document.querySelector('#panel-21'), slider2);
new Panel(document.querySelector('#panel-22'), slider2);

const slider3 = $('#slider-3').rangeSlider({
  min: -100000,
  max: 100000,
  scaleMin: -500000,
  scaleMax: 500000,
  scaleStep: 50000,
  areTooltipsVisible: true,
  isRange: true,
  isScaleVisible: true,
  isReverseDirection: true,
  type: 'vertical',
});
new Panel(document.querySelector('#panel-31'), slider3);
new Panel(document.querySelector('#panel-32'), slider3);

const slider4 = $('#slider-4').rangeSlider({
  min: -7000,
  max: 7000,
  scaleMin: -10000,
  scaleMax: 10000,
  scaleStep: 500,
  areTooltipsVisible: false,
  isRange: true,
  isScaleVisible: true,
  isReverseDirection: false,
  type: 'horizontal',
});
new Panel(document.querySelector('#panel-41'), slider4);
new Panel(document.querySelector('#panel-42'), slider4);
