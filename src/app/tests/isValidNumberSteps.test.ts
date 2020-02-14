import isValidNumberSteps from "../functions/isValidNumberSteps";

describe("isValidNumberSteps", function () {
    it("''", function () {
        expect(isValidNumberSteps("")).toBe(true);
    });

    it("0", function () {
        expect(isValidNumberSteps("0")).toBe(true);
    });

    it("12 13 14", function () {
        expect(isValidNumberSteps("12 13 14")).toBe(true);
    });

    it("12.1 13.5 -54.4", function () {
        expect(isValidNumberSteps("12.1 13.5 -54.4")).toBe(true);
    });

    it("asd 13 14", function () {
        expect(isValidNumberSteps("asd 13 14")).toBe(false);
    });

    it("12 13 14a", function () {
        expect(isValidNumberSteps("12 13 14a")).toBe(false);
    });

    it("12 % 14", function () {
        expect(isValidNumberSteps("12 % 14")).toBe(false);
    });

    it("1123sdfsdf", function () {
        expect(isValidNumberSteps("1123sdfsdf")).toBe(false);
    });

    it("undefined", function () {
        expect(isValidNumberSteps(undefined)).toBe(false);
    });

    it("5*20", function () {
        expect(isValidNumberSteps("5*20")).toBe(true);
    });

    it("5*20", function () {
        expect(isValidNumberSteps("5*20 4*5.5 2*1.1")).toBe(true);
    });

});
