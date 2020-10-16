### react 替换componentWillReceiveProps，componentWillMount,componentWillUpdate 

16.7 下面的声明周期会加上前缀（UNSAFE_）才能使用:
* componentWillMount
* componentWillReceiveProps
* componentWillUpdate

改动方法：

* ##### componentWillMount

一般使用该方法初始参数，改在constructor中使用

* ##### componentWillReceiveProps

一般使用该方法对比props的变化，来改变state状态和调用类的相关方法
其中state的改变可以通过getDerivedStateFromProps来替代,但是getDerivedStateFromProps是静态方法不能访问this,可以通过下面的方法来代替

```javascript
static getDerivedStateFromProps(nextProps, prevState){
   if(nextProps.someValue!==prevState.someValue){
     return { someState: nextProps.someValue};
  }
  else return null;
}

componentDidUpdate(prevProps, prevState) {
  if(prevProps.someValue!==this.props.someValue){
    // 这里可以调用原来componentWillReceiveProps中调用 this的相关方法
    this.setState({someState: someValue});
    this.classMethod();
  }
}
```
* ##### componentWillUpdate
一般这个方法是在接收到新的props或者state重绘之前被调用
可以通过componentDidUpdate来代替这个方法，如果是在这个方法中读取DOM信息，可以使用getSnapshotBeforeUpdate 

###### 参考链接:
* [UNSAFE_componentWillMount()](https://reactjs.org/docs/react-component.html#unsafe_componentwillupdate)
* [Replacing ‘componentWillReceiveProps’ with ‘getDerivedStateFromProps’](https://hackernoon.com/replacing-componentwillreceiveprops-with-getderivedstatefromprops-c3956f7ce607)

