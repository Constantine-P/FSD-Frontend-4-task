import minMax from "../functions/minMax";

describe("minMax", function () {
    it("minMax(0, 1, 2) === 2", function () {
        expect(minMax(0, 1, 2)).toBe(1);
    });
    it("minMax(-100, 500, -5) === -5", function () {
        expect(minMax(-100, 500, -5)).toBe(-5);
    });
    it("minMax(-100, -100500, 500) === -100", function () {
        expect(minMax(-100, -100500, 500)).toBe(-100);
    });
});