# css transform中的矩阵知识  #


刚开始学习css中transfrom的时候，知道它是通过矩阵来完成对元素的控制，移动translate,旋转rotate,缩放scale以及拉伸skew。那时候一看到矩阵就头大了，大学的线性代数都不知道怎么过的，早就还回去了。最近有在看线性代数（还债），通过张鑫旭大神的文章，多少理解了矩阵在transform 中的使用，写这边笔记记录一下。一是用做日后复习，二是积累关于矩阵的知识。

### 了解矩阵 ###

css 中 transform 的matrix() 方法写法如下:

```css
tranform: matrix(a,b,c,d,e,f);
tranfrom: matix(1,0,0,1,0,0); // 默认值
```

这六个参数对应的矩阵

```
[
   a c e
   b d f
   0 0 1
]
```

对某个点（x,y）,

#### 为什么是3*3矩阵 ####

对一点（x,y）,通过一个2*2矩阵进行线性变换，是能够满足旋转，缩放和拉伸的操作的。

##### 缩放 #####

```
[
    a  c
    b  d
]
```
默认值是
```
1  0
0  1
```

这里把a的值改为2
```
2 0      2x
0 1  --> y
```
点（x,y）的x方向被放大了两倍
类似：

```
1 0        1x
0 1/2  --> y/2
```
##### 旋转 #####

平常熟悉的坐标系:
![常见坐标系](https://s1.ax1x.com/2020/06/17/NAhuFO.th.png)

web中的坐标系:
![NAh5c9.png](https://s1.ax1x.com/2020/06/17/NAh5c9.png)

假设顺时针旋转角度θ:
![NA48CF.jpg](https://s1.ax1x.com/2020/06/17/NA48CF.jpg)

上图中我们旋转的是单位向量，那么旋转后单位向量 i 的坐标应该是 (cosθ, sinθ)，单位向量 j 的坐标应该是 (-sinθ, cosθ)，所以如果用矩阵表示的话:

```
    cosθ  sinθ
   -sinθ  cosθ
```

写到矩阵中：

```
transform: matrix(cosθ,sinθ,-sinθ,cosθ,0,0)
```

##### 拉伸 #####
通过上面缩放和旋转的例子，我们已经知道了，2 x 2 的矩阵确实能够描述二维空间的变换，这也就是矩阵能够操作空间的原因。在 transform 中，除了缩放(scale)、旋转(rotate) 还有倾斜(skew)，对于倾斜，类似于我们寻找旋转后基向量的坐标一样，你只需要根据倾斜所定义的变换规则，找到基向量变换后的坐标就可以了，实际上倾斜对应如下规则：

```
transform: matrix(1, tan(θy), tan(θx), 1, 0, 0);
```

无论 缩放(scale)、旋转(rotate) 还是倾斜(skew)，他们都不会是原点发生改变，所以使用 a b c d 四个数字组成的矩阵完全可以描述，但是不要忘了，我们还有一个 位移(translate)，这时，就不得不提到 e f 了，我想我不说大家也都知道了，e f 分别代表了 x y 方向的位移，事实也如大家所想：

```
transform: matrix(1, 0, 0, 1, 100, 200)

/* 等价于 */
transform: translateX(100px) translateY(200px);
```
####  通过transfrom属性获得元素当前的位移，缩放，旋转和拉伸状态 ####

根据上面的知识知道了，transform 通过矩阵控制元素的各种状态，反过来我们也能能够通过当前的矩阵知道元素的各种状态。

1. 获得矩阵

通过 `getComputedStyle` 方法获取transform 属性，通过 `DOMMatrix` 来生成一个矩阵对象，方便获取矩阵的的每个参数

```html
<!DOCTYPE html>
<html lang="en">
<head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,initial-scale=1"> <title>Title</title> <style> #divTransform { width: 200px; height: 200px; background-color: #ddd; border: 1px solid #000; transform: translate(20px, 30px) translateZ(0) rotateZ(20deg); } </style> </head>
<body>
<div id="divTransform"></div>
<script>
    var el = document.getElementById("divTransform");
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "FAIL";
    if(tr!=="FAIL"){
        const matrix = new DOMMatrix(tr)
        console.log('matrix', matrix);
    }
</script>
</body>

</html>

```
此时得到的矩阵对象：

![NAb6F1.png](https://s1.ax1x.com/2020/06/17/NAb6F1.png)

其中a~f是2d矩阵中对应的参数，m11~m44 表示4*4矩阵中的元素，m21 第二行第一列的数值

对于2d的变换

* e是水平移动距离，f是垂直移动距离
* a是水平缩放倍数，d是垂直缩放倍数 一般图片缩放都是a和d的数值一样
* 旋转角度为θ,对应的矩阵 `matrix(cos0,sinθ,-sinθ,cosθ,0,0)`,可知tanθ = b / a，使用atan(tanθ)求出角度
* y轴拉伸角度θ，x轴拉伸角度θ，对应的矩阵 `matrix(1,tan(θy),tan(θx),1,0,0)`, 使用atan 方法求出每个方向的拉伸角度

具体代码:
```javascript
    function getTransform(el) {
        var st = window.getComputedStyle(el, null);
        var tr = st.getPropertyValue("-webkit-transform") ||
            st.getPropertyValue("-moz-transform") ||
            st.getPropertyValue("-ms-transform") ||
            st.getPropertyValue("-o-transform") ||
            st.getPropertyValue("transform") ||
            "FAIL";
        const matrix = new DOMMatrix(tr);
        console.log('matrix', matrix);
        var a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d, e = matrix.e, f = matrix.f;

        return {
            x: e,
            y: f,
            scaleX: Math.sqrt(a * a + b * b),
            scaleY: Math.sqrt(c * c + d * d),
            rotate: Math.round(Math.atan2(b, a) * (180 / Math.PI)), // 角度 deg
            skewY: Math.round(Math.atan(b) * (180 / Math.PI)),// 角度 deg
            skewX: Math.round(Math.atan(c) * (180 / Math.PI)),// 角度 deg
        }
        console.log('matrix', matrix);
    }
```
#### 说明 ####
举一个例子, ` transform: translate(20px, 30px) rotateZ(20deg) scale(2); ` 该属性的矩阵参数为
![NEEap8.png](https://s1.ax1x.com/2020/06/17/NEEap8.png)
可以看出此时的缩放a,d 并不为2，因为受旋转的影响,上述transform的一共有三个变换 translate(20px,20px) rotate(20deg) scale(2),上述矩阵的结果是由此三个矩阵连续的线性变换得来
t1 translate(20px,20px)
```
 [
    1  0  20
    0  1  20
    0  0  1
]
```
t2 rotate(20deg) 

```
 [
    0.939693  -0.34202  0
    0.34202    0.939693  0
    0          0         1
]
```
t3 scale(2)
```
 [
    2  0  0
    0  2  0
    0  0  1
]
```
最后的矩阵结构是由 t1 * t2 * t3 得来，此过程中旋转的会改变 缩放的参数 a,d， 所以这时再通过上述方法获取缩放的结果就是不准确的。 估计需要用到矩阵的因式分解？？？

但是对于简单的transform 使用上述方式是好用的，其中

* 位移的获取是准确的
* 旋转角度是准确的(没有拉伸)
* 缩放是准确的(没有拉伸)
* 只有拉伸可以获得拉伸
#### 参考文章 ####
[js获取元素transform参数](https://www.jianshu.com/p/9bc85c45a533)
[理解CSS3 transform中的Matrix(矩阵)](https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%e7%9f%a9%e9%98%b5/comment-page-3/#comment-404707)
[从矩阵与空间操作的关系理解CSS3的transform（科普文）](https://zhuanlan.zhihu.com/p/50525974)
