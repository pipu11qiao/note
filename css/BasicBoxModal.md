css基本盒模型介绍

在布局一个页面文档时，浏览器渲染引擎会根据CSS的基本盒模型规则将每个元素看做一个矩形盒子来呈现。CSS决定这些盒子的尺寸、位置和其他属性（颜色、背景、边框尺寸）

每个盒子由四部分组成，由各自的边框界定：内容边界，内边距边界，边框边界和外边距边界。

![边框](https://mdn.mozillademos.org/files/8685/boxmodel-(3).png)

**内容区域**，被内容边界包围，包含“真正”的元素内容，例如文字，图片或者视频播放器。它的尺寸是内容宽度和内容高度。通常有一个背景颜色或背景图片。

如果属性 `box-sizing`被设置为 `content-box`（默认值）并且元素是一个块元素，内容区域的尺寸可以被`width,min-width,max-width,height,min-height,max-height`精确控制。

**内边距区域**，被内边距边界包围，扩展内容区域使其包含元素的内边距。它的尺寸是内边距盒子宽度和内边距盒子高度。

内边距的大小由`padding-top,padding-bottom,padding-left,padding-right,padding`来控制

边框区域，被边框边界包围，扩展内边距区域使其包含元素边框。它的尺寸是边框盒子宽度和边框盒子高度。

边框的大小由`border-wdth,border`控制，如果属性 `box-sizing`被设置为 `box-sizing`,边框区域的尺寸可以被`width,min-width,max-width,height,min-height,max-height`精确控制,此时，若有盒子由背景颜色或者背景图片，它将扩展到整个边框边界。这个行为可以被属性`background-clp`改变。

外边距区域，被外边距边界包围，扩展边框内容使其包含元素的外边距。它的尺寸是外边距宽度和外边距高度。

外边距的大小由`margin-top,margin-bottom,margin-left,margin-right,margin`控制。当外边距合并发生的时候，外边距区域不会被清晰的界定以为外边距被共用了。

最后，对于为改变的行内元素，占据的空间（撑起当前行的高度）是有`line-height`控制的，同时边框和内边距仍展示的内容周围。

```html
<p style="line-height: 30px;">
    <i style="padding: 10px;height:20px;border: 5px solid #ddd;">aaa</i>
</p>

```
p元素的高度此时是30，而I的高度是46,此时改变p的`line-height`属性不会改变i的高度，会改变p的高度。![tYN60O.png](https://s1.ax1x.com/2020/06/02/tYN60O.png)
此时i元素的内边距和边框都生效了。

