function isValidNumberSteps(value: string): boolean {
  if (value === undefined || value === null) return false;
  if (value === '') return true;
  const productArr = value.split(' ');
  if (productArr.length === 0) return false;

  let isValid = true;
  productArr.forEach((item) => {
    const product = item.split('*');
    const isProductNotValid = (): boolean => (
      (product.length === 1 && Number(product[0]).toString() !== product[0])
      || (product.length > 2)
      || (product.length === 2 && (Number(product[0]).toString() !== product[0]
          || Number(product[1]).toString() !== product[1])));

    if (isProductNotValid()) isValid = false;
  });

  return isValid;
}

export default isValidNumberSteps;
