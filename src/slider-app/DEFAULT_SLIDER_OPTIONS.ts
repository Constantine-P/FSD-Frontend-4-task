import { SliderType } from './types/SliderType';

const DEFAULT_SLIDER_OPTIONS = {
  min: 0,
  max: 100,
  scaleMin: 0,
  scaleMax: 100,
  scaleStep: 25,
  areTooltipsVisible: true,
  isRange: true,
  isScaleVisible: true,
  isReverseDirection: false,
  type: 'horizontal' as SliderType,
  units: '',
};

export default DEFAULT_SLIDER_OPTIONS;
