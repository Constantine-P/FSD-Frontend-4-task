function isSimpleNumber(value: number, from = 2): boolean {
  for (let i = from; i < value; i += 1) {
    if (value % i === 0) return false;
  }
  return true;
}

export default isSimpleNumber;
