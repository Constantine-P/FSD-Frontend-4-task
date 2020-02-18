import './index.styl';
import '../app/SliderJQ';

$('#slider-1').rangeSlider({
  min: -10,
  max: 10,
  scaleMin: -20,
  scaleMax: 20,
  scaleSteps: '5',
  areTooltipsVisible: true,
  isRange: true,
  isScaleVisible: true,
  isReverseDirection: false,
  type: 'horizontal',
},
[$('#panel-11'), $('#panel-12')]);

$('#slider-2').rangeSlider({
  min: -10,
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
