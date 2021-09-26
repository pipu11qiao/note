### button当disabled为true时，mouseleave事件不触发 React

这种情况是在使用antd中Tooltip遇到的，因为要自己控制Tooltip的显示和隐藏，出发元素有可能是被禁用的按钮。

最开始的代码:

```javascript

<Tooltip>
    <Button
        disabled={someCondition}
        onMouseEnter={()=>{console.log('enter')}}
        onMouseLeave={()=>{console.log('leave')}}
    >按钮</Button>
</Tooltip>

```
逻辑就是通过监听按钮的移入和移出事件来模拟hover，控制Tooltip的显隐，当button是disabled状态是，只触发mouseenter事件，而不触发mouseleave事件

**原因**可能是被禁用的表单元素不会触发其他的事件。

#### 解决办法

1. 在按钮外面包一层div，将事件添加到这个div上。这时因为还存在另外一个问题，子元素是disabled，移出时也不会触发，需要给div加一些padding来撑开距离。但是实际的使用过程中发现如果快速移入移出有时会失效
2. 模拟元素的禁用样式，不禁用元素,这样就不会影响事件了。
