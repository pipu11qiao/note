#### 延续（continuation）和回调（callback）之间的区别

我相信延续是回调的一个特例。一个函数可以回调任意数量的函数，任意的次数调用。例如：
```javascript
var array = [1,2,3];

forEach(array, function(element, array, index){
    array[index] = 2 * element;
});

console.log(array);

function ForEach(array,callback){
    var length = array.length;
    for(var i = 0; i < length; i++){
        callback(array[i], array, i);
    }
}
```

然而如果一个函数把回调另一个函数作为其最后执行的部分，那么第二个函数就称为第一个的延续。例如：

```javascript
var array = [1, 2, 3];

forEach(array, function (element, array, index) {
    array[index] = 2 * element;
});

console.log(array);

function ForEach(array, callback) {
    var length = array.length;

    cont(0);// forEach 函数最后一步执行cont，cont就是forEach的延续

    function cont(index) {
        if (index < length) {
            callback(array[index], array, index);

            cont(index++); // cont 方法的最后一步， 所以cont是它自己的延续

        }

    }
}

```
如果一个函数在最后调用另外一个函数，那么这种方式称为尾调用。类似Schema这类的语言会进行尾调用优化，这意味着尾调用不会导致整个函数调用的开销。

