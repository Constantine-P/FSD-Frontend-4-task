export default function isValidNumberSteps(value: string): boolean {
  if (value === undefined || value === null) return false;
  if (value === "") return true;
  const strArr = value.split(" ");
  let isValid = true;

  if (strArr.length === 0) return false;

  strArr.forEach(item => {
    const product = item.split("*");
    const isProductElementsNotNumber = () => {
      return (Number(product[0]).toString() !== product[0]
        || Number(product[1]).toString() !== product[1])
    };

    if (product.length === 1) {
      if (Number(item).toString() !== item) {
        isValid = false;
        return;
      } else {
        return;
      }
    } else if (product.length > 2) {
      isValid = false;
      return;
    } else if (isProductElementsNotNumber()) {
      isValid = false;
      return;
    }
  });

  return isValid;
}
