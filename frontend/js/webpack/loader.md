## loader 知识相关 ##
loader就是一个暴露特定函数的node模块，该函数将在一个资源应该被改loader转换时调用。在这个函数中可以通过上下文this来访问[Loader API](https://webpack.js.org/api/loaders/);

```javascript
const {getOptions} = require('loader-utils');
const {promisify} = require('util');
const fs = require('fs');
const access = promisify(fs.access);
const readFile = promisify(fs.readFile);
const alertText = `
if(typeof alert ==='function'){
alert(3);
}
`
let nodeModulesPath = '';

function loader(content, map, meta) {
    const callback = this.async();
    if (!nodeModulesPath) {
        nodeModulesPath = `${this.rootContext}/node_modules`
    }
    if (this.context.startsWith(nodeModulesPath)) { // node_modules 中的文件
        callback(null, content, map, meta)
    } else {
        let trueContent = content;
        const options = getOptions(this);
        const {alert = false, comment = false} = options;
        console.log('options', options);
        console.log('this.context', this.context);
        if (alert) {
            trueContent = `${trueContent};${alertText};`;
        }
        if (comment) {
            const commentPath = this.resourcePath.replace(/\.jsx?$/, '.cm');
            console.log('commentPath', commentPath);
            readFile(commentPath,'utf-8').then(function (commentText) {
                console.log('commentText', commentText);
                trueContent = `${trueContent}/*${commentText}*/`;
                callback(null, trueContent, map, meta);
            }).catch(function () {
                console.log('not found comment file')
                callback(null, trueContent, map, meta);
            })
        } else {
            callback(null, trueContent, map, meta);
        }
    }
}

module.exports = loader;

```
### 一些准侧
一些关于创建一个loader的准则
Keep them simple.
Utilize chaining.
Emit modular output.
Make sure they're stateless.
Employ loader utilities.
Mark loader dependencies.
Resolve module dependencies.
Extract common code.
Avoid absolute paths.
Use peer dependencies.

* Simple 简单 单一任务
* Chaining 链式调用
* Modular 模块化
* Stateless 无状态
* Loader Utilites 使用loader-utils 包中提供的工具方法
* Loader Dependencies 外部依赖添加
* Module Dependencies
根据模块类型的不同，确定依赖的模式也会不同。例如在css中，使用`@importl`和`url(...)`声明。这些依赖应该被模块系统解决。
这有两种方式解决：
* 将其转换为 require 声明
* 使用 this.resolve方法解决依赖路径
* Common Code 公共代码
* Absolute Paths 绝对路径 可以使用loader-utils 中的stringifyRequest 方法来将绝对路径转为相对领
* Peer Dependencies 如果改loader是其他包外壳

## file-loader ##

filte-loader 源码简单分析,查看加载资源，将资源输出到生产文件中去
调用interpolateName方法生成插入的文件名称,可以包含文件路径,插入的文件名称是在不考虑发布路径（publicPath）的情况下的引用路径。



```javascript
import { getOptions, interpolateName } from 'loader-utils';
  const url = interpolateName(this, name, {
    context,
    content,
    regExp: options.regExp,
  });

```
根据用户设置了输出路径，来调整输出路径

```javascript
  let outputPath = url;

  if (options.outputPath) {
    if (typeof options.outputPath === 'function') {
      outputPath = options.outputPath(url, this.resourcePath, context);
    } else {
      outputPath = path.posix.join(options.outputPath, url);
    }
  }

```

确定发布的路径
```javascript
  let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

  if (options.publicPath) {
    if (typeof options.publicPath === 'function') {
      publicPath = options.publicPath(url, this.resourcePath, context);
    } else {
      publicPath = `${
        options.publicPath.endsWith('/')
          ? options.publicPath
          : `${options.publicPath}/`
      }${url}`;
    }

    publicPath = JSON.stringify(publicPath);
  }

  if (options.postTransformPublicPath) {
    publicPath = options.postTransformPublicPath(publicPath);
  }

```
输出路径将文件放置到相应的输出目录中去，发布路径将告知模块系统如何加载对应的文件资源

```javascript

  if (typeof options.emitFile === 'undefined' || options.emitFile) {
   this.emitFile(outputPath, content, null, { immutable });
  }

  const esModule =
    typeof options.esModule !== 'undefined' ? options.esModule : true;

  return `${esModule ? 'export default' : 'module.exports ='} ${publicPath};`;
}

```
通过查看file-loader的原码可以看出，file-loader的功能就是将通过该loader处理的资源文件做复制处理并获得文件最终的路径告知webpack模块系统其正确的加载路径。同时也能看出在编写该loader中的一些符合webpack推荐的规则：

* 单一指责 只负责处理文件模块化依赖 当然也响应符合链式调用规则
* 使用loader-utils中的方法， getOptions,interpolatename, 已经常见的schema-utils的使用
* 通过访问上下文，获取资源的路径信息，内容和文件的输出处理



## 参考文章

[深入浅出 Webpack](https://webpack.wuhaolin.cn/)
