import Model from "../layers/Model";
import {SliderType} from "../types/SliderType";

describe("test Model", function () {
    const options = {
        range: {
            min: 2,
            max: 8,
        },
        scale: {
            min: -5,
            max: 10,
            steps: "1"
        },
        isVisibleTooltip: true,
        isRange: true,
        isVisibleScale: true,
        isReverseDirection: false,
        type: <SliderType>"horizontal",
    };

    it("test get range", function () {
        const model = new Model(options);
        expect(model.range.min).toBe(2);
        expect(model.range.max).toBe(8)
    });

    it("test set range", function () {
        const model = new Model(options);
        model.range = {
            min: -100500,
            max: 100500
        };

        expect(model.range.min).toBe(-5);
        expect(model.range.max).toBe(10);
    });

    it("test get relRange", function () {
        const model = new Model(options);
        expect(model.relRange).toStrictEqual({ min: 7/15, max: 13/15 });
    });

    it("test set relRange", function () {
        const model = new Model(options);
        model.relRange = {
            min: 0.1,
            max: 0.9
        };
        expect(model.range.min).toBe(-3.5);
        expect(model.range.max).toBe(8.5);
    });

    it("test get scale", function () {
        const model = new Model(options);
        expect(model.scale.min).toBe(-5);
        expect(model.scale.max).toBe(10);
        expect(model.scale.steps).toBe("1");
    });

    it("test set scale", function () {
        const model = new Model(options);
        model.scale = {
            min: -100,
            max: 100,
            steps: "75"
        };

        expect(model.scale.min).toBe(-100);
        expect(model.scale.max).toBe(100);
        expect(model.scale.steps).toStrictEqual("75");
    });

    it("test get exportedData", function () {
        const model = new Model(options);
        expect(model.exportedData).toStrictEqual({ min: 2, max: 8 });
    });

});