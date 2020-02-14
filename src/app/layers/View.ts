import ViewModel from "./ViewModel";
import EventEmitter from "../classes/EventEmitter";
import ISliderOptions from "../interfaces/ISliderOptions";
import ISliderElements from "../interfaces/ISliderElements";
import getClickCoordsRelativeToBlock from "../functions/getClickCoordsRelativeToBlock";
import camelToKebab from "../functions/camelToKebab";
import toPercent from "../functions/toPercent";

export default class View extends EventEmitter {
    private readonly _slider: HTMLElement;
    private readonly _elements: ISliderElements;
    private readonly _model: ViewModel;

    constructor(slider: HTMLElement, options: ISliderOptions) {
        super();
        this._slider = slider;
        this._elements = {
            minHandle: null,
            maxHandle: null,
            scaleLine: null,
            rangeLine: null,
            minValueTooltip: null,
            maxValueTooltip: null,
            scaleValues: null,
        };

        const defaultOptions = {
            type: "horizontal",
            isRange: false,
            isVisibleTooltip: true,
            isVisibleScaleValues: true,
            isReverseDirection: false
        };
        Object.assign(defaultOptions, options);

        this._model = new ViewModel(options);
        this.addSliderElements();
        this.alignSliderElementsVisibility();
        this.addSliderClickEventHandlers();
    }

    private addSliderElements() {
        const sliderInner = document.createElement("div");
        sliderInner.classList.add("slider-inner");
        this._slider.append(sliderInner);

        Object.keys(this._elements).forEach(elem => {
            this._elements[elem] = document.createElement("div");
            this._elements[elem].classList.add(camelToKebab(elem));
            sliderInner.append(this._elements[elem]);
        })
    }

    private addSliderClickEventHandlers() {
        const transition = getComputedStyle(this._elements.maxHandle).transitionDuration;
        const emitClick = (e: MouseEvent) => {
            this.updateModelRelRange(e);
            this.render();
        };
        const targets = [this._elements.minHandle, this._elements.maxHandle,
                         this._elements.scaleLine, this._elements.rangeLine];

        this._slider.addEventListener('click', (e) => {
            if (targets.indexOf(e.target as HTMLElement) !== -1) {
                emitClick(e);
            }
        });

        this._slider.addEventListener('mousedown', (e) => {
            if (targets.indexOf(e.target as HTMLElement) !== -1) {
                this.elementsTransition = "0ms";
                this._slider.addEventListener('mousemove', emitClick);
            }
        });

        window.addEventListener('mouseup', () => {
            this._slider.removeEventListener('mousemove', emitClick);
            this.elementsTransition = transition;
        });
    }

    private clearSliderElementsPositions() {
        Object.keys(this._elements).forEach(elem => {
            ["width", "height", "transform", "top", "bottom", "left", "right"].forEach(style => {
                this._elements[elem].style[style] = "";
            });
        });
    }

    private alignSliderElementsPositions() {
        this._elements.minHandle.style[this.directionStyles.position] = toPercent(this.model.relRange.min);
        this._elements.minValueTooltip.style[this.directionStyles.position] = toPercent(this.model.relRange.min);
        this._elements.maxValueTooltip.style[this.directionStyles.position] = toPercent(this.model.relRange.max);

        this._elements.minValueTooltip.textContent = this.model.outputRange.min.toString();
        this._elements.maxValueTooltip.textContent = this.model.outputRange.max.toString();

        this._elements.rangeLine.style[this.directionStyles.position] = (this.model.isRange)
            ? toPercent(this.model.relRange.min)
            : toPercent(0);
        this._elements.rangeLine.style[this.directionStyles.size] = (this.model.isRange)
            ? toPercent(this.model.relRange.length)
            : toPercent(this.model.relRange.max);
        this._elements.maxHandle.style[this.directionStyles.position] = toPercent(this.model.relRange.max);

        this._elements.minHandle.style.transform = this.directionStyles.handleTransform;
        this._elements.maxHandle.style.transform = this.directionStyles.handleTransform;

        this._elements.minValueTooltip.style.transform = this.directionStyles.tooltipTransform;
        this._elements.maxValueTooltip.style.transform = this.directionStyles.tooltipTransform;
    }

    private alignSliderElementsVisibility() {
        if (this.model.isVisibleTooltip) {
            this._elements.maxValueTooltip.classList.remove("hidden");
        } else {
            this._elements.maxValueTooltip.classList.add("hidden");
        }

        if (this.model.isRange && this.model.isVisibleTooltip) {
            this._elements.minValueTooltip.classList.remove("hidden");
        } else {
            this._elements.minValueTooltip.classList.add("hidden");
        }

        if (this.model.isRange) {
            this._elements.minHandle.classList.remove("hidden");
        } else {
            this._elements.minHandle.classList.add("hidden");
        }

        if (this.model.isVisibleScale) {
            this._elements.scaleValues.classList.remove("hidden");
        } else {
            this._elements.scaleValues.classList.add("hidden");
        }
    }

    private alignSliderCSSClass() {
        if (this.model.type === "vertical") {
            this._slider.classList.add("slider__vertical");
            this._slider.classList.remove("slider__horizontal");
        } else
        if (this.model.type === "horizontal") {
            this._slider.classList.add("slider__horizontal");
            this._slider.classList.remove("slider__vertical");
        }
    }

    private get directionStyles() {
        const styles = {
            position: "",
            size: "",
            handleTransform: "",
            tooltipTransform: ""
        };

        if (this.model.type === "horizontal") {
            styles.size = "width";

            if (this.model.isReverseDirection) {
                styles.position = "right";
                styles.handleTransform = "translateX(50%)";
                styles.tooltipTransform = "translateX(50%)";
            } else {
                styles.position = "left";
                styles.handleTransform = "translateX(-50%)";
                styles.tooltipTransform = "translateX(-50%)";
            }
        } else {
            styles.size = "height";

            if (this.model.isReverseDirection) {
                styles.position = "top";
                styles.handleTransform = "translateY(-50%) rotate(90deg)";
                styles.tooltipTransform = "translateY(-50%)";
            } else {
                styles.position = "bottom";
                styles.handleTransform = "translateY(50%) rotate(90deg)";
                styles.tooltipTransform = "translateY(50%)";
            }
        }

        return styles;
    }

    private set elementsTransition(value) {
        Object.keys(this._elements).forEach((elem) => {
            if (this._elements[elem]) {
                this._elements[elem].style.transitionDuration = value;
            }
        });
    }

    private renderScaleValues() {
        this._elements.scaleValues.innerHTML = "";

        if (!this.model.isVisibleScale) return;

        this.model.scale.positions.forEach((item: number, i: number) => {
            const value = document.createElement("div");
            value.classList.add("value");
            value.textContent = this.model.scale.values[i].toString();
            value.style[this.directionStyles.position] = toPercent(item);
            value.style.transform = this.directionStyles.tooltipTransform;
            this._elements.scaleValues.append(value);
        });
    }

    private updateModelRelRange(e) {
        const getX = (e) => {
            const scaleLength = this._elements.scaleLine.getBoundingClientRect()[this.directionStyles.size];
            return getClickCoordsRelativeToBlock(e, this._elements.scaleLine)[this.directionStyles.position] / scaleLength;
        };
        this.model.updateRelRange(getX(e))
    }

    public render() {
        this.alignSliderCSSClass();
        this.alignSliderElementsVisibility();
        this.renderScaleValues();
        this.clearSliderElementsPositions();
        this.alignSliderElementsPositions();
    }

    public get model() {
        return this._model;
    }
};
