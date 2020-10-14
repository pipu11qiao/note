预想的问题

1. 错误监控
2. header 直接使用 history 对象
3. 样式
4. 异步页面 // dev publicPath
5. 公共资源
6. 代理,node服务
7. babel polyfill
8. 主应用和子应用的项目结构
9. header类似的部分处理
10. 通信

#### 1. 错误监控

#### 2. header 直接使用 history 对象

放弃使用history 对象，使用react-router-dom中的createBrowser方式
开发环境子应用根据是否是乾坤使用，采用基本路由或hash路由

#### 3. 样式

* 子应用是通过乾坤动态挂载相应的css解决
* 主应用和子应用的，主应用加前缀（工程方式）

#### 4. 异步页面
dev publicPath
publicPath解决

#### 5. 公共资源

* 第三方包使用dll+npm的方式，将dll文件发到npm，实际在build只是读取json文件，通过配置public_path来写入对应的静态dll文件地址（cdn),?打包成npm包的使用?后续的更新方式
* 类似yq的文件,放置到avalon-common 的npm包 通过father插件来发布，对应的包

#### 6. 代理,node服务

* 子应用开发只需要dev-server,静态和代理
* node 服务的功能
* ngix的分发
只在主服务启用一个主服务

#### 7. babel polyfill

条件判断来引用

#### 8. 主应用和子应用的项目结构

git submodule方式



* avalon 
    * 静态资源  模版路由 
    * 配置子应用 路由验证
* 子应用 dev
    * 子应用 内部的路由 保证v/a 下的
    * dev 子应用调子应用
    * 子应用 用主应用的资源
        * 公共资源 统一
