#### g修饰符对test和exec方法的影响 ####

正则实例的`lastIndex`属性，表示尝试匹配时，从字符串的`lastIndex`位开始去匹配。
正则的`ecec test`两个方法，如果正则中有`g`修饰符，每一次匹配完成后，都会修改`lastIndex`

从开始位置到结束位置都是非字母或汉字
```javascript
    var reg = /^[^a-zA-Z\u4e00-\u9fa5]+$/g
```

#### RegExp 函数

生成正则表达式的是三种方式：
* /pattern/flags
* new RegExp(pattern[, flags])
* RegExp(pattern[, flags]) // 构造方式的安全工厂模式

##### 参数

* pattern 正则表达式的文本
* flags 修饰符，常用i,g,m,s,u,y

例子

```javascript

var r1_l = /abc/;
var r1_c = new RegExp('abc');

var r2_l = /\w+/gi;
var r2_c = new RegExp('\\w+','ig')

```
当表达式被赋值时，字面量形式提供正则表达式的编译（compilation）状态，当正则表达式保持为常量时使用字面量。例如当你在循环中使用字面量构造一个正则表达式时，正则表达式不会在每一次迭代中都被重新编译（recompiled）。

而正则表达式对象的构造函数，如 new RegExp('ab+c') 提供了正则表达式运行时编译（runtime compilation）。如果你知道正则表达式模式将会改变，或者你事先不知道什么模式，而是从另一个来源获取，如用户输入，这些情况都可以使用构造函数。
当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）。比如，以下是等价的：




