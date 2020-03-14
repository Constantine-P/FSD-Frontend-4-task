function findClosest(Arr: number[], value: number, previousValue?: number): number {
  if (Arr.length === 0) return value;

  let low = 0;
  let high = Arr.length - 1;
  let mid;

  if (value > Arr[high]) {
    return Arr[high];
  } if (value < Arr[low]) {
    return Arr[low];
  }

  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (Arr[mid] === value) {
      return Arr[mid];
    } if (Arr[mid] < value) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  let result: number;

  if (Math.abs(Arr[high] - value) < Math.abs(Arr[low] - value)) {
    result = Arr[high];
  } else {
    result = Arr[low];
  }

  if (result === previousValue) {
    const side = (value - result > 0) ? 1 : -1;
    result = (result === Arr[high]) ? Arr[high + side] : Arr[low + side];
  }
  return result;
}

export default findClosest;
