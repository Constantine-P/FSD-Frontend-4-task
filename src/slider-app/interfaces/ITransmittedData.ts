import ISliderOptions from './ISliderOptions';
import IRangeValue from './IRangeValue';

interface ITransmittedData extends ISliderOptions {
  minHandlePosition?: number;
  maxHandlePosition?: number;
  minHandleValue?: number;
  maxHandleValue?: number;
  relRange?: IRangeValue;
}

export default ITransmittedData;
