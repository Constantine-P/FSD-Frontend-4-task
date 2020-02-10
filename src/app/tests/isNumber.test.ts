import isNumber from "../functions/isNumber";

describe("isNumber", function () {
    it("0", function () {
        expect(isNumber(0)).toBe(true);
    });

    it("1.23", function () {
        expect(isNumber(1.23)).toBe(true);
    });

    it("-12.34", function () {
        expect(isNumber(-12.34)).toBe(true);
    });

    it('"0"', function () {
        expect(isNumber("0")).toBe(false);
    });

    it("asd", function () {
        expect(isNumber("0")).toBe(false);
    });

    it("[123]", function () {
        expect(isNumber([123])).toBe(false);
    });

    it("-12.34", function () {
        expect(isNumber("-12.34")).toBe(false);
    });

    it("NaN", function () {
        expect(isNumber(NaN)).toBe(false);
    });

    it("undefined", function () {
        expect(isNumber(undefined)).toBe(false);
    });

    it("null", function () {
        expect(isNumber(null)).toBe(false);
    });
});
