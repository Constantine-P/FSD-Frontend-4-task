import { SliderType } from '../types/SliderType';

interface SliderOptions {
  min?: number;
  max?: number;
  scaleMin?: number;
  scaleMax?: number;
  scaleSteps?: string;
  isRange?: boolean;
  areTooltipsVisible?: boolean;
  isScaleVisible?: boolean;
  isReverseDirection?: boolean;
  type?: SliderType;
  values: [];
}

export default SliderOptions;
