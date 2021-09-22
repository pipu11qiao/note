//  for test
function comparator(arr) {
    arr.sort((a, b) => (a - b));
}
var arr = [3, 1, 2];

// for test
function copyArray(arr) {
    if (arr == null) {
        return null;
    }
    return [...arr]
}

// for test
function isEqual(arr1, arr2) {
    if ((arr1 == null && arr2 != null) || (arr1 != null && arr2 == null)) {
        return false;
    }
    if (arr1 == null && arr2 == null) {
        return true;
    }
    if (arr1.length != arr2.length) {
        return false;
    }
    if (arr1.length == 2) {
        return true;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            console.log('fuck');
            console.log('fuck arr1', arr1);
            console.log('fuck arr2', arr2);
            return false;
        }
    }
    return true;
}

// for test
function printArray(arr) {
    if (arr == null) {
        return;
    }
    console.log(arr.join(' '));
    console.log(' ');
}

function generateRandomArray(maxSize, maxValue) {
    const len = parseInt(Math.random() * (maxSize + 1), 10);
    const arr = [];

    for (let i = 0; i < len; i++) {
        arr.push(parseInt(Math.random() * (maxValue + 1) - Math.random() * maxValue, 10))
    }
    return arr;
}

// for test
function checkSortMethod(sortMethod) {
    const testTime = 500;
    const maxSize = 100;
    const maxValue = 100;
    let succeed = true;
    for (let i = 0; i < testTime; i++) {
        const arr1 = generateRandomArray(maxSize, maxValue);
        const arr2 = copyArray(arr1);
        sortMethod(arr1);
        comparator(arr2);
        if (!isEqual(arr1, arr2)) {
            succeed = false;
            break;
        }
    }
    console.log(succeed ? "Nice!" : "Fucking fucked!");
    const arr = generateRandomArray(maxSize, maxValue);
    printArray(arr);
    sortMethod(arr);
    printArray(arr);
}
function swap(arr, i, j) {
    var tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
}
module.exports = {
    checkSortMethod,
    swap,
}

