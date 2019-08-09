
## React Portal ##
Portals 提供了一个最好的在父组件包含的DOM结构层级外的DOM节点渲染组件的方法。

```javascript
ReactDOM.createPortal(child,container);
```
第一个参数child是可渲染的react子项，比如元素，字符串或者片段等。第二个参数container是一个DOM元素。


#### 用法 ####

普通的组价，子组件的元素将挂载到父组件的DOM节点中。

```javascript
render() {
  // React 挂载一个div节点，并将子元素渲染在节点中
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```
有时需要将元素渲染到DOM中的不同位置上去，这是就用到的portal的方法

```javascript
render(){
    // 此时React不再创建div节点，而是将子元素渲染到Dom节点上。domNode，是一个有效的任意位置的dom节点。
    return ReactDOM.createPortal(
        this.props.children,
        domNode
    )
}
```

一个典型的用法就是当父组件的dom元素有 `overflow:hidden`或者`z-inde`样式，而你又需要显示的子元素超出父元素的盒子。举例来说，如对话框，悬浮框，和小提示。


#### 在protal中的事件冒泡 ####

虽然通过portal渲染的元素在父组件的盒子之外，但是渲染的dom节点仍在React的元素树上，在那个dom元素上的点击事件仍然能在dom书中监听到。


