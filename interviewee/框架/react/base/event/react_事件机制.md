1.为什么要手动绑定this
2.React事件和原生事件有什么区别
3.React事件和原生事件的执行顺序，可以混用吗
4.React事件如何解决跨浏览器兼容
5.什么是合成事件

```html
<div onClick={this.parentClick} ref={ref => this.parent = ref}>
<div onClick={this.childClick} ref={ref => this.child = ref}>
test
</div>
</div> 
```

#### 事件注册
#### 事件存储
#### 事件触发后/执行
#### 合成事件

#### 事件注册
组件装载 / 更新。
通过lastProps、nextProps判断是否新增、删除事件分别调用事件注册、卸载方法。
调用EventPluginHub的enqueuePutListener进行事件存储
获取document对象。
根据事件名称（如onClick、onCaptureClick）判断是进行冒泡还是捕获。
判断是否存在addEventListener方法，否则使用attachEvent（兼容IE）。
给document注册原生事件回调为dispatchEvent（统一的事件分发机制）。

#### 事件存储
EventPluginHub负责管理React合成事件的callback，它将callback存储在listenerBank中，另外还存储了负责合成事件的Plugin。
EventPluginHub的putListener方法是向存储容器中增加一个listener。
获取绑定事件的元素的唯一标识key。
将callback根据事件类型，元素的唯一标识key存储在listenerBank中。
listenerBank的结构是：listenerBank[registrationName][key]。

```html
{
    onClick:{
        nodeid1:()=>{...}
        nodeid2:()=>{...}
    },
    onChange:{
        nodeid3:()=>{...}
        nodeid4:()=>{...}
    }
}
```

#### 事件触发后/执行

遍历这个元素的所有父元素，依次对每一级元素进行处理。
构造合成事件。
将每一级的合成事件存储在eventQueue事件队列中。
遍历eventQueue。
通过isPropagationStopped判断当前事件是否执行了阻止冒泡方法。
如果阻止了冒泡，停止遍历，否则通过executeDispatch执行合成事件。
释放处理完成的事件。

#### 合成事件

调用EventPluginHub的extractEvents方法。
循环所有类型的EventPlugin（用来处理不同事件的工具方法）。
在每个EventPlugin中根据不同的事件类型，返回不同的事件池。
在事件池中取出合成事件，如果事件池是空的，那么创建一个新的。
根据元素nodeid(唯一标识key)和事件类型从listenerBink中取出回调函数
返回带有合成事件参数的回调函数


## 问题
##### 1.为什么要手动绑定this
```html
function invokeGuardedCallback(name, func, a) {
try {
    func(a);
} catch (x) {
    if (caughtError === null) {
        caughtError = x;
    }
}
}
```

可见，回调函数是直接调用调用的，并没有指定调用的组件，所以不进行手动绑定的情况下直接获取到的this是undefined。
2.React事件和原生事件有什么区别

react的所有事件都挂载在document中
当真实dom触发后冒泡到document后才会对react事件进行处理
所以原生的事件会先执行
然后执行react合成事件
最后执行真正在document上挂载的事件

3.React事件和原生事件的执行顺序，可以混用吗
4.React事件如何解决跨浏览器兼容
5.什么是合成事件
