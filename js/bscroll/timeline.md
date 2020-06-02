js 帧动画实现 timeline

在查看 [better-scroll](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88)的源码时返现其有两种方法实现滚动相关的动画，一是css3的transtion方法，二是利用js实现的帧动画类来完成。本文主要介绍其中帧动画部分，算是学习过程中的一个记录，用于以后查看动画相关的代码的积累以及以后工作中设计到动画部分实现的积累。

该方法的核心是通过调用[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)方法来实现，相当一部分的浏览器的显示频率是16.7ms，所以在进行帧动画的时候选用16.7ms的频率或者是16.7ms的倍数，避免丢帧。

#### Timeline 类

Timeline类用来执行动画方法

对外暴露接口
start(interval)  // 动画开始，interval 每一次回调的间隔时间
stop() // 动画暂停
restart() // 继续播放
onenterframe(time) // 每一帧执行的函数，该方法不定义内容，给外部重写。time  从动画开始到当前执行的时间

1. 给出requestAnimationFrame的兼容写法。
```javascript
    var DEFAULT_INTERVAL = 1000 / 60;

    var requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback,(callback.interval || DEFAULT_INTERVAL) / 2);
            };
    })();

    var cancelAnimationFrame = (function () {
        return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            function (id) {
                window.clearTimeout(id)
            };
    })();
```
2.

```javascript
	function Timeline() {
		// 动画id
		this.animationHandler = 0;
	}

	Timeline.prototype.onenterframe = function (time) {
		// body...
	};

	Timeline.prototype.start = function (interval) {
		var me = this;
		me.interval = interval || DEFAULT_INTERVAL;
		startTimeline(me, +new Date())
	};

	Timeline.prototype.restart = function () {
		// body...
		var me = this;

		if (!me.dur || !me.interval) return;

		me.stop();
		startTimeline(me, +new Date() - me.dur);
	};

	Timeline.prototype.stop = function () {
		if (this.startTime) {
			this.dur = +new Date() - this.startTime;
		}
		cancelAnimationFrame(this.animationHandler);
	};

```
3.

```javascript
	startTimeline = function(timeline, startTime) {
		var lastTick = +new Date();

		timeline.startTime = startTime;
		nextTick.interval = timeline.interval;
		nextTick();

		function nextTick() {
			var now = +new Date();

			timeline.animationHandler = requestAnimationFrame(nextTick);

			if (now - lastTick >= timeline.interval) {
				timeline.onenterframe(now - startTime);
				lastTick = now;
			}
		}
	};

```






# requestAnimationFrame 和 setTimeout
setTimeout 为什么会丢帧？
* setTimeout 的执行时间并不是确定的。在JavaScript中， setTimeout 任务被放进了异步队列中，只有当主线程上的任务执行完以后，才会去检查该队列里的任务是否需要开始执行，所以 setTimeout 的实际执行时机一般要比其设定的时间晚一些。
* 刷新频率受 屏幕分辨率 和 屏幕尺寸 的影响，不同设备的屏幕绘制频率可能会不同，而 setTimeout 只能设置一个固定的时间间隔，这个时间不一定和屏幕的刷新时间相同。

与 setTimeout 相比，rAF 最大的优势是 由系统来决定回调函数的执行时机。具体一点讲就是，系统每次绘制之前会主动调用 rAF 中的回调函数，它能保证回调函数在屏幕每一次的绘制间隔中只被执行一次。

#### 参考文章

[requestAnimationFrame 知多少？](https://www.cnblogs.com/onepixel/p/7078617.html)
[一起动手实现一个js帧动画库](https://juejin.im/post/5b62b56af265da0f7b2f832c#heading-0)



