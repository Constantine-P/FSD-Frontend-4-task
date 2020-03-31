function isNumeric(...args: any[]): boolean {
  let bool = true;
  Array.from(args).forEach((item) => {
    if (Number.isNaN(item) || typeof item !== 'number') {
      bool = false;
    }
  });
  return bool;
}

export default isNumeric;
