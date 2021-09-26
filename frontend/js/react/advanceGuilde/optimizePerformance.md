## React 性能优化 ##


React内部使用了多种巧妙的算法来减少由于UI更新导致的开销很大的DOM操作。对于很多应用来说，使用React不需要做很多的特定的性能优化的工作也将会带来快速的用户交互体验。然而，还有有一些办法供你使Rect应用更快。


### 使用生产模式 ###
在开发环境中使用develop模式，部署的环境中使用build模式。

#### 使用 Create React App ####

如果项目是由Create React App 创建的，在需要部署时运行：

```
npm run build
```
#### 使用 Webpack  ####
如果项目是直接使用的webpack配置的，再生产模式下配置: 不使用webpack默认的js压缩

```javascript

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production'
  optimization: {
    minimizer: [new TerserPlugin({ /* additional options here */ })],
  },
};
```

### 使用Chrome性能tab工具来分析组件 ###

### 使用DevTools中的profiler工具来分析组件 ###

### 虚拟的长列表 ###
如果应用中需要渲染很长的列表数据（成百上千的数据）,建议使用‘窗口’技术，这种技术只渲染给定数据中的一部分，可以显著的减少组件的重新渲染和dom节点的创建时间。
[react-winodw](https://react-window.now.sh/#/examples/list/fixed-size) 和 [react-virtualized](https://bvaughn.github.io/react-virtualized/#/components/List)就是带有这种功能的组件。

### 避免混合 ###

React 创建和维护一个渲染UI的内部表示法。它包含了你从组件返回的元素，这种表示法使React免于不必要的创建DOM节点和访问已存在的节点,因为这些dom操作比起普通的Javascript对象要慢的多。有时这被称作虚拟DOM，但是在React Native中也可以这样工作。

当一个组件的特性和状态放生变化，React将会根据现在的返回返回的react元素和原来的返回结果记性比对来决定是否需要更新DOM。当两者不相同时，React将会更新。

使用ReactDevTool能够看到虚拟Dom的重新渲染。选中Highlight Updates

即使React只渲染改变的元素，重新渲染仍需要一部分时间。大多数情况下这不是问题，当时若果重新渲染已经肉眼可见的满了，这是你可以工作重写shouldComponentUpdate来组件加速，这个函数模式人返回true
```
shouldComponentUpdate(nextProps, nextState) {
  return true;
}

```
可以根据组价的状态和属性来有条件的触发渲染。

在大多数情况下，可以通过继承 `React.PureComponent`来保证更新的必要性，因为继承自React.PureComponent的组件会在shouldComponentUpdate做一次浅对象比对。

### shouldComponentUpdate In Action ###

React 会根据shouldComponentUpdate的返回值和组件本身返回的react元素比对结果综合来判断是否需要对当前的dom进行更新，当shouldComponentUpdate返回false时，react不会比对react元素比对结果，这时不会对当前组件更新，也不会更新气子组件。当shouldComponentUpdate返回true时，当元素比对结果不一致时会更新，一致时不会更新。

### The Power Of Not Mutating Data ###

不改变原来的数据，通过返回新的数组和对象来避免使用旧的数据










