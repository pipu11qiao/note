### React 引用传递 Forwarding Refs ###

引用传递（Ref forwading）是一种通过组件向子组件自动传递 **引用ref** 的技术。对于应用者的大多数组件来说没什么作用。但是对于有些重复使用的组件，可能有用。例如某些input组件，需要控制其focus，本来是可以使用ref来控制，但是因为该input已被包裹在组件中，这时就需要使用Ref forward来透过组件获得该input的引用。

#### 1.基本的使用：通过组件获得input的引用 ####

```javascript
import React, { Component, createRef, forwardRef } from 'react';

const FocusInput = forwardRef((props, ref) => (
    <input type="text" ref={ref} />
));

class ForwardRef extends Component {
    constructor(props) {
        super(props);
        this.ref = createRef();
    }

    componentDidMount() {
        const { current } = this.ref;
        current.focus();
    }

    render() {
        return (
            <div>
                <p>forward ref</p>
                <FocusInput ref={this.ref} />
            </div>
        );
    }
}
export default ForwardRef;

```

核心方法是React.forwardRef,该方法接受一个有额外ref参数的react组件函数，不调用该方法，普通的组件函数是不会获得该参数的。
如果子组件中用到了该方法，那么对应的高阶组件中也需要使用React.forwardRef方法

```javascript

import React, { Component, createRef } from 'react';

const FocusInput = React.forwardRef((props, ref) => <input type="text" ref={ref} />);

const bindRef = (WrappedComponent) => {
    const ConvertRef = (props) => {
        const { forwardedRef, ...other } = props;
        console.log(forwardedRef);
        return <WrappedComponent {...other} ref={forwardedRef} />;
    };
    // “ref”是保留字段需要用普通的字段来代替，传递给传入的组件
    return React.forwardRef((props, ref) => {
        console.log(ref);
        return <ConvertRef {...props} forwardedRef={ref} />;
    });
};

const FocusInputWithRef = bindRef(FocusInput);

class ForwardRef extends Component {
    constructor(props) {
        super(props);
        this.ref = createRef();
    }

    componentDidMount() {
        const { current } = this.ref;
        current.focus();
    }

    render() {
        return (
            <div>
                <p>forward ref</p>
                <FocusInputWithRef ref={this.ref} />
            </div>
        );
    }
}
export default ForwardRef;

```

Refs 使用场景

* 处理焦点、文本选择或者媒体的控制
* 触发必要的动画
* 集成第三方 DOM 库


