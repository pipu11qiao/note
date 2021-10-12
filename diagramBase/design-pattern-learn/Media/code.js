/**
 * 中介者模式， 用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式的相互引用，从而是其耦合松散，而且可以独立的改变他们之间的交互。
 * 软件开发中，中介者是一个行为设计模式，通过提供一个统一的接口让系统不同部分进行通信。一般，如果系统有很多子模块需要直接沟通，都要创建一个中央控制点让其各模块通过该中央控制点进行交互。中介者模式可以让子模块不要直接沟通，而达到进行解耦的目的。
 * 例子： 中央塔台和飞机
 */

// app 命名空间扮演中介者的角色
function test1() {
    var app = {};

// 通过app中介者来进行ajax请求
    app.sendRequest = function (options) {
        return $.ajax($.extend({}, options));
    }

// 请求URL以后，展示View
    app.populateView = function (url, view) {
        $.when(app.sendRequest({url, method: 'GET'}))
            .then(function () {
                //显示内容
            })
    }
// 清空内容
    app.resetView = function (view) {
        view.html('');
    }
}

/**
 * 在js中，中介者非常常见 相当于观察者模式上的消息Bus,只不过不想观察者那样通过调用pub/sub的形式来实现。而是通过中介者来统一管理，让我们在观察者的基础上来给出例子
 */
function test2() {

    var mediator = (function () {
        // 订阅一个事件，并且提供一个事件触发以后的回调函数
        var subscribe = function (channel, fn) {
            if (!mediator.channels[channel]) mediator.channels[channel] = [];
            mediator.channels[channel].push({
                context: this,
                callback: fn
            });
        };
        var publish = function (channel) {
            if (!mediator.channels[channel]) return false;
            const fnArr = mediator.channels[channel];
            var args = Array.prototype.slice.call(arguments, 1);

            for (var i = 0, l = fnArr.length; i < l; i++) {
                fnArr[i].callback.apply(fnArr[i].context, args)
            }
            return this;
        }
        return {
            channels: {},
            publish: publish,
            subscribe: subscribe,
            installTo: function (obj) {
                obj.subscribe = subscribe;
                obj.publish = publish;
            }
        }
    })();

    (function (mediator) {
        function initialize() {
            // 默认值
            mediator.name = "dudu";

            // 订阅一个事件nameChange
            // 回调函数显示修改前后的信息
            mediator.subscribe('nameChange', function (arg) {
                console.log(this.name);
                this.name = arg;
                console.log(this.name);
            })
        }

        function updateName() {
            // 广播触发事件，参数为新数据
            mediator.publish('nameChange', 'tom');
        }

        initialize();
        updateName();
    })(mediator)
}

// test2();
/**
 * 中介者和观察者
 *
 */
