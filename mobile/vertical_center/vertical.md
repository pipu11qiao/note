#### 移动端居中问题 垂直方向

在开发过程中，发现在andriod机子上出现上下居中问题，文字偏上。

已经试过的方法：

1. line-height 
2. padding
3. flex

这三种方法试过都没有效果。
后来发现对网页设置语言的一个方法

```html
<html lang="en">
```
改成中文字体
```html
<html lang="zh-CN">
```

相关链接： 
* [HTML lang 属性](http://www.w3school.com.cn/tags/att_standard_lang.asp)
* [网页头部的声明应该是用 lang="zh" 还是 lang="zh-cn"？](https://www.zhihu.com/question/20797118)

设置lang属性后的对比
![compare](https://i.screenshot.net/7k8oqse)

可以看到lang=en时按钮文字偏上，而lang=zh时按钮文字偏下，并且其他的文字的也和lang=zh是不一样（具体原因还没有研究）

最后采取的居中的办法是：

```css
.box{
    display: tabel-cell;
    text-align: center;
    vertical-align: middle;
}
```
当然还有很多的剧种方式没有试，因为总是要用最简单的嘛。
