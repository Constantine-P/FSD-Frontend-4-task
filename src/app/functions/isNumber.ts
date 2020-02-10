export default function isNumber(value: any): boolean {
    return !isNaN(value) && (typeof value === "number");
}
