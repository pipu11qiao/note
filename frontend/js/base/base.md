#### sort 总是用不对
The sort() method sorts the elements of an array in place and returns the sorted array. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.

默认的排序方式是升序，将元素转为字符串，比较其utf-16的编码值

```javascript

const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]

const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// expected output: Array [1, 100000, 21, 30, 4]

```

函数参数，compareFunction
函数返回值： 排序完的数组，注意是原来的数组也排序了

如果有比较函数，会根据比较函数的返回值进行排序。（所有的undefined 会排在最后，不会调用比较函数）

```javascript
const arr = [undefined,1,2,undefined,4,undefined,5];
arr.sort((a,b)=>{
  console.log('a b',a,b);
  return b-a;
});
console.log(arr)

/* 
a b 2 1
 a b 4 2
 a b 5 4
[5, 4, 2, 1, undefined, undefined, undefined]
*/
```

| compareFunction(a,b) return value | sort order |
|--|--|
| >0 | 把b排在a前| 
| <0 | 把b排在a后| 
| ===0 | a,b保持原位| 

大于0，b在前，小于0，b在后


#### blob file arrayBuffer 相关
