import isNumeric from './isNumeric';

function normalizeToNum(value: any, valueInstead = 0): number {
  return (isNumeric(value)) ? value : valueInstead;
}

export default normalizeToNum;
