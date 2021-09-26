### `void 0`是什么意思

[`void`<sup>\[MDN\]</sup>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void)是一个预留关键字，接受一个参数并且总是返回`undefined`。

###### 例子

```javascript
void 0
void (0)
void "hello"
void (new Date())
//all will return undefined
```

##### 关键点是什么? #####

通过定义它看上去很鸡肋，如果总是返回`undefined`,仅使用`undefined`本身有什么问题？

在一个完美的环境中我们可以安全的只使用`undefined`，它相比于`void 0`更加简单和易于理解。但是有一点你原来没有注意过，这里并不是一个完美的环境，尤其是对于Javascript来说。

使用`undefined`的问题在于undefined不是一个保留关键字（[它实际是一个全局对象的属性<sup>\[wtfjs\]</sup>](https://web.archive.org/web/20160311231335/http://wtfjs.com/2010/02/15/undefined-is-mutable)）。由此看来，`undefined`是可以当做变量名，所以你可以任意给它分配新的值。

```
alert(undefined); //alerts "undefined"
var undefined = "new value";
alert(undefined) // alerts "new value"
```

注意： 在支持ECMAScript5或更高版本的环境中将不再存在这个问题(实际是出了ie8以外所有的浏览器)，这些环境中将`undefined`定义为全局对象上的一个只读属性(因此你仅仅可以在你的局部作用域里面覆盖它的值)。然而，下面的信息对于向后兼容仍有用处：

```
alert(window.hasOwnProperty('undefined')); // alerts "true"
alert(window.undefined); // alerts "undefined"
alert(undefined === window.undefined); // alerts "true"
var undefined = "new value";
alert(undefined); // alerts "new value"
alert(undefined === window.undefined); // alerts "false"
```
`void`,一方面，不可以被覆盖。`void 0`将总是返回`undefined`。而另一方面`undefined`可以是人任意的Javascript同志想让他变成的东西。

##### 为什么`void 0`特殊? #####

为什么我们使用`void 0`？`0`有什么特殊的？我们不可以一样简单的使用`1`，或者`42`，或者`1000000`或者`"hello world!"`?

答案是肯定的，对，我们可以，一样会起作用。使用`0`代替其它参数唯一的好处是`0`本身简短和惯用。

##### 为什么仍有意义? #####

虽然`undefined`在现在的Javascript环境中通常可以被信任，但是`void 0`还有一点小的优点：比较简短。该差异不足以在写代码过程中的引发担忧，但是它将增加相当多的额外代码，因此大多数代码压缩工具使用`void 0`替代`undefined`来减少想浏览器反送的数据。
