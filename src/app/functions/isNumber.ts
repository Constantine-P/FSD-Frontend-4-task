function isNumber(value): boolean {
  return !Number.isNaN(value) && (typeof value === 'number');
}

export default isNumber;
