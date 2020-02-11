import camelToKebab from "../functions/camelToKebab";

describe("test camelToKebab", function () {
    it("test camelToKebab", function () {
        expect(camelToKebab("someVariableName")).toBe("some-variable-name");
    });
});