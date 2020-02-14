export default function findClosest(Arr: number[], value: number, previousValue?: number) {
  let low = 0;
  let high = Arr.length - 1;
  let mid;

  if (value > Arr[high]) {
    return Arr[high];
  } else if (value < Arr[low]) {
    return Arr[low];
  }

  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (Arr[mid] == value) {
      return Arr[mid];
    } else if (Arr[mid] < value) {
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
  if (previousValue !== undefined && result === previousValue && (value - result > 0)) {
    result = (result === Arr[high]) ? Arr[high + 1] : Arr[low + 1];
  } else if (previousValue !== undefined && result === previousValue && (value - result < 0)) {
    result = (result === Arr[high]) ? Arr[high - 1] : Arr[low - 1];
  }
  return result;
};
