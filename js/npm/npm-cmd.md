#### 查看包的所有版本 ####

npm view package versions

#### npx ####
* 简化模块调用
npx 作用是执行某个模块的功能，例如项目中使用webpack命令需要在package.json中的scripts标签才能调用， 如果想通过命令行调用，需要
```javascript
// 项目的根目录下执行
$ node-modules/.bin/webpack --version
```
通过npx命令可以直接使用：

```javascript
npx webpack
```
简化内部模块调用的方式，npx的原来是到node_modules/.bin 和$PATH里面，检查命令是否存在。 因而npx也可以执行系统的命令

* 避免全局安装

如create-react-app，需要全局安装然后执行，通过npx命令无需全局安装也可以调用，npx会临时将create-react-app模块下载下来，待调用完成后将其删除

* 其他  --no-install 和 --ignore-existing 可以调用远程仓库的包





