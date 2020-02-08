import Scale from "../classes/Scale";

describe("test Scale", function () {
    it("test get steps", function () {
        const scale = new Scale( { min: -100, max: 100, steps: "50" } );
        expect(scale.steps).toBe("50");
    });

    it("test set steps", function () {
        const scale = new Scale( { min: -100, max: 100, steps: "50" } );
        scale.steps = "10 20 30";
        expect(scale.steps).toBe("10 20 30");
    });

    it("test get values", function () {
        const scale = new Scale( { min: -100, max: 100, steps: "50" } );
        expect(scale.values).toStrictEqual([-100, -50, 0, 50, 100]);

        scale.steps = "10 20 30";
        expect(scale.values).toStrictEqual([-100, -90, -70, -40, 100]);
    });

    it("test get positions", function () {
        const scale = new Scale( { min: -100, max: 100, steps: "50" } );
        expect(scale.positions).toStrictEqual([0.00, 0.25, 0.50, 0.75, 1.00]);

        scale.steps = "10 20 30";
        expect(scale.positions).toStrictEqual([0, 0.05, 0.15, 0.3, 1]);
    });
});