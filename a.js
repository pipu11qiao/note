// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
function getMaxStr(str) {
  let r = 0;
  let len = str.length;
  let map = {};
  let max = 1;
  let l = 0;
  for (; r < len; r++) {
    let cur = str[r];
    if (map[cur] !== undefined) {
      let index = map[cur];
      if (index >= l) {
        l = index + 1;
      }
    }
    max = Math.max(max, r - l + 1);
    map[cur] = r;
  }
  return max;
}

function test() {
  let fun = getMaxStr;
  let params = [
    //[1, 1, 1, 0]
    // "abcdbab",
    // "bbbbb"
    "pwwkew"
  ];

  const res = fun.apply(null, params);
  console.log(`res`, res);
}
test();
