import ViewModel from "../layers/ViewModel";
import {SliderType} from "../types/SliderType";
import Range from "../classes/Range";

describe("test ViewModel", function () {
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
        isReverseDirection: true,
        type: <SliderType>"horizontal",
    };


    it("test get relRange", function () {
        const viewModel = new ViewModel(options);
        expect(viewModel.relRange.min).toBe(0);
        expect(viewModel.relRange.max).toBe(1);
        expect(viewModel.relRange.length).toBe(1);
    });

    it("test set relRange", function () {
        const viewModel = new ViewModel(options);
        viewModel.relRange = { min: 0.2, max: 0.7 } as Range;
        expect(viewModel.relRange.min).toBe(0.2);
        expect(viewModel.relRange.max).toBe(0.7);
        expect(viewModel.relRange.length).toBeCloseTo(0.5);
    });


    it("test get scale", function () {
        const viewModel = new ViewModel(options);
        expect(viewModel.scale).toStrictEqual({ positions: [], values: [] });
    });

    it("test set scale", function () {
        const viewModel = new ViewModel(options);
        viewModel.scale = { positions: [1, 2, 3,], values: [4, 5, 6] };
        expect(viewModel.scale).toStrictEqual({ positions: [1, 2, 3,], values: [4, 5, 6] });
    });


    it("test get type", function () {
        const viewModel = new ViewModel(options);
        expect(viewModel.type).toBe("horizontal");
    });

    it("test set type", function () {
        const viewModel = new ViewModel(options);
        viewModel.type = "vertical";
        expect(viewModel.type).toBe("vertical");
    });


    it("test get isRange", function () {
        const viewModel = new ViewModel(options);
        expect(viewModel.isRange).toBe(true);
    });

    it("test set isRange", function () {
        const viewModel = new ViewModel(options);
        viewModel.isRange = false;
        expect(viewModel.isRange).toBe(false);
    });


    it("test get isVisibleTooltip", function () {

        const viewModel = new ViewModel(options);
        expect(viewModel.isVisibleTooltip).toBe(true);
    });

    it("test set isVisibleTooltip", function () {
        const viewModel = new ViewModel(options);
        viewModel.isVisibleTooltip = false;
        expect(viewModel.isVisibleTooltip).toBe(false);
    });


    it("test get isVisibleScale", function () {
        const viewModel = new ViewModel(options);
        expect(viewModel.isVisibleScale).toBe(true);
    });

    it("test set isVisibleScale", function () {
        const viewModel = new ViewModel(options);
        viewModel.isVisibleScale = false;
        expect(viewModel.isVisibleScale).toBe(false);
    });


    it("test get isReverseDirection", function () {
        const viewModel = new ViewModel(options);
        expect(viewModel.isReverseDirection).toBe(true);
    });

    it("test set isReverseDirection", function () {
        const viewModel = new ViewModel(options);
        viewModel.isReverseDirection = false;
        expect(viewModel.isReverseDirection).toBe(false);
    });


    it("test get range", function () {
        const viewModel = new ViewModel(options);
        expect(viewModel.range).toStrictEqual({ min: 2, max: 8 });
    });

    it("test set range", function () {
        const viewModel = new ViewModel(options);
        viewModel.range = { min: 123, max: 456 };
        expect(viewModel.range).toStrictEqual({ min: 123, max: 456 });
    });

    it("test updateRelRange", function () {
        const viewModel = new ViewModel(options);
        viewModel.updateRelRange(0.6);
        expect(viewModel.relRange.range).toStrictEqual({ min: 0, max: 0.6 });

        viewModel.updateRelRange(0.2);
        expect(viewModel.relRange.range).toStrictEqual({ min: 0.2, max: 0.6 });

        viewModel.scale = { positions: [0.1, 0.3, 0.7, 1], values: [1, 2, 3, 4] };

        viewModel.updateRelRange(0.25);
        viewModel.updateRelRange(0.8);
        expect(viewModel.relRange.range).toStrictEqual({ min: 0.3, max: 0.7 });
    });
});
