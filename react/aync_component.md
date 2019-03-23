### React 通过react-loadable实现异步组件

在一般的react项目中在性能优化方面除了减少各种静态资源的体积外，还有一个效果显著的方式，异步加载组件，包括页面级组件（在路由中配置的），以及其他的体积较大的第三方组件（bizcharts,bScroll,...),本文会详细说明使用react-loaable来实现三种异步组件:

1. 页面级组件(router.js引用的组件)，普通的react组件
2. bizcharts 组合的react组件
3. bScroll 等非典型react组件（第三方类库）

#### 准备 

项目中安装 react-loadble ,babel插件安装 syntax-dynamic-import. react-loadable是通过webpack的异步import实现的
如果要实现非页面的组件加载，首先要在webpack配置中将相应的代码块分离出来,splitchunk!!! (例如，bizcharts 等代码库，需要在splitchunk中给个单独配置)

##### react-loadable的基本使用和概念,其中import中的webpackChunkName是异步文件的文件名。

现在我们来讲list页面实现异步组件,其中在Loadable方法的参数配置中，

```javascript

import Loadable from 'react-loadable';
// 首次加载
const Loading = ({ isLoading, error }) => {
    if (isLoading) {
        return <div>加载中...</div>;
    } else if (error) {
        return <div>页面加载出现问题, 请刷新后重试</div>;
    }
    return null;
};
const AsyncList = Loadable({
    loader: () => import(/* webpackChunkName: 'page_list' */'@pages/list'),
    loading: Loading
});

```

* loading 是一个接受状态对象的函数，isLoading和error属性，通过这两个属性来返回相应的过渡组件
* loader 是一个返回import()调用的函数
* render 如果loader中只是个普通的react组件这个办法不需要用到，但是如果加载的js或者组件时一个组件的集合就需要用到，其中loaded是加载的文件的export结果，props 是Loadable函数返回组件接收的参数。 

```javascript
    const A = Loadable({
        loader,
        render: (loaded, props) => {
            const CurComponent = 条件？loaded.default : loaded.other
            return <CurComponent {...props} />;
        },
        loading,
    });
    <A in={true} />
```
此时props就是{in:tue}


##### 页面级组件(router.js引用的组件)，普通的react组件

未使用react-loadable之前的页面,如下：

```javascript

// 首次加载
import Index from '@pages/index';
import List from '@pages/list';



const Routes = () => (
    <Router history={history}>
        <Route exact path="/index" component={Index} />
        <Route exact path="/list" component={List} />
    </Router>
);

```
现在我们来讲list页面实现异步组件,其中在Loadable方法的参数配置中，可以根据项目需要修改loading中的过渡效果

```javascript
import Loadable from 'react-loadable';
// 首次加载
import Index from '@pages/index';

const Loading = ({ isLoading, error }) => {
    if (isLoading) {
        return <div>加载中...</div>;
    } else if (error) {
        return <div>页面加载出现问题, 请刷新后重试</div>;
    }
    return null;
};
const AsyncList = Loadable({
    loader: () => import(/* webpackChunkName: 'page_list' */'@pages/list'),
    loading: Loading
});

const Routes = () => (
    <Router history={history}>
        <Route exact path="/index" component={Index} />
        <Route exact path="/list" component={AsyncList} />
    </Router>
```

如果加载的js是个组件的集合,例如components.jsx 文件

```javascipt
export A =()=>{<div>A</div>};
export B =()=>{<div>B</div>};
export C =()=>{<div>C</div>};
```
此时要加载A页面,需要在render函数中的loaded参数获得A属性即A组件
```
const AsyncA = Loadable({
    loader: () => import(/* webpackChunkName: 'page_list' */'@pages/list'),
    render: (loaded, props) => {
        const CurComponent = loaded.A; // A组件
        return <CurComponent {...props} />;
    },
    loading: Loading
});

```
普通的react组件的加载类似普通的页面的加载

#### bizcharts 的异步实现,bizcharts的export类似上面的组件的组合，一般项目中用到的图表每个都会写到单独处理的文件里，chartA.js chartB.js,...,每个chart文件大概这样子：

```javascript
import React from 'react';
import { Chart, Geom, Axis, Tooltip, Label, Guide, } from 'bizcharts';
class Index extends React.Component {
    render()
        return (
            <div>
                <Chart data={data} scale={scale} className="chart" forceFit >
                    <Axis name="score"  />
                    <Axis name="number"  />
                    <Tooltip triggerOn="none"/>
                    <Geom type="interval" position="score*number" ></Geom>
                </Chart>
            </div>
        );
    }
}

export default Index;
```
先写一个通用的异步加载chart的函数getBizcharts,loading和上文提到的一样,函数的参数ReactComponent 就是原来的chartA,chartB组件 render 函数中的loader就是bizchart对象，通过getBizcharts函数就可以在chartA的组件的props.bizchart中获取和原来一样的bizcharts组件。

```javascript
import Loadable from 'react-loadable';
export const getBizcharts = (ReactComponent) => Loadable({
    loader: () => import(/* webpackChunkName: "bizcharts" */'bizcharts'),
    render: (loaded, props) => <ReactComponent bizchart={loaded} {...props} />,
    loading: Loading
});

```

这事图表组件的样子：

```javascript
import React from 'react';
import { getBizcharts } from '@components/getAsyncComponent';
// import { Chart, Geom, Axis, Tooltip, Label, Guide, } from 'bizcharts';

class Index extends React.Component {
    render()
        const {
            Chart, Geom, Axis, Tooltip, Label, Guide,
        } = this.props.bizchart;
        return (
            <div>
                <Chart data={data} scale={scale} className="chart" forceFit >
                    <Axis name="score"  />
                    <Axis name="number"  />
                    <Tooltip triggerOn="none"/>
                    <Geom type="interval" position="score*number" ></Geom>
                </Chart>
            </div>
        );
    }
}

export default getBizcharts(Index);

```
在render中通过props.bizchart获取bizchart组件，导出时调用getBizcharts方法

#### bScroll 等非react组件

如果该类组件的export 是一个单独的构造,就是在render的时候出入 loaded.default 
如果是一个集合，可以直接出入，在使用的组件中获取







