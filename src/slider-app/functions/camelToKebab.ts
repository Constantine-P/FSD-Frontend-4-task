function camelToKebab(value: string): string {
  return value
    .split('')
    .map((char) => ((char === char.toUpperCase()) ? `-${char.toLowerCase()}` : char))
    .join('');
}

export default camelToKebab;
