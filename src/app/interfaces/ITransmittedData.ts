import IRange from './IRange';
import IScale from './IScale';
import {SliderType} from '../types/SliderType';

export default interface ITransmittedData {
    range?: IRange,
    relRange?: IRange,
    scale?: IScale,
    isRange?: boolean,
    isVisibleTooltip?: boolean,
    isVisibleScale?: boolean,
    isReverseDirection?: boolean,
    type?: SliderType
}
