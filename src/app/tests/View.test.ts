import View from "../layers/View";
import {SliderType} from "../types/SliderType";
import '@testing-library/jest-dom';

require('jsdom-global')();

describe("test View", function () {
    const options = {
        range: {
            min: 2,
            max: 8,
        },
        scale: {
            min: 0,
            max: 10,
            steps: "1"
        },

        type: "horizontal" as SliderType,
        isRange: true,
        isVisibleTooltip: true,
        isVisibleScale: true,
        isReverseDirection: false
    };

    describe("test default state", function () {
        document.body.innerHTML = `<div class="slider"></div>`;
        const slider = document.querySelector(".slider") as HTMLElement;
        const view = new View(slider, options);
        view.model.outputRange = options.range;
        view.render();

        describe("test existence of elements", function () {
            it("scale-line in doc", function () {
                expect(slider.querySelector(".scale-line")).not.toBeNull();
            });

            it("range-line in doc", function () {
                expect(slider.querySelector(".range-line")).not.toBeNull();
            });

            it("min-handle in doc", function () {
                expect(slider.querySelector(".min-handle")).not.toBeNull();
            });

            it("max-handle in doc", function () {
                expect(slider.querySelector(".max-handle")).not.toBeNull();
            });

            it("min-value-tooltip in doc", function () {
                expect(slider.querySelector(".min-value-tooltip")).not.toBeNull();
            });

            it("max-value-tooltip in doc", function () {
                expect(slider.querySelector(".max-value-tooltip")).not.toBeNull();
            });

            it("scale-values in doc", function () {
                expect(slider.querySelector(".scale-values")).not.toBeNull();
            });

            it("slider-inner in doc", function () {
                expect(slider.querySelector(".slider-inner")).not.toBeNull();
            });

        });

        describe("test visibility of elements", function () {

            it("scale-line is visible", function () {
                expect(slider.querySelector(".scale-line")).not.toHaveClass("hidden");
            });

            it("range-line is visible", function () {
                expect(slider.querySelector(".range-line")).not.toHaveClass("hidden");
            });

            it("min-handle is visible", function () {
                expect(slider.querySelector(".min-handle")).not.toHaveClass("hidden");
            });

            it("max-handle is visible", function () {
                expect(slider.querySelector(".max-handle")).not.toHaveClass("hidden");
            });

            it("min-value-tooltip is visible", function () {
                expect(slider.querySelector(".min-value-tooltip")).not.toHaveClass("hidden");
            });

            it("max-value-tooltip is visible", function () {
                expect(slider.querySelector(".max-value-tooltip")).not.toHaveClass("hidden");
            });

            it("scale-values is visible", function () {
                expect(slider.querySelector(".scale-values")).not.toHaveClass("hidden");
            });

            it("slider-inner is visible", function () {
                expect(slider.querySelector(".slider-inner")).not.toHaveClass("hidden");
            });
        });

        describe("test value-tooltips text", function () {

            it("minValue", function () {
                expect(slider.querySelector(".min-value-tooltip")).toHaveTextContent("2");
            });

            it("maxValue", function () {
                expect(slider.querySelector(".max-value-tooltip")).toHaveTextContent("8");
            });
        });
    });

    describe("test get model", function () {
        document.body.innerHTML = `<div class="slider"></div>`;
        const slider = document.querySelector(".slider") as HTMLElement;
        const view = new View(slider, options);
        view.model.outputRange = options.range;
        view.render();

        it("test get model", function () {
            expect(view.model).toBeDefined();
        });
    });

    describe("test render()", function () {
        document.body.innerHTML = `<div class="slider"></div>`;
        const slider = document.querySelector(".slider") as HTMLElement;
        const view = new View(slider, options);
        view.model.outputRange = options.range;
        view.model.isVisibleTooltip = false;
        view.model.isVisibleScale = false;
        view.model.isRange = true;
        view.model.type = "vertical";
        view.model.updateRelRange(0.2);
        view.model.updateRelRange(0.9);
        view.render();

        it("scale-line is visible", function () {
            expect(slider.querySelector(".scale-line")).not.toHaveClass("hidden");
        });

        it("range-line is visible", function () {
            expect(slider.querySelector(".range-line")).not.toHaveClass("hidden");
        });

        it("min-handle is visible", function () {
            expect(slider.querySelector(".min-handle")).not.toHaveClass("hidden");
        });

        it("max-handle is visible", function () {
            expect(slider.querySelector(".max-handle")).not.toHaveClass("hidden");
        });

        it("min-value-tooltip is visible", function () {
            expect(slider.querySelector(".min-value-tooltip")).toHaveClass("hidden");
        });

        it("max-value-tooltip is visible", function () {
            expect(slider.querySelector(".max-value-tooltip")).toHaveClass("hidden");
        });

        it("scale-values is visible", function () {
            expect(slider.querySelector(".scale-values")).toHaveClass("hidden");
        });

        it("slider-inner is visible", function () {
            expect(slider.querySelector(".slider-inner")).not.toHaveClass("hidden");
        });

        it("test handles positions ", function () {
            expect((slider.querySelector(".min-handle") as HTMLElement).style.bottom).toBe("20%");
            expect((slider.querySelector(".max-handle") as HTMLElement).style.bottom).toBe("90%");
        });

    });
});
