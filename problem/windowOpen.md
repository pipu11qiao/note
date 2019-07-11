# window.open 打开异步请求生成的url被阻止 #

> 当前需求，用户点击按钮，发送请求，获得跳转路径，在新的页面打开。

在谷歌浏览器是可以的，但是在safari中不可以，在ipad中是情况最严重的。下面试过不能用的都是在ipad上没有成功的。

### 已经试过的没有解决问题的方法 ###

* a标签，请求后给修改href。
* 通过创建新的a标签并触发点击。
* 通过setTimeout('oepn',500)的方式，也不好用

### 最终解决方案 ###

* 通过获得window.open 的句柄，在用户点击的时候先打开窗口然后在请求完成后修改打开窗口的地址。

```javascript

$(document.body).on('click', '.btn', function() {
    var tempWin = window.open(tempUrl, '_black ');
    $.get(requetUrl, function() {
        tempWin.location.href = realUrl
    })
});

```
但是这有个问题是只能打开一个窗口，查看window.open的文档 [window.oepn](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)

> var window = window.open(url, windowName, [windowFeatures]);

其中windowName标识打开窗口的浏览上下文？，如果没有找到当前windowName将会创建新的窗口，就是可以通过随机生成这个来达到打开新窗口目的。

* 提前获取地址，这样就不是在点击的时候异步获取了。 其实能不用异步就不用异步，和后台小哥商量下吧。





