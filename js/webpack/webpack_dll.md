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

webpack.config.js 中plugin 配置，注意只需在生产环境配置这插件
```javascipt

    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require("./manifest.json"), // dll 中生成的json 文件
        }),
    ],

```
在没有添加这个plugin的时候，build过程用时4767ms,打包200个module,bundle.js 大小201kb
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
template.html 

```html

<script type="text/javascript" src="<%= htmlWebpackPlugin.options.vendorName %>"></script>

```
vendorName就是引用的完整的路径

****

#### 不足之处
1. dll中的文件需要锁定版本，不能使用对应的contenthash
打包的第三方js不能够加上文件名上的hash,可以在每次发新版的时候生成hash拼接query的方式解决,不过这种方式需要另外增加代码，并且多人合作时不一定能有效控制每个包的版本。

2. 两种以上的dll包使用起来麻烦

如果项目中有很多的第三方代码(mvc库，UI库及其相关的库，图表库（一般都很大），相应的poly-fill（兼容性代码）)如果都打包到一起就会是很大的一个文件，这时会通过分开打包让浏览器能够并行下载这些文件的方式来加快加载速度。 下面dll代码会生成相应的三个dll文件 r1,t1,t2. 文件名是contenthash

```javascript

const entry = {
    // react相关
    r1: [
        'react',
        'react-dom',
        ...
    ],
    // bizchart
    t1: [
        'bizcharts',
    ],
    // 其他1
    t2: [
        'jquery',
        'moment',
        'babel-polyfill',
        'proxy-polyfill'
    ],
    // // 其他2
    // t3: [
    //     ''
    // ]

};


module.exports = {
    output: {
        path: rootPath,
        filename: 'dll.[name]-[contenthash].js',
        library: '[name]',
    },
    entry,

```

##### 多个文件的dll在build的使用方式,先假设文件名是r1,t1,t2 三个普通的

* 在webpack.config 中的plugin属性上要添加对应的DllReferencePlugin.

```javascipt
        plugin.push(
            new Webpack.DllReferencePlugin({
                    manifest: require(r1的manifest json 的path), // dll 中生成的json 文件
            }),
            new Webpack.DllReferencePlugin({
                    manifest: require(t1的manifest json 的path), // dll 中生成的json 文件
            }),
            new Webpack.DllReferencePlugin({
                    manifest: require(t2的manifest json 的path), // dll 中生成的json 文件
            })
        )

```
* 同时在htmlplugin的配置中需要配置相应的script替换项

```javascipt
        plugin [
            new HTMLWebpackPlugin({
                template: './index.html',
                r1: 'dll文件夹path/r1.js',
                t1: 'dll文件夹path/t1.js',
                t2: 'dll文件夹path/t2.js',
            });
        ]
```
* 在index.html中添加

```html
    <script type="text/javascript" src="<%= htmlWebpackPlugin.options.r1%>"></script>
    <script type="text/javascript" src="<%= htmlWebpackPlugin.options.t1 %>"></script>
    <script type="text/javascript" src="<%= htmlWebpackPlugin.options.t2 %>"></script>
```

##### 改进这个使用方式

其实多文件dll的build过程就是，Webpack.DllReferencePlugin中把生成的每个json添加这个插件一次，在html添加上对应的文件名称和路径。

* 第一点可以通过遍历dll包中的json文件写入DllReferencePlugin,walk 方法是遍历文件夹
```javascipt
            var getDllConfigs = (dllPath) => {
        const result = [];
        var walk = function (dir) {
            var results = []
            var list = fs.readdirSync(dir)
            list.forEach(function (file) {
                file = dir + '/' + file
                var stat = fs.statSync(file)
                if (stat && stat.isDirectory()) results = results.concat(walk(file))
                else results.push(file)
            });
            return results
        };
        const dllFiles = walk(dllPath);
        dllFiles.forEach((filePath) => {
            if (path.extname(filePath) === '.json') {
                result.push({
                    manifest: require(filePath), // dll 中生成的json 文件
                });
            }
        });
        return result;
    };
    getDllConfigs(dll_path).forEach(item => {
        WebpackBaseConfig.plugins.push(new Webpack.DllReferencePlugin(item))
    });

 ```

* htmlPlugin 可以通过写一个小插件来完成

```javascript
        //insert html
        var fs = require('fs');
        var path = require('path');
        var walk = function (dir) {
        var results = []
    var list = fs.readdirSync(dir)
    list.forEach(function (file) {
        file = dir + '/' + file
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()) results = results.concat(walk(file))
        else results.push(file)
    });
    return results
};

function insertHtmlDllPlugin(options) {
    this.options = options;
}

insertHtmlDllPlugin.prototype.apply = function (compiler) {
    var self = this;
    // webpack 4 support
    compiler.hooks.compilation.tap('insertHtmlDllPlugin', (compilation) => {
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('insertHtmlDllPlugin', (htmlPluginData, callback) => {
            self.onAfterHtmlProcessing(htmlPluginData, callback);
        });
    });
}

insertHtmlDllPlugin.prototype.onAfterHtmlProcessing = function (htmlPluginData, callback) {
    var enable = typeof this.options.enable !== 'undefined' ? this.options.enable : true;
    if (!enable) {
        return;
    }
    var dllPath = this.options.dllPath;
    if (!dllPath || !fs.existsSync(path.resolve(dllPath))) {
        throw new Error('dll path don\'t exist');
    }
    // 遍历dll文件夹找到对应的js，写入html的header中
    var dllFiles = walk(dllPath);
    var scriptsStr = '';
    var publicPath = this.options.publicPath || '';
    dllFiles.forEach((filePath) => {
        const fileName = path.basename(filePath);
        if(path.extname(filePath) === '.js'){
            scriptsStr += '<script type="text/javascript" src="' + (publicPath + fileName) + '"></script>';
        }
    });
    //
    console.log(this.options);

    htmlPluginData.html = htmlPluginData.html.replace('</head>', scriptsStr + '</head>');
    callback(null, htmlPluginData);
};

module.exports = insertHtmlDllPlugin;

```
将所有的js写入head 标签中

3. 不能很好地支持异步的文件(也许是没研究出来)



##### 参考链接

1.[DllPlugin](https://webpack.docschina.org/plugins/dll-plugin/)

2.[demo](https://github.com/webpack/webpack/tree/master/examples/dll)
