export default function isValidNumberSteps(value: string): boolean {
    if (value === undefined || value === null) return false;
    if (value === "") return true;
    const strArr = value.split(" ");
    let isValid = true;

    if (strArr.length === 0) return false;

    strArr.forEach(item => {
        if (Number(item).toString() !== item) {
            isValid = false;
            return;
        }
    });

    return isValid;
}
