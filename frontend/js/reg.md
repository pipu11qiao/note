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


## 记一个正则问题的解决

问题：
> 'iphone /**\\n * 绩效标签[xxxx/ */ ipad /** xxxx/ */ ipadmini /** xxxx* */ mac /** xxx/x */ macpro'
获取字符串中的'iphone', 'ipad', 'ipadmini', 'mac', 'macpro'

思路：
用split方法，将类似于js注释的部分/** xxx */给去掉
正则描述前面是/**,后面是*/,中间是非*/的字符
> const reg = /\/\*\*[^(\*\/)]*\*\//
代码:
```javascript
const Apple = 'iphone /**\\n * 绩效标签[xxxx/ */ ipad /** xxxx/ */ ipadmini /** xxxx* */ mac /** xxx/x */ macpro';
const reg = /\/\*\*[^(\*\/)]*\*\//;
console.log(Apple.split(reg));
```
测试结果:
[
  'iphone /**\\n * 绩效标签[xxxx/ */ ipad /** xxxx/ */ ipadmini /** xxxx* */ mac /** xxx/x */ macpro'
]
并不是我们想要的结果，说明[^(\*\/)]并不是非*/的意思，可以做一个验证

测试代码：
```javascript
const str = 'mm)ff(ccc/aaa*bb*/'
const reg = /[^(\*\/)]+/g;
console.log(str.match(reg));
```
结果：
[ 'mm', 'ff', 'ccc', 'aaa', 'bb' ]

##### 可以看出来在正则中括号中是没有分组的概念的，里面的字符都是字符本身

非*/的方式不能解决需要采用直接匹配的方式，改为非/的字符或者是/但前面不能是*(也可以是非*的字符或者是\*但后面不是/),这里需要用到后行否定断言
> const reg = /\/\*\*([^/]|(?<!\*)\/)+\*\//

测试代码：
```javascript
const Apple = 'iphone /**\\n * 绩效标签[xxxx/ */ ipad /** xxxx/ */ ipadmini /** xxxx* */ mac /** xxx/x */ macpro';
const reg = /\/\*\*([^/]|(?<!\*)\/)+\*\//g
console.log(Apple.split(reg));
```
结果：
['iphone ', ' ', ' ipad ', ' ', ' ipadmini ', ' ', ' mac ', ' ', ' macpro']

可以看出来split结果中每两个结果之间多了一个，查看split的文档发现，如果正则中包含分组会将分组的结果展示出来,[具体说明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)

如果 separator 包含捕获括号（capturing parentheses），则其匹配结果将会包含在返回的数组中。

```javascript
var myString = "Hello 1 word. Sentence number 2.";
var splits = myString.split(/(\d)/);
console.log(splits);
```
上例输出：
`[ "Hello ", "1", " word. Sentence number ", "2", "." ]`

所以将分组改为不捕获的分组(?:)

> const reg = /\/\*\*(?:[^/]|(?<!\*)\/)+\*\//

测试代码

```javascript
const Apple = 'iphone /**\\n * 绩效标签[xxxx/ */ ipad /** xxxx/ */ ipadmini /** xxxx* */ mac /** xxx/x */ macpro';
const reg = /\/\*\*(?:[^/]|(?<!\*)\/)+\*\//g
console.log(Apple.split(reg));
```
结果
```
[ 'iphone ', ' ipad ', ' ipadmini ', ' mac ', ' macpro' ]
```
最后加上空格匹配
> const reg = /\s*\/\*\*(?:[^/]|(?<!\*)\/)+\*\/\s*/


#### 总结

1. 正则中，中括号中没有分组的概念，字符就是字符本身
2. 掌握先行和后行断言 x(?=y) x(?!y) (?<=y)x (?<!y)x
3. split中正则分组的使用
4. 正则中分组不捕获 (?:exp)


#### 先行和后行断言说明

##### 1. x(?=y) 先行断言

 x 被 y 跟随时匹配 x。例如，对于/Jack(?=Sprat)/，“Jack”在跟有“Sprat”的情况下才会得到匹配．/Jack(?=Sprat|Frost)/ “Jack”后跟有“Sprat”或“Frost”的情况下才会得到匹配。不过， 匹配结果不包括“Sprat”或“Frost”。
##### 2. x(?!y)	先行否定断言

 x 没有被 y 紧随时匹配 x。例如，对于/\d+(?!\.)/，数字后没有跟随小数点的情况下才会得到匹配。对于/\d+(?!\.)/.exec(3.141)，匹配‘141’而不是‘3’。
##### 3. (?<=y)x 后行断言

 x 跟随 y 的情况下匹配 x。例如，对于/(?<=Jack)Sprat/，“Sprat”紧随“Jack”时才会得到匹配。对于/(?<=Jack|Tom)Sprat，“Sprat”在紧随“Jack”或“Tom”的情况下才会得到匹配。不过，匹配结果中不包括“Jack”或“Tom”。
##### 4. (?<!y)x 后行否定断言

 x 不跟随 y 时匹配 x。例如，对于/(?<!-)\d+/，数字不紧随 - 符号的情况下才会得到匹配。对于/(?<!-)\d+/.exec(3) ，“3”得到匹配。 而/(?<!-)\d+/.exec(-3)的结果无匹配，这是由于数字之前有 - 符号。