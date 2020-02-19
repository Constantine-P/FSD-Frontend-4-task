function isDefined(...args): boolean {
  let bool = true;
  Array.from(args).forEach((item) => {
    if (item === undefined) bool = false;
  });
  return bool;
}

export default isDefined;
