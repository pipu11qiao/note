#### BFC 概念
Block Formatting Contexts 块级格式化上下文
具有BFC的特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且BFC具有普通容器所没有的一些特性。

通俗的理解BFC是一个大箱子，内部元素怎么改动不会影响外部。

#### 触发BFC

满足任意条件即可触发

* body 根元素:
* 浮动元素：
* 绝对定位 position absolute fixed
* display为inline-block table-cells flex
* overflow 除了visible 以外的值 hidden auto scroll

#### 特性应用

1. 同一个BFC下外边距会发生折叠
2. BFC可以包含浮动的元素
3. BFC 可以阻止元素被浮动元素覆盖
