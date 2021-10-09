const {checkSortMethod, swap} = require('./util.js');

function heapify(arr) {
    const len = arr.length;
    for (let i = len - 1; i >= 0; i--) {

    }
    for (let i = 0; i < arr.length; i++) {
        const cur = arr[i];
        const left = arr[2 * i + 1];
        const right = arr[2 * i + 2];
        let swapIndex = -1;
        if (2 * i + 1 <= len - 1) {
            if (cur < left || (2 * i + 2 < len - 1 && cur < right)) {
                swapIndex = 2 * i + 1;
                if (2 * i + 2 < len - 1 && right > left) {
                    swapIndex = 2 * i + 2;
                }
            }
        }
        if (swapIndex > -1) {
            swap(arr, i, swapIndex);
            let index = i;
            let parentIndex = Math.floor((index - 1) / 2);
            while (parentIndex > -1) {
                if (arr[parentIndex] < arr[index]) {
                    swap(arr, index, parentIndex);
                    index = parentIndex
                    parentIndex = Math.floor((index - 1) / 2);
                } else {
                    break
                }
            }
        }
    }

}


function move(arr, len) {
    let pIndex = 0;
    let leftIndex = 2 * pIndex + 1;
    let rightIndex = 2 * pIndex + 2;
    while (leftIndex <= len) {
        let index = leftIndex;
        if (arr[pIndex] >= arr[leftIndex] && (rightIndex <= len ? arr[pIndex] >= arr[rightIndex] : true)) {
            break
        } else {
            let index = leftIndex;
            if (rightIndex <= len && arr[rightIndex] > arr[leftIndex]) {
                index = rightIndex
            }
            swap(arr, index, pIndex);
            pIndex = index;
            leftIndex = 2 * pIndex + 1;
            rightIndex = 2 * pIndex + 2;
        }
    }
}

function heapSort(arr) {
    heapify(arr);
    const len = arr.length;
    for (let i = len - 1; i > 0; i--) {
        swap(arr, 0, i);
        move(arr, i - 1);
    }
}


const arr = [3, 5, 7, 9, 4, 10];
heapSort(arr)
// heapify(arr);
console.log(arr)
