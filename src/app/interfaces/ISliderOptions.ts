import IRange from "./IRange";
import IScale from "./IScale";
import {SliderType} from "../types/SliderType";

export default interface ISliderOptions {
    range: IRange;
    scale: IScale;
    type: SliderType;
    isRange: boolean;
    isVisibleTooltip: boolean;
    isVisibleScale: boolean;
    isReverseDirection: boolean;
}