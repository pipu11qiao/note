### React Hooks 介绍

Hooks 是react16.8新增的，能让你不通过声明一个class来使用state和其他的react特性。

#### state hook 状态钩子

useState是一个钩子函数。 在组件函数内部调用添加自身的状态（state），React 将保存这个状态变量在两次渲染期间。useState返回一对结果： 当前的state和一个能更新该state的函数。这个函数类似于this.setState方法，但是不会将新的state和旧的state合并。
userState为一对参数就是初始的state。

可以调用多次userState在一个组件函数中，

**什么是Hook**

Hooks 是能够让你在react组件函数内部关联state和生命周期特性的函数。
React 提供了很少的内置Hooks，类似userSate。你可以自己创建自己的Hooks来重复使用不同组件之间状态类的行为。

#### effect hook 影响钩子

之前你应该通过React组件抓取数据，订阅，手动改变DOM，我们称这位边界影响因为它们会影响其他组件并且不能再渲染是完成。

影响钩子 userEffect 在函数组件中添加完成边界影响的能力。它提供了和React class中的componentDidMount，componentDidUpdate，componentWillUnmount同样的目的，但是它统一成一个API

当你调用userEffect,你就是正在告知React在DOM刷新后执行你的effect,effects函数在函数组件内部定义，这样就可以访问state和props。React会执行effects函数在每次渲染完成之后，包括第一次渲染。

effetct 可以再返回值中存清除自身的方法。 如在effect内部订阅某个事件，在返回中可以将其取消的方法。

#### Rules of Hooks  Hooks的规范

Hooks 是普通JavaScript 的函数，但它采用了两个规则：

* 在最顶层的作用域调用Hooksm,不要在循环，条件和内置函数的作用域调用
* 只在react 函数组件中调用，不要在普通javascript函数中调用

#### Build Your Own Hooks








