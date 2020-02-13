import {SliderType} from '../types/SliderType';

interface IPanelModel {
  rangeMin?: number;
  rangeMax?: number;
  scaleMin?: number;
  scaleMax?: number;
  steps?: string;
  isRange?: boolean;
  isVisibleTooltip?: boolean;
  isVisibleScale?: boolean;
  isReverseDirection?: boolean;
  type?: SliderType;
}

export default IPanelModel;
