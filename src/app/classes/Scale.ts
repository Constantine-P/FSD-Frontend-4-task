import Range from "./Range";
import IScale from "../interfaces/IScale";

export default class Scale extends Range {
    private _steps: string;

    constructor(scale: IScale = { min: 0, max: 0, steps: ""}) {
        super(scale);
        this._steps = scale.steps;
    }

    private get parseSteps() {
        if (this.steps === "") return [];
        const arr = [];
        this.steps.split(" ").forEach( (item: string) => {
            if (item.split("*").length === 2) {
                const quantity = +item.split("*")[0];
                const value = +item.split("*")[1];
                arr.push(...(value + "~").repeat(quantity).slice(0, -1).split("~").map(Number));
            } else {
                arr.push(+item);
            }
        });
        arr.reduce((prev, curr, i) => arr[i] = prev + curr);
        return arr;
    }

    get steps() {
        return this._steps;
    }

    set steps(value) {
        this._steps = value;
    }

    get positions() {
        return this.values.map(item => (item - this.min) / this.length)
    }

    get values() {
        const steps = this.parseSteps;

        if (steps.length === 0) return [];

        let array = [this.min];

        if (steps.length === 1) {
            const step = steps[0];
            const n = this.length / step + 1;

            for (let i = 1; i < n; i++) {
                array.push(step * i + this.min);
            }

            while (array.slice(-1)[0] > this.max) {
                array.pop();
            }

            if (array.slice(-1)[0] < this.max) {
                array.push(this.max);
            }

            return array;
        }

        array = array.concat(steps.map(item => item + this.min));

        while (array.slice(-1)[0] > this.max) {
            array.pop();
        }

        if (array.slice(-1)[0] < this.max) {
            array.push(this.max);
        }
        return array;
    }
}