# Lerna -- 管理包含多个包javascript项目的工具 #

将一个大的代码库分离成不同的独立版本控制的包可以极大的促进代码的共用,然而，在不同的库作出改动是容易混乱并且不容易追踪，同时在不同的库之间测试复杂度会很快增加。

为了解决以上问题（也包括其他的问题）,一些项目将代码库组织成多包库。在一个库中开发所有的包.

** Lerna 是一个使用git和npm来优化管理多包仓库的流程的工具 **

##### lerna 仓库的样子

```
my-lerna-repo/
  package.json
  packages/
    package-1/
      package.json
    package-2/
      package.json

```
##### lerna 能做什么

在lerna中两个初始命令 `lerna bootstrap` 和 `lerna publish`。
bootstrap 链接在仓库中的依赖。 publish命令可以帮助发布和更新包


##### lerna 不能做什么
lerna 无服务器单一库的部署工具，以来提升会和传统的无服务器单一库部署技术不相容。

#### 开始使用
lerna项目初始化，执行lerna init命令
```
$ mkdir lerna-repo && cd $_
$ npx lerna init
```

这将会创建一个 `lerna.json`同时也添加一个`packages`文件夹，文件夹的目录是：

```
lerna-repo/
  packages/
  package.json
  lerna.jsonk
```

#### 如何工作

lerna 允许你使用两个模式中的一个来管理你的项目，固定和独立模式

##### 固定模式（锁定模式） 默认
固定模式的lerna项目将操作一个版本线， 该版本值在根目录下的 `lerna.json`文件中的一个version字段中维护。当你运行 `lerna pulish` 时，如果一个在lerna中且被依赖模块从上次发布的版本之后更新过，它将会在你新发布的版本中更新。这意味着，你只需要发布一个新的版本包当你需要的时候。

> 注意： 如果要发布一个未使用的朱版本号，所有的包都会被认为是更新。

这种模式也是Babel正在使用的。

#### 独立模式

独立模式的lerna项目允许维护者独立给的对每个包的版本管理。每次发布的时候，将会提示改变每个包的主要 次要和分支版本号。

> 在lerna.json文件中将version字段改为independent来运行独立依赖模式。

#### 概念

运行 `lerna --help` 命令查看可用的命令行和配置项

##### lerna.json

```
{
  "version": "1.1.3",
  "npmClient": "npm",
  "command": {
    "publish": {
      "ignoreChanges": ["ignored-file", "*.md"],
      "message": "chore(release): publish",
      "registry": "https://npm.pkg.github.com"
    },
    "bootstrap": {
      "ignore": "component-*",
      "npmClientArgs": ["--no-package-lock"]
    }
  },
  "packages": ["packages/*"]
}
```
* version: 当前仓库版本
* npmClient: 使用npm还是yarn来管理运行客户端命令
* command.publish.ignoreChanges： 发布忽略
* command.publish.message 发布的信息
* command.publish.registry 仓库地址
* command.bootstrap.ignore bootstrap忽略
* command.bootstrap.npmClientArgs 在bootstrap 中执行npm install传入的参数
* command.bootstrap.scope 指定bootstrap 的文件目录
* packages: 指定包的位置

在lerna.json中的包是那些包含package.json的文件夹，这是lerna如何识别叶子“包”，却别与根package.json，用来管理整个仓库开发依赖和脚本命令

结合glob的路径配置来指定包目录，`【packages/*,modules/*】`

##### 公共开发依赖 devDependencies

大部分 devDependenced 可以被拉取到跟lerna仓库，使用lerna link convert命令

上述命令将自动提升依赖，使用file:来替代

依赖提升有一些优点：

* 所有的包使用给你版本的依赖
* 可以维护依赖在根目录下,
* 减少依赖安装时间
* 更少的存储空间

注意： 那些提供二级制执行码的包仍需要在每个包安装


[lerna](https://github.com/lerna/lerna)



