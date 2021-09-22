const flat = function (arr, newArr = []) {
    arr.forEach(item => {
        if (Array.isArray(item)) {
            flat(item, newArr)
        } else {
            newArr.push(item);
        }
    })
    return newArr
};
const flatNormal = function (arr) {
    const newArr = [];
    const stack = [];
    for (var i = arr.length - 1; i >= 0; i--) {
        stack.push(arr[i]);
    }
    while (stack.length > 0) {
        const curItem = stack.pop();
        if (Array.isArray(curItem)) {
            for (var i = curItem.length - 1; i >= 0; i--) {
                stack.push(curItem[i]);
            }
        } else {
            newArr.push(curItem);
        }
    }
    return newArr;
}
const arr = [2, 1, [2, 1, [5, 3, 9], 6], 4];

console.log(flatNormal(arr));
