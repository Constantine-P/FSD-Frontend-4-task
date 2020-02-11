import findClosest from "../functions/findClosest";

describe("test findClosest", function () {
    it("test findClosest", function () {
        expect(findClosest([0, 1, 2, 3, 33, 44, 111], 200)).toBe(111);
        expect(findClosest([0, 1, 2, 3, 33, 44, 111], -100)).toBe(0);
        expect(findClosest([0, 1, 2, 3, 33, 44, 111], 20)).toBe(33);
        expect(findClosest([0, 1, 2, 3, 33, 44, 111], 5)).toBe(3);
    });
});
