history 包

最近在ios14上遇到了一个返回的问题：
在iso14上的webview中，window.history.back 和 window.history.go(-1)都没有生效，试过了直接用a标签inline模式调用以及方法调用，都没有效果。
在react中使用的是 `history`包，于是想查看history中关于返回是怎么完成的。

在react中可以自己单独引用history对象，也可以直接使用react-router-dom中的相关路由
```javascript
import { createBrowserHistory, createHashHistory } from 'history';

const _history = createBrowserHistory();
// const _history = createHashHistory();
        <Router history={_history}>
            <Route .../>
        </Router>

```

```javascript
import { BrowserRouter, HashRouter } from 'react-router-dom';
        <BrowserRouter history={_history}>
            <Route .../>
        </BrowserRouter>
```
一般推荐第二种方式，无需单独引用。

react-rout-dom 中BrowserRouter:

```javascript
import { createBrowserHistory as createHistory } from "history";
class BrowserRouter extends React.Component {
  history = createHistory(this.props);

  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}
```
可以看出和第一种方式是一致的。


这两种方式都使用了history包，需要查看hisotry包中关于back和go(-1)的处理

```javascript
export function createBrowserHistory(){
  let globalHistory = window.history;
  function go(delta: number) {
    globalHistory.go(delta);
  }
  let history: BrowserHistory = {
    go,
    back() {
      go(-1);
    },
  };

  return history;
}

```

sorry



