浏览器渲染过程



html -> html parser  -> DOM Tree -> 
style sheet -> css parser -> style rules ->

                 Layout
-> Attachment -> Render Tree  -> Painting -Display

1. 解析HTML 生成DOM树，解析CSS，生成CSSOM树
2. 将DOM树和CSSOM树和成，渲染树 Render Tree
3. Layout 回流： 根据生成的渲染树， 进行回流（layout） 得到节点的几何信息 位置 大小
4. Painting 重绘 根据渲染树和回流得到的几何信息，得到节点的绝对像素
5. Display: 将像素发送给GPU，展示在页面上（多个合成层合并为同一个层，）

合适 layout 和 重绘

* 添加和删除可见的dom元素
* 元素的位置发生变化
* 元素的尺寸发生变化 包括外边框 内边框 边框大小 高度和宽度
* 内容发生变化
* 页面开始渲染
* 浏览器窗口变化

注意：回流一定会触发重绘，而重绘不一定会回流

根据改变的范围和程度，渲染树中或大或小的部分需要重新计算，有些改变会触发整个页面的重排，比如，滚动条出现的时候或者修改了根节点。

#### 浏览器优化机制

大多数浏览器会通过队列的修改并批量优化重排过程。 当你获取布局信息的操作的时候，会强制队列刷新。

* offset-* scroll-* client-* getComputedStyle() getBoundingClientRect
  最好避免使用上面列出的属性，他们都会刷新渲染队列

减少重绘和重排

css合并

dom批量操作

1.使元素脱离文档流
2.对其进行多次修改
3.将元素带回到文档中。


#### 避免触发同步布局事件
#### 复杂动画脱离文档流
#### CSS硬件加使元素脱离文档流

css3硬件加速（GPU加速）
划重点：使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。但是对于动画的其它属性，比如background-color这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。

如果你为太多元素使用css3硬件加速，会导致内存占用较大，会有性能问题。
在GPU渲染字体会导致抗锯齿无效。这是因为GPU和CPU的算法不同。因此如果你不在动画结束的时候关闭硬件加速，会产生字体模糊。

动画结束关闭 硬件加速
