import { SliderType } from '../types/SliderType';
import Range from '../classes/Range';
import RangeValue from './RangeValue';

interface TransitData {
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
  range?: Range;
  relRange?: RangeValue;
  scale?: { values: number[]; positions: number[] };
}

export default TransitData;
