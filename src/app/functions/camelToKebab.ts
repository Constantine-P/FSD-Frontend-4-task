export default function camelToKebab(value: string) {
    return value
        .split("")
        .map(char => (char === char.toUpperCase()) ? "-" + char.toLowerCase() : char)
        .join("")
}