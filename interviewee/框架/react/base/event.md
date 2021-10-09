## react 事件合成
### 16
事件委托在document.上

页面元素三个， document  div(parent)  button(child)
执行顺序

document 捕获
div 捕获
button 捕获

button 冒泡
div 冒泡

react div 捕获
react button 捕获
react button 冒泡
react div 冒泡

document 冒泡

#### 原理
react的事件委托在document上，在冒泡阶段触发，模拟了捕获和冒泡两个过程

```javascript
document.addEventListener('click',function (e){
    const target = e.target
    const stack = []; //双向链表
    while (target !== body && target !== null){
        stack.push(target);
        target= target.parentNode
    }
    //  stack [child,parent.grand]
    // 先从后循环触发捕获，在从前循环触发冒泡
})
```

### 17 

17在16的基础上将捕获和冒泡分开委托，在原生冒泡之前出发react捕获,更加合理的处理捕获和冒泡的顺序

document 捕获
react div 捕获
react button 捕获
div 捕获
button 捕获
button 冒泡
div 冒泡
react button 冒泡
react div 冒泡
document 冒泡
