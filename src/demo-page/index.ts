import './index.styl';
import '../app/SliderJQ';

$('#slider-1').rangeSlider({
  min: 40,
  max: 80,
  scaleMin: 0,
  scaleMax: 100,
  scaleSteps: '20',
  areTooltipsVisible: true,
  isRange: true,
  isScaleVisible: true,
  isReverseDirection: false,
  type: 'horizontal',
},
[$('#panel-11'), $('#panel-12')]);

$('#slider-2').rangeSlider({
  max: 10,
  scaleMin: -20,
  scaleMax: 20,
  scaleSteps: '5',
  areTooltipsVisible: true,
  isRange: false,
  isScaleVisible: true,
  isReverseDirection: false,
  type: 'vertical',
},
[$('#panel-21'), $('#panel-22')]);

$('#slider-3').rangeSlider({
  min: -10,
  max: 10,
  scaleMin: -15,
  scaleMax: 20,
  scaleSteps: '3*5 2*10',
  areTooltipsVisible: true,
  isRange: true,
  isScaleVisible: true,
  isReverseDirection: false,
  type: 'vertical',
},
[$('#panel-31'), $('#panel-32')]);

$('#slider-4').rangeSlider({
  max: 21,
  scaleMin: -100,
  scaleMax: 100,
  scaleSteps: '',
  areTooltipsVisible: true,
  isRange: false,
  isScaleVisible: false,
  isReverseDirection: true,
  type: 'horizontal',
},
[$('#panel-41'), $('#panel-42')]);
