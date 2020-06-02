clientHeight,offsetHeight,scrollHeigt 是元素三个与高度有关的属性，它们之间的区别是什么呢？

![scrollHeight](https://s1.ax1x.com/2020/06/02/tYsA6H.png)
![clientHeight,offsetHeight](https://s1.ax1x.com/2020/06/02/tYsJns.png)

可以由上图看出：

* scrollHeight: 所有内容 内容和间距（可见和不可见的），元素内容和内边距的高度，而不参考当前元素的高度
* clientHeight: 可见 内容和间距 仅可见部分的高度，不包含滚动条，边框和外边距高度
* offsetHeight: 可见 包含边框，内边距，滚动条和元素的css高度
