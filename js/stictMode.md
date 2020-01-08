严格模式是爱es5中新增的特性

严格模式通过几方面来提供帮助：

* 捕获一些常见的代码错误，抛出异常
* 阻止或抛出错误，当“不安全”相关的的指令执行（如获取全局对象的访问权限）
* 禁用一些令人困惑和不好的特性

开启方式：

* 全局 "use strict"
* 在函数作用域

```javascript
function imStrict(){
  "use strict";
  // ...code ...
}
```

##### 具体的一些变化 #####

##### 变量和属性

变量必须被定义,否则抛出异常。原来直接给为定义的变量赋值了
可写特性为false的属性不能被写入。新增的特性控制，在某一个特性被设定为false情况下不可写，不可配置，不可枚举的时候，操作会抛出错误
用delete 操作符删除变量 函数 函数参数
在字面方式创建对象时，相同属性定义超过一次的时候报错

##### eval

所有视图使用“eval”会报错，类似保留字？

```javascript
// 报错 Uncaught SyntaxError: Unexpected eval or arguments in strict mode
obj.eval = ...
obj.foo = eval;
var eval = ...;
for ( var eval in ... ) {}
function eval(){}
function test(eval){}
function(eval){}
new Function("eval")
```
另外，通过eval获取的新的变量会被控制在其作用域内

```javascript
eval("var a = false;");
print( typeof a ); // undefined
```
#### Functions

给arguments赋值会报错
参数名相同报错
获取arguments.caller和arguments.calee抛出异常
```javascript
Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```
其他函数的arguments和calller属性不在存在

```javascript
function test(){
  function inner(){
    // Don't exist, either
    test.arguments = ...; // Error
    inner.caller = ...; // Error
  }
}
```

最后，下面这种情况被修复，null和undefined会被强制转为全局对象，严格模式下回抛出异常
```javascript
(function () {
    "use strict";
    (function () {
        console.log(this.a)
    }).call(null); // Exception
 // Uncaught TypeError: Cannot read property 'a' of null
})()
```

##### with

禁用with



