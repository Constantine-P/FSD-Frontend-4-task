import Range from "../classes/Range";

describe("test Range", function () {
    it("test getters", function () {
        const range = new Range( { min: -100, max: 100 } );
        expect(range.min).toBe(-100);
        expect(range.max).toBe(100);
        expect(range.length).toBe(200);
    });

    it("test set min", function () {
        const range = new Range( { min: -100, max: 100 } );

        range.min = -200;
        expect(range.min).toBe(-200);

        range.min = 0;
        expect(range.min).toBe(0);

        range.min = 200;
        expect(range.min).toBe(100);
    });

    it("test set max", function () {
        const range = new Range( { min: -100, max: 100 } );

        range.max = 200;
        expect(range.max).toBe(200);

        range.max = 0;
        expect(range.max).toBe(0);

        range.max = -200;
        expect(range.max).toBe(-100);
    });

    it("test set non valid min, max", function () {
        const range = new Range( { min: -100, max: 100 } );

        // @ts-ignore
        range.min = "-200";
        expect(range.min).toBe(0);

        // @ts-ignore
        range.max = "200";
        expect(range.min).toBe(0);

    });
});
