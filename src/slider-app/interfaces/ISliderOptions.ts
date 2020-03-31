import SliderType from '../types/SliderType';

interface ISliderOptions {
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
  units?: string;
}

export default ISliderOptions;
