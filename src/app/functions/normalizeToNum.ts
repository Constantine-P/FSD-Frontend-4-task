import isNumber from './isNumber';

function normalizeToNum(value): number {
  return (isNumber(value)) ? value : 0;
}

export default normalizeToNum;
