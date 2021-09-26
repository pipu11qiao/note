JS闭包

在stackoverflow看到的一个关于闭包的问题，讲的很透彻。
原问题大概是：
一个包含setTimeout的循环，输出对应的index,可以看到这种情况如果想对应的输出0-9，需要使用闭包来完成:

```javascript
for(var i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
```
A的方案是：

```javascript
for(var i = 0; i < 10; i++) {
    (function(){
        var i2 = i;
        setTimeout(function(){
            console.log(i2);
        }, 1000)
    })();
}
// 结果是0-9
```

B的方案是：

```javascript
for(var i = 0; i < 10; i++) {
    setTimeout((function(i2){
        return function() {
            console.log(i2);
        }
    })(i), 1000);
}
// 结果是0-9
```
在我们一般的理解中B的方案是一个典型的闭包，一个函数F返回一个包含F内部变量的函数。但是A方案也能够正确的输出，那么A是闭包么？

js中所有的函数都是闭包（可以查看这些文章，[Understanding JavaScript Closures](https://javascriptweblog.wordpress.com/2010/10/25/understanding-javascript-closures/), [闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures))。然而我们只关心这些函数的子集，从理论上来说很有意思的部分。之后闭包所指的就是这些子集：

对于闭包一个简单的解释：
1. 有一个函数F
2. 列出F所有的变量
3. 变量分为两种类型
    1. 局部变量(绑定变量)
    2. 非局部变量(自由变量)
4. 如果F没有非局部变量那么它不可能是一个闭包
5. 如果F含有任一个非局部变量（在F的父作用域中定义的），那么：
    1. 必须有一个F的父作用域，创建了此对于F来说是非局部变量
    2. 如果F被从哪个负作用域的外面引用了，那么F就变成了一个对于此非局部变量的闭包
    3. 那个非局部变量成为闭包F的提升值。


下面根据此概念来分析开始的A和B方案：

A:
```javascript

for (var i = 0; i < 10; i++) {
    (function f() {
        var i2 = i;
        setTimeout(function g() {
            console.log(i2);
        }, 1000);
    })();
}
```
对于函数f来说：
1. 列举变量：i2,g是局部变量，i，setTimeout,console是非局部变量
2. 查看非局部变量定义的作用域： 三者都是在全局定义的
3. f函数是在什么作用域被引用：全局作用域
    1. i没有被f所保存
    2. setTimeout没有被f所保存
    3. console没有被f所保存
所以f不是闭包

对于函数g来说
1. 列举变量：
    1. console 是一个非局部变量
    2. i2是一个非局部变量
2. 查看非局部变量定义的作用域： 三者都是在全局定义的
    1. console 是全局变量
    2. i2是绑定在f的作用域
3. 在哪个作用域被引用： setTimeout作用域
    1. console没有被g保存
    2. i2被g保存
因此g函数是相对于变量i2的一个闭包当它在setTimeout中被引用。

B：

```javascript
for (var i = 0; i < 10; i++) {
    setTimeout((function f(i2) {
        return function g() {
            console.log(i2);
        };
    })(i), 1000);
}
```

对于函数f来说：
1. 列举变量：i2,g是局部变量，console是非局部变量
2. 查看非局部变量定义的作用域： 全局定义的
3. f函数是在什么作用域被引用：全局作用域
    3. console没有被f所保存
所以f不是闭包

对于函数g来说
1. 列举变量：
    1. console 是一个非局部变量
    2. i2是一个非局部变量
2. 查看非局部变量定义的作用域： 三者都是在全局定义的
    1. console 是全局变量
    2. i2是绑定在f的作用域
3. 在哪个作用域被引用： setTimeout作用域
    1. console没有被g保存
    2. i2被g保存
因此g函数是相对于变量i2的一个闭包当它在setTimeout中被引用。

简单的解释一下为什么所有的函数都是闭包：

让我们看下西面的程序

```javascript
// 词法作用域 语言作用域
lexicalScope();

function lexicalScope() {
    var message = "This is the control. You should be able to see this message being alerted.";

    regularFunction();

    function regularFunction() {
        alert(eval("message"));
    }
}
```
1. 从上面的定义中我们知道lexicalScope和regularFunction都不是闭包
2. 我们想在执行改程序的时候弹出message因为regularFunction中可以访问父作用域中的变量message
3. 当我们执行程序时，我们看到message被弹出了。

我们再看另外的一个程序：

```javascript
var closureFunction = lexicalScope();

closureFunction();

function lexicalScope() {
    var message = "This is the alternative. If you see this message being alerted then in means that every function in JavaScript is a closure.";

    return function closureFunction() {
        alert(eval("message"));
    };
}
```
1. 从上面的定义中我们知道closureFunction是闭包
2. 我们想在执行改程序的时候弹出message因为closureFunction中可以访问父作用域中的变量message
3. 当我们执行程序时，我们看到message被弹出了。

我们能发现什么？
1. js 解释器对于其他函数和闭包函数没有什么不同
2. 每个函数都将作用域链保存在自身。闭包函数没有一个不同的变量引用环境
3. 闭包就像其他函数一样，我们称之为闭包，当函数在非其创建的作用域外被引用。因为这是个很有意思的例子。

