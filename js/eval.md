# (1, eval)('this')  eval('this') 两者有什么不同 #

(1,eval)和普通的eval函数不同在于前者是一个值，后者是一个变量

(1,eval)是一个表达式，返回eval函数（就像（true&&eval） (0?0:eval)）,
Ecma 认为eval函数的引用调用eval是直接eval调用，但是表达式方式的eval调用是给非直接调用eval，非直接eval调用会在全局环境中调用

```javascript
var x = 'outer';
(function() {
  var x = 'inner';
  eval('console.log("direct call: " + x)'); 
  (1,eval)('console.log("indirect call: " + x)'); 
})();
```
[(1, eval)('this') vs eval('this') in JavaScript?](https://stackoverflow.com/questions/9107240/1-evalthis-vs-evalthis-in-javascript)

