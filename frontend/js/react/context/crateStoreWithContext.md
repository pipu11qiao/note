### 使用Context创建Store ###

##### createStore 文件 #####

```javascript
import React, { createContext, PureComponent } from 'react';

// 返回一个装饰器函数，参数是当前的组件函数
const createConnect = (ContextConsumer) => (WrappedComponent) => (props) => {
    const ConnectFun = (allProps) => <WrappedComponent {...allProps} />;
    ConnectFun.staticName = `Connect(${WrappedComponent.displayName
            || WrappedComponent.name
            || 'Component'})`;
    return (
        <ContextConsumer>
            {
                (state) => {
                    console.log(state);
                    return (
                        <ConnectFun {...state} {...props} />
                    );
                }
            }
        </ContextConsumer>
    );
};

const createProvider = (ContextProvider, store) => (WrappedComponent) => {
    class Provider extends PureComponent {
        constructor(props) {
            super(props);
            console.log('saaa');
            this.state = {
                ...store,
                setStore: this.setStore,
            };
        }

        setStore = (state, callback) => {
            this.setState(state, callback);
        }

        render() {
            console.log(ContextProvider);
            console.log(this.state);
            return (
                <ContextProvider value={this.state}>
                    <WrappedComponent {...this.props} {...this.state} />
                </ContextProvider>
            );
        }
    }
    Provider.displayName = `Provider${WrappedComponent.displayName || WrappedComponent.name || 'component'}`;
    return Provider;
};


const createStore = (store) => {
    const context = createContext();
    const Provider = createProvider(context.Provider, store);
    const Connect = createConnect(context.Consumer);
    return {
        Provider,
        Connect,
        Consumer: context.Consumer
    };
};

export default createStore;

```
##### store 文件 #####

```javascript
import createStore from './createStore.jsx';

export const { Provider, Connect, Cosumer } = createStore({
    text: 'test context',
    num: 3,
});

```
##### demo文件 #####

```javascript
import React, { Component } from 'react';

import { Provider, Connect } from './store.jsx';


const Box = (props) => {
    const {
        title, fun = () => {}, num, text, children
    } = props;
    return (
        <div style={{
            border: '1px solid #ddd',
            padding: '20px',
            margin: '10px',
        }}
        >
            <div>
                <h5>{title}</h5>
                <p>
当前num是
                    <span>{num}</span>
                </p>
                <p>
当前text是
                    <span>{text}</span>
                </p>
                <button type="button" onClick={() => { fun('add') }}>增加</button>
                <button type="button" onClick={() => { fun('minus') }}>减少</button>
            </div>
            <div style={{
                paddingLeft: '20px',
            }}
            >
                {children}
            </div>
        </div>
    );
};

@Connect
class Child1 extends Component {
    clickFun = (type) => {
        this.props.setStore({
            num: this.props.num + (1 * (type === 'add' ? 1 : -1))
        });
    }

    render() {
        return (
            <Box
                title="Child Component 1 每次增加/减少5"
                {...this.props}
                fun={this.clickFun}
            />
        );
    }
}

@Connect
class Child2 extends Component {
    clickFun = (type) => {
        this.props.setStore({
            num: this.props.num + (1 * (type === 'add' ? 1 : -1))
        });
    }

    render() {
        return (
            <Box
                title="Child Component 2 每次增加/减少5"
                {...this.props}
                fun={this.clickFun}
            />
        );
    }
}

@Connect
class Parent1 extends Component {
    clickFun = (type) => {
        this.props.setStore({
            num: this.props.num + (5 * (type === 'add' ? 1 : -1))
        });
    }

    render() {
        return (
            <Box
                title="Parent Component 1 每次增加/减少5"
                {...this.props}
                fun={this.clickFun}
            >
                <Child1 />
                <Child2 />
            </Box>
        );
    }
}

@Connect
class Parent2 extends Component {
    clickFun = (type) => {
        this.props.setStore({
            num: this.props.num + (5 * (type === 'add' ? 1 : -1))
        });
    }

    render() {
        return (
            <Box
                title="Parent Component 2 每次增加/减少5"
                {...this.props}
                fun={this.clickFun}
            >
                <Child1 />
                <Child2 />
            </Box>
        );
    }
}


@Provider
class Page extends Component {
    changeFun = (e) => {
        const { target } = e;
        this.props.setStore({
            text: target.value
        });
    }

    clickFun = (type) => {
        this.props.setStore({
            num: this.props.num + (10 * (type === 'add' ? 1 : -1))
        });
    }

    render() {
        return (
            <Box
                title="Page 每次增加/减少 10"
                {...this.props}
                fun={this.clickFun}
            >
                <div><input type="text" onChange={this.changeFun} /></div>
                <Parent1 />
                <Parent2 />
            </Box>
        );
    }
}


export default Page;

```

#### contextTypes 过时的api 知道意思就行

只要 contextTypes 被定义为函数的一个属性，函数组件也能够引用 context。下面的代码展示了一个函数组件写法的 Button 组件。

项目中的context 作为构成store的api在使用




