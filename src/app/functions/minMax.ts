export default function minMax(min: number, value: number, max: number): number {
    return Math.max(Math.min(value, max), min);
}