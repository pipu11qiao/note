### 提高webapck打包速度-DllPlugin的使用和不足


##### 什么是dll

> DLL(Dynamic Link Library)文件为动态链接库文件,在Windows中，许多应用程序并不是一个完整的可执行文件，它们被分割成一些相对独立的动态链接库，即DLL文件，放置于系统中。当我们执行某一个程序时，相应的DLL文件就会被调用。

在项目中第三方的代码库就是独立的链接库，我们每次打包的时候都会将这些库进行和我们自己编写的代码一样的编译压缩检查等等工作，dll就是可以把这些第三方的库放在一起单独打包，不需要每次都打包

#### 基本使用

webpack 使用dll的方式是由两个插件完成的

* DllPlugin

* DllReferencePlugin

1. 使用DllPlugin 打包第三方库,以react为例,创建dll.base.js,entry 入口文件就是需要打包的js，文件名vendor

```javascript

const webpack = require('webpack');
const path = require('path');

const vendor = [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    // 其他插件
    'react-transition-group',
    'prop-types',
    'classnames',
    'history'
];

module.exports = {
    output: {
        path: path.resolve(__dirname, './dll'), // js 存放的地方
        filename: '[name].js', // name -> 'verdor'
        library: '[name]',
    },
    entry: {
        vendor: vendor
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]', // 和上面的library一样就行
        }),
    ],
};

````
在package.json的scripts中添加运行这个文件的命令:

>     "dll": "webpack --config dll.base.js"

会在项目目录下产生dll文件夹和manifest.json文件，dll中有vendor.js,manifest.json有两个属性 name文件名，content： 含有的的module信息

2.在正常生产打包过程中,通过DllReferencePlugin将打包好的库和剩下的需要编译的代码在module依赖上结合起来

webpack.config.js 中pluging 配置，注意只需在生产环境配置这插件
```javascipt

    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require("./manifest.json"), // dll 中生成的json 文件
        }),
    ],

```
在没有添加这个plugin的时候，build过程用时4767ms,打包200个module,budle.js 大小201kb
添加DllReferencePlugin后, 用时3195ms,打包175个module, bundle.js 大小41kb
打包完的html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React and Webpack4</title>
<link href="app.css" rel="stylesheet"></head>
<body>
<section id="index"></section>
<script type="text/javascript" src="app.bundle.js"></script></body>
</html>

```
可以看到只有bundle.js 这个引用，没有vendor.js,需要用到HtmlWebpackPlugin 插件里面的inject功能

3. 用到HtmlWebpackPlugin 插件里面的inject功能,引用vendor.js
在webpack.config.js中

```javascipt

const Manifest = require('./manifest.json');

const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: './index.html',
    vendorName: '../dll/'+Manifest.name + '.js',
    inject: true
});

```
vendorName就是引用的完整的路径

****

##### 参考链接

1.[DllPlugin](https://webpack.docschina.org/plugins/dll-plugin/)

2.[demo](https://github.com/webpack/webpack/tree/master/examples/dll)
