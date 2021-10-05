### Do Hooks cover all use cases for classes?

Our goal is for Hooks to cover all use cases for classes as soon as possible. There are no Hook equivalents to the
uncommon getSnapshotBeforeUpdate, getDerivedStateFromError and componentDidCatch lifecycles yet, but we plan to add them
soon.

It is an early time for Hooks, and some third-party libraries might not be compatible with Hooks at the moment.

### hoc和hook的复用可以完全替代么

Do Hooks replace render props and higher-order components? Often, render props and higher-order components render only a
single child. We think Hooks are a simpler way to serve this use case. There is still a place for both patterns (for
example, a virtual scroller component might have a renderItem prop, or a visual container component might have its own
DOM structure). But in most cases, Hooks will be sufficient and can help reduce nesting in your tree.

优化步骤

React.memo 实现class component 的 pureComponent 的效果

```javascript
/* eslint-disable */
import React, {memo, useState, useEffect} from 'react';

const A = (props) => {
    console.log('A1');
    useEffect(() => {
        console.log('A2');
    });
    return <div>A</div>;
};

const B = memo((props) => {
    console.log('B1');
    useEffect(() => {
        console.log('B2');
    });
    return <div>B</div>;
});

const Home = (props) => {
    const [a, setA] = useState(0);
    useEffect(() => {
        console.log('start');
        setA(1);
    }, []);
    return (
        <div>
            <A n={a}/>
            <B/>
        </div>
    );
};
export default Home;

```

### 引用类型的变量或者函数

当我们将B用memo包裹后，状态a的更新将不会导致B组件重新渲染。其实仅仅优化这一点还远远不够的，比如说我们子组件用到了容器组件的某个引用类型的变量或者函数，那么当容器内部的state更新之后，这些变量和函数都会重新赋值，这样就会导致即使子组件使用了memo包裹也还是会重新渲染，那么这个时候我们就需要使用useMemo和useCallback了。
useMemo可以帮我们将变量缓存起来，useCallback可以缓存回调函数，它们的第二个参数和useEffect一样，是一个依赖项数组，通过配置依赖项数组来决定是否更新

```javascript
const Home = (props) => {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);

    useEffect(() => {
        console.log('start');
        setA(1);
        // setB(2);
    }, []);
    const countObj = {count: b + 2};
    return (
        <div>
            <A n={a}/>
            <B countObj={countObj}/>
        </div>
    );
};
export default Home;

```

改成

```javascript
const countObj = useMemo(() => ({count: b + 2}), [b])
```

userCallback

```javascript
  const add = useCallback(() => {
    console.log('b', b)
  }, [b])
    <B add={add} />
```


