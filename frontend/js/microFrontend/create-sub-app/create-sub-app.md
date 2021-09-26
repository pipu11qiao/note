### create-react-app项目的分析和使用 ####

最近项目中涉及到微前端部分，创建多个子应用，要保证子应用中的更多的是关心应用的业务逻辑，不需要关心开发依赖以及webpack 相关的配置。想借鉴crate-react-app中的功能来实现。
create-react-app 的功能是使用该命令可以直接创建一个开箱即用的react应用，在开发的运行环境(webpack，babel，css相关，lint)以及生产中打包的配置都被包含在另外一个核心包react-scripts中，用户在使用过程中不需要关心除了业务代码以及项目使用的依赖之外的功能。


#### create-react-app 代码分析

##### create-react-app命令,使用commander包来制作一个命令行命令

如果不输入项目名称,程序将会推出，其他参数都是可选参数


#### 创建app createApp 方法
* name 项目名称
* verbose 是否显示冗余信息
* version react-scripts 版本
* template 模版
* userNpm 是否使用npm
* usePnp 是否使用pnp

 useYarn 默认使用yarn来管理npm包，
 originalDirectory 执行命令所在的文件夹

#### run 方法
获取安装的react-scripts和template的信息 执行install方法
##### install 方法

安装主要的依赖 react react-dom react-scripts cra-tempalte 用于react-script中的init方法使用

##### 工具方法
* checkAppName 检查appName是否符合规范
* checkForLatestVersion  检查版本 保证使用最新的create-react-app来创建项目
去npm官网获取包的版本，不成功则是使用 `npm view pkg version` 命令获取包的版本然后和当前package.json 文件中的版本对比。
* fs-extra 提供了一些原生fs包没法很好提供的方法 fs.ensureDir
* isSafeToCreateProjectIn 检查文件夹中是否有影响创建的文件
* checkThatNpmCanReadCwd 检查npm命令是否在cd到创建的文件夹后正确的使用的process.cwd
* getInstallPackage 获得要安装react-scripts的方式 如果是通过npm包的整理版本信息
* getTemplateInstallPackage 获得模版信息
* getPackageInfo 获得包信息,name,version.如果是压缩文件通过请求或文件系统获取文件获得相应信息，
* getTemporaryDirectory 获得临时文件夹 用来存放构建过程中的临时应用的文件

### 总结

create-react-app 的功能就是
* 确定用户使用的包管理工具 yarn npm pnp
* 确定要使用的react-scripts 信息
* 确定要使用的template信息
* 创建项目目录，添加package.json
* 调用react-scripts中的init方法初始化项目,传入响应的信息
确保上述工作的稳定性
