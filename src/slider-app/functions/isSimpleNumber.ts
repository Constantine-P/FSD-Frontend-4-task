function isSimpleNumber(value: number) {
  for (let i = 2; i < value; i += 1) {
    if (value % i === 0) return false;
  }
  return true;
}

export default isSimpleNumber;
