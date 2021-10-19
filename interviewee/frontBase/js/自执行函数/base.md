##### 自己的理解
通过在声明是直接调用的方式实现
* 利用闭包,实现局部作用域 

##### 实际的理解

```javascript
function(){ /* code */}(); //SyntaxError: Unexpected token (
```

因为在Javascript里，圆括号不能包含声明。因为这点，当圆括号为了包裹函数碰上了 function关键词，它便知道将它作为一个函数表达式去解析而不是函数声明。

```javascript
(function(){/* code */}());//Crockford recommends this one，括号内的表达式代表函数立即调用表达式
(function(){/* code */})();//But this one works just as well，括号内的表达式代表函数表达式
```

