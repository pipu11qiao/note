1. eslint 是干嘛的
2. 一般使用哪些配置
3. 如何发布一个基于 eslint 的规则包
4. eslint 中重要的概念
5. 配置文件常用的配置
6. eslint 和 插件配置的版本
7. eslint中语言配置项有哪些
8. 插件相关的问题

## 1. eslint 是干嘛的

是可配置的代码检测工具。 静态分析代码找出问题,并修复问题。问题一般是潜在的运行时错误，不符合最佳实践或代码格式错误。
可以和编辑器结合

## 2. 一般使用哪些配置

可以使用 `npm init @eslint/config`命令来生成配置文件，.eslintrd.{js，yml,json},不需要了解配置项本身就能进行基本的 eslint 配置
Environments: 你的 js 是在哪个环境运行的。 每个环境会规定一些预置的全局变量
Globals: 额外的全局变量，你的代码中在执行的时候可以获取的
Rules: 哪些规则以及这些规则的错误级别
Plugins: 第三方的插件，规定了额外的规则，环境设置，配置等等。
忽略文件

## 3. 如何发布一个基于 eslint 的配置包

eslint中的分享配置就是一个npm包，基于eslint的扩展的能力，配置包中可以对规则，插件和所有的配置项进行配置。

## 4. eslint 中重要的概念

#### Rules 规则

rule 规则是 eslint 中的核心单元， 一个规则检验你代码中是否存在不符合该规则的错误，并且设置了如何处理该错误。rule 可以自定义

#### Congiguration Files 配置文件

配置文件用来收集 eslint 的配置。设置规则，插件，共享的配置

#### shareable configurations

分享 eslint 配置，是某些常用的 eslint 配置,通过 npm 的方式进行共享

#### Plugins

一个 eslint 插件是一个 npm 模块，其中包含了一系列的规则，配置，处理和环境变量。一般插件会包含自定义的规则。其中规定了一些规则用来对特定的 js 扩展进行支持，如 ts，vue,react

#### Parser

一个 eslint 解析器可以将代码转为 eslint 评价的抽象语法
一般插件会包含解析器的配置，无须配置

#### Custom Processors

自定义处理器 从其他类型的文件中提取 js 的代码，然后 eslint 对其进行格式检查。

#### formatters

格式工具，对 eslint 命令行的输出做了限制

#### Intergrations

交互 eslint 和常规的编辑器都可以无缝的配置，用户无须自己手动执行命令就可以使用 eslint 的功能。

#### 5. 配置文件常用的配置

root 配置项，eslint 会一直向父文件夹寻找配置文件，如果设置 root 则会在文件所在目录停止。一般项目都要加上
**root**:true,

扩展配置文件，一旦加入扩展的文件，会从扩展文件中获取所有的配置（规则，插件，语言选项）和修改的所有的选项。

**extends** 属性的值可以是

- 字符串，具体扩展的名称，也可是配置文件的路径，也可以是分享的配置
- 字符串数组，后面的扩展会扩展前面的扩展。(相同的配置字段会以采用最后一个) 

```
[
 "plugin:vue/recommended",
 "eslint:recommended",
 "./eslintrcDir/.eslintrc.js",
]
```
extend 属性是递归的

**eslint-config**前缀可以忽略

使用插件中的配置文件

插件是可以再eslint中添加不同文件的扩展。通常添加了一些规则和共享配置。

```
{
  plugins:["react"],
  extends:["eslint:recommeded","plugin:react/recommeded"]
}
```
overrides 
overrides 属性可以用来对某些规则进行覆盖配置。比如说原来项目使用普通的js，后来加入ts，可以对新加入的ts部分进行ts设置。

```
{
  overrides:[
    {
      files:['aa'],
      rules:[],
    }
  ]
}
```


## 7. eslint中语言配置项有哪些

#### env: 内置的可选字段
browser,node,commonjs,shared-node-browwser,...

##### 可以通过加载注释来说明当前文件的env

##### 可以使用插件中的env

确定全局变量 globals

#### 明确解析选项

* ecmaVersion
* sourceType
* allowReserved
* ecmaFeatures 
  * globalReturn
  * impliedStrict
  * jsx

## 8. 插件相关的问题

####  明确解析器
eslint 默认使用Espree来作解析器。

* esprima
* @babel/eslint-parser
* @typescript-eslint/parse

#### 明确处理程序

处理程序可以从其他类型的文件中提取js代码，进行lint
