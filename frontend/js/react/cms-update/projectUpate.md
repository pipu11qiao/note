# 旧的 cra 项目升级

1. 项目介绍
2. 关于升级的思考
3. 升级实现以及遇到的问题
4. 结语

## 1. 项目介绍

cms 项目，使用 react 开发,状态管理使用 mobx,UI 中使用了 materialui,antd,antd-pro。
项目使用老的[create-react-app](https://create-react-app.dev/)创建，并且执行过 eject 操作。

## 2. 关于升级的思考

### 为什么要升级

项目无法支持 ts 语法，现有的 webpack 构建中对 node 版本有依赖，不能超过 14 版本

### 如何做

一开始准备直接在项目添加 ts 支持，添加 ts 依赖，eslint 依赖，然后就是提示升级 node 版本，提升了 node 版本就是提 node-sass 不支持。折腾了一顿也没整明白。
因为是 cra 创建的项目尝试以最新版的 cra 创建一个支持 ts 的项目，然后对项目进行更改

## 3. 升级实现以及遇到的问题

1. 创建空的 cra 项目,执行 eject

> npx create-react-app tmp-app --template typescript
> cd tmp-app && npm run eject

这一步执行 eject 并不一定是必须得，如果项目中没有特别自定义 webpack 配置，可以考虑不执行 eject，将来项目升级也会方便

2. 老的项目已经有 git，将项目中所有文件都放在 tmp 文件夹下，把刚才创建项目都复制过来

安装依赖 `yarn`

运行 `yarn start`

3. 用老项目的 src 替换新项目的 src，cra 的项目项目代码基本都在 src 中，我们可以把这个运行起来就 ok 了。

webapck 配置文件，位置在 config/webpack.config.js。

4. 第一步先关闭eslint，放到最后配置，优先将项目运行起来,webpack5中eslint通过eslint-webpack-plugin插件来配置,在配置文件中将eslint开关关闭,找到`disableESLintPlugin`并置为true。也可以在env文件中设置

> disableESLintPlugin = true


#### 问题 1. cra 项目不支持装饰器语法，需要进行支持,包括 babel 和 eslint 设置

babel 添加decorator支持
添加插件@babel/plugin-proposal-decorators

> yarn add -D @babel/plugin-proposal-decorators

在webpack配置中添加该babel插件，这里应该也可以通过.babelrc文件配置,找到处理src文件出的babel配置,require.resolve加不加无所谓，这个是react-script用来查找依赖的


```javascript
{

                plugins: [
                  isEnvDevelopment &&
                    shouldUseReactRefresh &&
                    require.resolve("react-refresh/babel"),
                  [
                    require.resolve("@babel/plugin-proposal-decorators"),
                    {
                      legacy: true,
                      // version: "2018-09",
                      // decoratorsBeforeExport: true,
                    },
                  ],
                ].filter(Boolean),
}
```

5. 再次执行start可以看到babel的decorator提示已经解决，接下来

* 把原有项目的依赖添加到新的项目。cra执行eject后所有的依赖都放在dependencies中了，其中只有react react-dom。

* 添加alias 在配置中添加alias配置
* 安装sass依赖

#### 问题 2. antdcss的引用方式修改 把antd/dist/antd.css 改成 antd/dist/antd.min.css

> import 'antd/dist/antd.min.css'


#### 问题 3. 此时start命令在终端已经不报错误了，但是访问页面没有内容,将和proxy代理配置相关的文件移除后可以访问页面 新的代理中使用方法和原来的不一样，[proxy设置](https://create-react-app.dev/docs/proxying-api-requests-in-development)

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  Object.keys(proxyConfig).forEach(function (proxyPath) {
    let options = proxyConfig[proxyPath];
    app.use(
      proxyPath,
      createProxyMiddleware({
        target: options.target,
        changeOrigin: true,
        pathRewrite: options.pathRewrite,
      })
    );
  });
};
```

到目前为止，项目已经能正常运行，还剩下eslint添加和ts文件的测试

6. eslint 配置

* 编辑器vscode中有eslint配置，打开index.js有报错，` Using `babel-preset-react-app` requires that you specify `NODE_ENV` or `BABEL_ENV` environment variables.`。配置编辑器eslint运行的参数,在setting.json中添加配置,重新打开编辑器就不报错了

```json
{
    "eslint.nodeEnv": "development",
}
```
* 打开eslint的开关, disableESLintPlugin更改删掉。运行start，eslint报错没有decorators支持
webpack5使用 [eslint-webpack-plugin](https://webpack.docschina.org/plugins/eslint-webpack-plugin/)
将配置文件中的除了eslint-webpack-plugin中的配置移到.eslintrc.js文件中，不在配置文件中配置的原因是编辑器无法识别配置文件中的eslint配置

配置文件中,eslint-webpack-plugin的配置,useEslintrc置为true
```javascript
        new ESLintPlugin({
          // Plugin options
          extensions: ["js", "mjs", "jsx", "ts", "tsx"],
          formatter: require.resolve("react-dev-utils/eslintFormatter"),
          eslintPath: require.resolve("eslint"),
          failOnError: !(isEnvDevelopment && emitErrorsAsWarnings),

          context: paths.appSrc,
          cache: true,
          cacheLocation: path.resolve(
            paths.appNodeModules,
            ".cache/.eslintcache"
          ),
          useEslintrc: true,
        }),
```
还需要添加.prettierrc.js文件 
```javascript
module.exports = {
  importOrderParserPlugins: true,
};

```
7. ts文件测试

在原有项目中吧jsx文件改成tsx文件或新建ts文件，看能否执行
新建test.ts
```javascript
export function baseAdd(num1: number, num2: number): number {
  console.log(`num1,num2`, num1, num2);
  // const x = num1.split();
  return num1 + num2;
}

type Animal = {
  age: number;
};

export function getAge (anamial:Animal):number{
  return anamial.age;
}

```
引入

```
import { baseAdd } from "./utils/test";
console.log(`baseAdd(1,2)`, baseAdd(1, 2));
```
可以正常使用


## 4. 结语
