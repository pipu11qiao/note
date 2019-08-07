### React 高阶组件HOC (Higher-Order Component) ###

高阶组件是react中重复使用组件逻辑的高级用法，本身不是React的API。它是从React的组件组合特性中脱颖而出的模式。

具体来说，一个高阶组件就是接受组件为参数并且返回一个新的组件的函数。

一般的使用场景：

#### 解决组件间交叉的属性和方法 ####
#### 替代原始的组件，挂载合成的组件 ####
#### 向组件中传入其他的属性，属性劫持 ####

一些约定：

##### 保持最大的可组合性 #####
##### 给高阶组件添加开发名称,displayName #####

一些警告：

#### 不要再render函数中调用高阶组件 ####

```javascript

render() {
 // 每次触发render函数都会生成一个EnhancedComponent组件
  const EnhancedComponent = enhance(MyComponent);
  // 会使整个子组件挂载/重新挂载
  return <EnhancedComponent />;
}

```
##### 静态方法需要复制过来 #####

```javascript
// 定义一个的静态方法
WrappedComponent.staticMethod = function() {/*...*/}
const EnhancedComponent = enhance(WrappedComponent);


// 静态方法是不是保留的
typeof EnhancedComponent.staticMethod === 'undefined' // true

```

##### 引用不会传递 #####

ref属性是否保留字段通过高阶函数是无法劫持的。
可以通过使用forwardRef方法来改进, [具体见相关博客](https://www.jianshu.com/p/fac884647720)
