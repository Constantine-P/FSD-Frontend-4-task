import SliderOptions from './SliderOptions';
import RangeValue from './RangeValue';

interface TransmittedData extends SliderOptions {
  minHandlePosition?: number;
  maxHandlePosition?: number;
  minHandleValue?: number;
  maxHandleValue?: number;
  relRange?: RangeValue;
}

export default TransmittedData;
