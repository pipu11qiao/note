# 节流和防抖函数 #

节流和防抖都是处理高频调用某一函数的处理方法，通过设置触发间隔来减少执行的次数。例如窗口的resize、scroll、输入框实时反馈（校验、匹配）等事件的相应函数。

#### 防抖 debounce ####

防抖就是一系列持续执行函数，只触发最后一次函数，前面的函数是没有意义的。比如在用户持续输入文字的时候，只有在用户输入停顿的时候才去执行校验或搜索。

实现: 让函数延时执行，在下一次调用函数时，判断上一次延时函数是否执行，未执行，取消上一次延时，重新延时,延时执行的间隔就是判定该次触发结束徐等待的时间。

代码:

```javascript
const debounce = function (fun, delay) {
    let id = null;
    return function () {
        const context = this;
        const args = arguments;
        if (id) {
            clearTimeout(id);
            id = null;
        }
        id = setTimeout(function () {
            fun.apply(context, args);
        }, delay)
    }
};
```

测试代码：

```javascript
const debounce = function (fun, delay) {
    let id = null;
    return function () {
        const context = this;
        const args = arguments;
        if (id) {
            clearTimeout(id);
            id = null;
        }
        id = setTimeout(function () {
            fun.apply(context, args);
        }, delay)
    }
};


const fun = function () {
    console.log('arguments', arguments);
};

const debounceFun = debounce(fun, 50);
let isOk = true;
let intervalId = null;

intervalId = setInterval(
    function () {
        if (isOk) {
            debounceFun(Date.now())
        } else {
            clearInterval(intervalId);
            intervalId = null;
        }

    },
    16
);
setTimeout(function () {
    isOk = false;
}, 1500)

```
可以看到只会执行一次
#### 节流 throttle ####

节流就是持续触发的函数变成在规定间隔时间内只执行一次，比如在50ms内触发3次，但只会执行1次。

实现： 可以通过记录时间戳的方式也可以通过延时函数的方式来控制。

时间戳：

```javascript
const throttle = function (fun, time) {
    let lastTime = Date.now();
    return function () {
        const currTime = Date.now();
        const context = this;
        if (currTime - lastTime >= time) {
            lastTime = currTime;
            fun.apply(context, arguments);
        }
    }
};
```

延时函数:

```javascript
const throttle = function (fun, time) {
    let id;
    return function () {
        const context = this;
        const args = arguments;
        if(!id){
            id = setTimeout(function(){
                fun.apply(context, args);
                clearTimeout(id);
                id=null;
            },time);
        }
    }
};


```

这两种方法都是执行时间间隔内的第一次触发的函数，但是想scroll事件，如果最后一次触发的函数在时间间隔后面就不会触发，需要保证最后一个函数被触发.

代码：

```javascript
const throttle = function (fun, time) {
    let id;
    let lastTime = Date.now();
    return function () {
        const context = this;
        const args = arguments;
        const curTime = Date.now();
        const remain = time - (curTime - lastTime);
        if (id) {
            clearTimeout(id);
            id = null;
        }
        if (remain <= 0) {
            fun.apply(context, args);
            lastTime = curTime;
        } else {
            id = setTimeout(function () {
                fun.apply(context, args);
            }, remain);
        }
    }
};

```

测试代码
```javascript
const throttle = function (fun, time) {
    let id;
    let lastTime = Date.now();
    return function () {
        const context = this;
        const args = arguments;
        const curTime = Date.now();
        const remain = time - (curTime - lastTime);
        if (id) {
            clearTimeout(id);
            id = null;
        }
        if (remain <= 0) {
            fun.apply(context, args);
            lastTime = curTime;
        } else {
            id = setTimeout(function () {
                fun.apply(context, args);
            }, remain);
        }
    }
};


const fun = function () {
    console.log('arguments', arguments);
};

const throttleFun = throttle(fun, 300);

setInterval(
    function () {
        throttleFun(Date.now())
    },
    16
);
```
