import { SliderType } from '../types/SliderType';

interface SliderOptions {
  min?: number;
  max?: number;
  scaleMin?: number;
  scaleMax?: number;
  scaleStep?: number;
  isRange?: boolean;
  areTooltipsVisible?: boolean;
  isScaleVisible?: boolean;
  isReverseDirection?: boolean;
  type?: SliderType;
}

export default SliderOptions;
