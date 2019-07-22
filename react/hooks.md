### React Hooks 介绍

Hooks 是react16.8新增的，能让你不通过声明一个class来使用state和其他的react特性。

#### State Hook 状态钩子

useState是一个钩子函数。 在组件函数内部调用添加自身的状态（state），React 将保存这个状态变量在两次渲染期间。useState返回一对结果： 当前的state和一个能更新该state的函数。这个函数类似于this.setState方法，但是不会将新的state和旧的state合并。
userState为一对参数就是初始的state。

可以调用多次userState在一个组件函数中，

**什么是Hook**

Hooks 是能够让你在react组件函数内部关联state和生命周期特性的函数。
React 提供了很少的内置Hooks，类似userState。你可以自己创建自己的Hooks来重复使用不同组件之间状态类的行为。

#### Effect Hook 影响钩子

之前你应该通过React组件抓取数据，订阅，手动改变DOM，我们称之为边界影响因为它们会影响其他组件并且不能再渲染时完成。

影响钩子 userEffect 在函数组件中添加完成边界影响的能力。它提供了和React class中的componentDidMount，componentDidUpdate，componentWillUnmount同样的目的，但是它统一成一个API

当你调用userEffect,你就是正在告知React在DOM刷新后执行你的effect,effects函数在函数组件内部定义，这样就可以访问state和props。React会执行effects函数在每次渲染完成之后，包括第一次渲染。

effect 可以在返回值中保存清除自身的方法。 如在effect内部订阅某个事件，在返回中可以保存将其取消的方法。

#### Rules of Hooks  Hooks的规范

Hooks 是普通JavaScript 的函数，但它采用了两个规则：

* 在最顶层的作用域调用Hooks,不要在循环、条件和内置函数的作用域调用
* 只在react 函数组件中调用，不要在普通javascript函数中调用

#### Build Your Own Hooks

有时候，我们想在不同组件之间重复使用某些状态类逻辑。原来的版本中，一般有两种常见的解决办法： 高阶组件和参数渲染。自定义Hook可以让你做到这点。而不用在你的文件中添加新的组件。
这些组件之间的状态完全独立，Hooks是一个解决重复使用状态类逻辑的方式，不是状态本身。**实际上，每次调用Hook都有一个独立的state**因此你甚至可以在一个组件中两次调用Hook。
自定义Hook更像是一种约定而不是特性。如果一个方法名称已‘use’开头，并且它调用其他的Hooks，我们称它为自定义Hook。userXXX 这个约定的命名就是我们的lint插件能够发现bug的方式

你可以使用自定义Hook来完成很多方面的事情，例如 代理，动画，声明订阅，定时器，和其他我们还没有考虑到的可能的情况。

#### Other Hooks

userContext  能让你不用通过嵌套调用来获得上下文
userReducer 能让你使用reducer来管理本地的状态。



