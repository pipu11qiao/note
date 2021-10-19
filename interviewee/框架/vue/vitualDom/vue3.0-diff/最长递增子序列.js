/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    const resArr = [];
    for (let i = 0; i < nums.length; i++) {
        let curRes = null;
        let curNum = nums[i];
        for (j = 0; j < resArr.length; j++) {
            const curArr = resArr[j];
            let lastNum = curArr[curArr.length - 1];
            if (lastNum < curNum &&
                (curRes === null || curRes.length < curArr.length)
            ) {
                curRes = [...curArr]
            }
        }
        curRes = curRes || []
        curRes.push(curNum);
        resArr.push(curRes)
    }
    let max = 0;
    resArr.forEach(item => {
        if (item.length > max) {
            max = item.length;
        }
    })
    return max
};
const res = lengthOfLIS(nums);
console.log('res', res);
