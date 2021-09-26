### 移动端问题,持续补充

问题： select标签和input[type="button"]在真机样式上会有区别。

解决办法： 给标签加一条样式
> -webkit-appearance: none;

补充：appearance 样式用来使用**以系统主题的平台样式来展示元素**,在这里都设置为none,可以消除两个系统之间的样式差异,经测试在各个浏览器这个属性差异还是很大的(pc端)

问题：ios 不支持 new Date(yyyy-mm-dd) 

解决办法： 分隔符用 /

补充： safari 浏览器不支持yyyy-mm-dd 格式的日期字符串

问题： ios 滚动元素滚动不流畅

解决办法： 添加css样式
> webkit-overflow-scrolling: touch;

补充：** -webkit-overflow-scrolling ** 用来控制触摸设备在给定的元素之上是否使用动能模拟的滚动,<span style="color: red">这个特性不是标准的属性。不同的用户使用效果不一样，也会根据浏览器的实现而有差异，同时在将来的版本中会出现不可预料的变化</span>,有两个取值

* auto 普通滚动。 当你手指离开会立即停止滚动
* touch 使用动能模拟滚动，手指离开会根据离开时的速度和手势来继续滚动或停止

#### 参考

[关于移动端踩过的坑](https://blog.csdn.net/mr_fzz/article/details/76435371)
