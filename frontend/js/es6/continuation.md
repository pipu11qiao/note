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
如果一个函数在最后调用另外一个函数，那么这种方式称为尾调用。类似Schema这类的语言会进行尾调用优化，这意味着尾调用不会导致整个函数调用的开销。取而代之的是继续的实现方式（正在执行的函数的栈结构被尾部调用的函数的栈结构替代）

附录： 继续进行延续的传递格式，让我们来瞧下面的程序：

```javascript

console.log(pythagoras(3, 4));
function pythagoras(x, y) {
    return x * x + y * y;
}
```
如果每个操作（包括 加 乘）都被写成函数形式：

```javascript
console.log(pythagoras(3, 4));
function pythagoras(x, y) {
    return add(sqare(x), sqare(y));
}
function sqare(x) {
    return multiply(x, x)
}
function multiply(x, y) {
    return x * y;
}
function add(x, y) {
    return x + y;
}
```
此外，如果我们不允许函数返回任何值那么我们必须使用延续就像：

```javascript
pythagoras(3, 4, console.log);
function pythagoras(x, y, cont) {
    square(x, function (square_x) {
        square(y, function (square_y) {
            add(square_x, square_y, cont);
        })
    })
}
function square(x, cont) {
    multiply(x, x, cont);
}
function multiply(x, y, cont) {
    cont(x * y);
}
function add(x, y, cont) {
    cont(x + y);
}
```
这种不允许返回计算值（并且必须调整调用顺序来完成延续）的编程格式，被称为延续格式。

延续格式存在两个问题：

1. 传递延续代码会增加调用栈的空间。除非你正在使用一种类似Schema的消除尾调用的语言，否则你会冒栈溢出的风险。
2. 写嵌套代码让人烦躁

第一个问题在js中通过异步调用延续可以很简单的解决。通过异步调用延续，函数在延续被调用之前返回值。因此栈空间没有增加。

```javascript
Function.prototype.async = async;

pythagoras.async(3, 4, console.log);

function pythagoras(x, y, cont) {
    square.async(x, function (square_x) {
        square.async(y, function (square_y) {
            add.async(square_x, square_y, cont);
        })
    })
}

function square(x, cont) {
    multiply.async(x,x,cont);
}

function multiply(x, y, cont) {
    cont.async(x,y);
}

function add(x, y, cont) {
    cont.async(x,y);
}

function async () {
    setTimeout.bind(null, this, 0).apply(null, arguments);
}

```
ps: 通过异步调用，使嵌套的函数在执行的时候，外层嵌套的函数会在执行完成后将结果交给异步执行器句柄（timer）,由timer来将结果带入回调中调用而不是在栈中等待所有的内部函数调用完成。

第二个问题通常通过被称为 **call-with-cuttent-continuation(callcc)**来解决。可惜**callcc**在js中不能完全被实现，但是我们可以写出一种解决其大部分使用场景的替代方法：

```javascript
pythagoras(3, 4, console.log);

function pythagoras(x, y, cont) {
    var x_square = callcc(square.bind(null, x));
    var y_square = callcc(square.bind(null, y));
    add(x_square, y_square, cont);
}

function square(x, cont) {
    multiply(x, x, cont);
}

function multiply(x, y, cont) {
    cont(x * y);
}

function add(x, y, cont) {
    cont(x + y);
}

function callcc(f) {
    var cc = function (x) {
        cc = x;
    };
    f(cc);
    return cc
}
```
**callcc** 函数接受一个函数类型参数**f**并且传入**current-continuation(简称cc)**调用它，**current-continuation**是一个延续函数在**callcc**被调用后包裹函数体剩下的部分

来看下**pythagoras**函数体：

```javascript
    var x_square = callcc(square.bind(null, x));
    var y_square = callcc(square.bind(null, y));
    add(x_square, y_square, cont);
```
第二个**callcc**的**current-continuation**函数是：

```javascript
function cc(y_square) {
    add(x_square, y_square, cont);
}
```
类似的，第一个**callcc**的**current-continuation**是：

```javascript
function cc(x_square) {
    var y_square = callcc(square.bind(null, y));
    add(x_square, y_square, cont);
}
```
因为第一个**callcc**的**current-continuation**包含另外一个**callcc**,它必须转换成延续格式：

```javascript
function cc(x_squared) {
    square(y, function cc(y_squared) {
        add(x_squared, y_squared, cont);
    });
}
```
所以实质上**callcc**逻辑上将整个函数体经转换又回到最开始的样子（并且给那些匿名函数命名为cc）.pythagoras 使用这种实现方式的callcc 变成：

```javascript
function pythagoras(x, y, cont) {
    callcc(function(cc) {
        square(x, function (x_squared) {
            square(y, function (y_squared) {
                add(x_squared, y_squared, cont);
            });
        });
    });
}
```
虽然在js中不能够实现**callcc**，但是可以在延续风格中实现它如：

```javascript
Function.prototype.async = async;

pythagoras.async(3, 4, console.log);

function pythagoras(x, y, cont) {
    callcc.async(square.bind(null, x), function cc(x_squared) {
        callcc.async(square.bind(null, y), function cc(y_squared) {
            add.async(x_squared, y_squared, cont);
        });
    });
}

function square(x, cont) {
    multiply.async(x, x, cont);
}

function multiply(x, y, cont) {
    cont.async(x * y);
}

function add(x, y, cont) {
    cont.async(x + y);
}

function async() {
    setTimeout.bind(null, this, 0).apply(null, arguments);
}

function callcc(f, cc) {
    f.async(cc);
}
```
> 什么是callcc?
> 为什么在**current-continuation**中调用另一个callcc需要将该callcc转化成continuation风格?
> 如果js中不能实现call，那么最后的代码对于解决嵌套代码书写的意义何在？
##### 参考链接
[What's the difference between a continuation and a callback?](https://stackoverflow.com/questions/14019341/whats-the-difference-between-a-continuation-and-a-callback)


