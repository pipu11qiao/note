/**
 * 职责链模式
 * 职责链模式（Chain of responsibility）是使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系。将这个对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理他为止。

 也就是说，请求以后，从第一个对象开始，链中收到请求的对象要么亲自处理它，要么转发给链中的下一个候选者。提交请求的对象并不明确知道哪一个对象将会处理它——也就是该请求有一个隐式的接受者（implicit receiver）。根据运行时刻，任一候选者都可以响应相应的请求，候选者的数目是任意的，你可以在运行时刻决定哪些候选者参与到链中。
 */

var NO_TOPIC = -1;
var Topic;

/**
 * handler 接受2个参数， 第一个是继任者，用于将请求传递下去，第二个是传递层级，用于控制在某个层级下是否执行某个动作  handler 原型暴露了一个handle 方法，这是实现该模式的重点
 * @param s
 * @param t
 * @constructor
 */
function Handler(s, t) {
    this.successor = s || null;
    this.topic = t || 0;
}

Handler.prototype = {
    handle: function () {
        if (this.successor) {
            this.successor.handle();
        }
    },
    has: function () {
        return this.topic !== NO_TOPIC;
    }
}

// 使用
function test1() {
    var app = new Handler({
        handle: function () {
            console.log('app handle');
        }
    }, 3);

    var dialog = new Handler(app, 1);

    var button = new Handler(dialog, 2);

    button.handle();
}

function test2() {
    var app = new Handler({
        handle: function () {
            console.log('app handle');
        }
    }, 3)
    var dialog = new Handler(app, 1);
    dialog.handle = function () {
        console.log('dialog before ...');
        //
        console.log('dialog after ...');
    }
    var button = new Handler(dialog, 2);
    button.handle()
}
// test2();

function test3(){
    var app = new Handler({
        handle: function (){
            console.log('app handle');
        },
    },3)

    var dialog = new Handler(app,1);
    dialog.handle = function (){
        console.log('dialog before ...');
        //
        Handler.prototype.handle.call(this);// next
        console.log('dialog after ...');
    }

    var button = new Handler(dialog,2);
    button.handle = function (){
        console.log('button before');
        //
        Handler.prototype.handle.call(this);// next
        console.log('button after');
    }

    button.handle();

}

/**
 *  通过在对象总successor 属性指向下一个对象，
 *  每个对象都有个handle方法，默认是调用下一个处理对象
 *  通过重写handle方法可以将请求在某个处理对象上处理
 *  通过调用构造函数上的handle方法在处理完请求后继续向下请求
 */
