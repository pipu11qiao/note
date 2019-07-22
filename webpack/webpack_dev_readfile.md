#### webapck 在dev环境下读取内存中的文件
webpack 在dev环境中的读写会在内存中完成，它使用[memory-fs](https://github.com/webpack/memory-fs)插件来完成在内存中的读写。
在webpack中，webpack-dev-middleware 将 webpack 原本的 outputFileSystem (node的fs系统)替换成了MemoryFileSystem 实例，这样代码就将输出到内存中。webpack-dev-middleware 中该部分源码如下：
```javascript
// webpack-dev-middleware/lib/Shared.js
var isMemoryFs = !compiler.compilers && compiler.outputFileSystem instanceof MemoryFileSystem;
if(isMemoryFs) {
    fs = compiler.outputFileSystem;
} else {
    fs = compiler.outputFileSystem = new MemoryFileSystem();
}
```
通过代码我们知道我们需要在webpack dev server之前将compiler.outputFileSystem 置为MemoryFileSystemde 的实例(如果是MemoryFileSystem的两个实例之间不会访问到各自的文件)
在webpack.dev.js 中
```javascript

    const compiler = Webpack(WebpackBaseConfig);
    const fs = compiler.outputFileSystem = new MemoryFileSystem();

```
这个fs实例也是webapck的输出fs，可以访问到dev-serber中的文件。

#### 在开发中需要的需求是，在dev环境下能够将user信息渲染到页面中

```javasript

    server = new WebpackDevServer(compiler, {
        inline: true,
        contentBase: [输出路径, path.resolve(__dirname, 静态路径)],
        hot: true,
        proxy: proxyConfig,
        publicPath: dev_publicPath,
        stats: {
            chunks: false,  // 使构建过程更静默无输出
            colors: true,    // 在控制台展示颜色
        },
        before(app) {
            app.engine('html', ejs.renderFile); // 配置引擎
            // app.set('views', vars.dist_root + '/templates');
            app.get('/templates/**', async (req, res) => { // 配置路由访问html的请求中获取user信息渲染
                console.log('get html request');
                const url = 'http://local.zx-math.test.17zuoye.net:3600/api/user_info_by_cookie';
                const option = {
                    url: url,
                    method: 'get',
                    headers: req.headers,
                    json: true,
                    timeout: 10000
                }
                const task_count_res = await HttpUtil.fullRequest(option);
                const user = task_count_res.body.data;
                try {
                    const file = fs.readFileSync(path.resolve(vars.dist_root) + req.url).toString();
                    // console.log(file);
                    // res.render(file,{USER:JSON.stringify(user)});
                    // res.set('Content-Type', 'text/html');
                    res.send(ejs.render(file, {USER: JSON.stringify(user)}));
                } catch (e) {
                    // console.log(e.message);
                    res.send('waiting...,等编译完手动刷新');
                }
            });
        }
    });

    server.listen(port, '', () => {
        const openUrl = inquirerConf.devOpenUrl[process.env.NODE_DRIVER_ENV];
        open(openUrl);
    });

```


##### 参考链接

1.[webpack内存读取技术调研及node相关](https://blog.csdn.net/major_zhang/article/details/84557665)

