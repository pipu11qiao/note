## 类组件和函数组件的异同

```javascript
class Component {
    isReactComponent: { // 区分类组件和函数式组件

    }
}
```

#### 相同点

* 它们都可以接受属性并且返回React元素

#### 不同点

* 编程思想不同： 类组件需要创建实例，是基于面向对象的方式编程，而函数式组件不需要创建实例，接受输入返回输出，是基于函数式编程的思想
* 内存占用： 因为需要创建并保存实例，类组件多占内存
* 捕获特性： 函数式组建的值具有捕获性
* 可测试性： 函数式组件更方便编写测试单元
* 状态和生命周期： 类组件 纯函数 useHook函数 
* 逻辑复用： 继承 HOC ， hook
* 跳过更新： shouldComponentUpdate PureComponent,  React.memo
* 发展前景:
* 代码量： 类组件编译完代码量多余函数式组件

##### 捕获性

```javascript
// 类组件
class Com{
    click() {
        setTimeout(() => {
            console.log(this.state.number)
            this.setState({number: this.state.number + 1})
        }, 100)
    }
}

function Com(){
    click() {
        setTimeout(() => {
            console.log(number)
            setNumber(number+1)
        }, 100)
    }
}
```
基于这问题关于react优化

immmer 
react state 深度对比 immutabl immer
react-keep-alive: react-keeper
