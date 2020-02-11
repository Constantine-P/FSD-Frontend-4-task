export default function findClosest(Arr, value) {
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
        }
        else if (Arr[mid] < value) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }

    if (Math.abs(Arr[high] - value) < Math.abs(Arr[low] - value)) {
        return Arr[high];
    } else {
        return Arr[low];
    }
};