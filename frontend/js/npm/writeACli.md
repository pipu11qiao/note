## 用node.js创建一个cli（命令行接口）


**本文将带你一步一步完成一个cli，跟随本文操作下来，你将了解如何去创建一个命令行工具，如果在工作中用到就可以自己别写自己的命令行工具了。需要对nodejs有一些基本的了解**


本文中的例子是创建一个我们在开发过程中常用的项目模版并且包含git和依赖安装，可以看做一个简单版的vue-cli。其中包含了

* 命令行的参数获取,--git -g 以及使用提示补足参数
* 如何将js文件程序添加到可执行的命令中
* 常用到的命令行编写npm包

其实命令行工具和我们平常写的node程序都是nodejs程序的执行
* 不同的地方在于命令行程序是可以通过直接键入自定义命令来完成程序调用，nodejs需要通过node ** 或 npm script方式调用。我们要编写的命令行类似于bash中的alias概念或者说是将可执行程序名称加入到可执行列表中去。
* 剩下的工作就是解析参数，完成程序本身的功能

直接开始吧！

*(先不用管过程中涉及到的新的api和npm包，这些都可以在完成以后在看)*

#### 1. 创建命令，接收参数 ####

创建一个nodejs项目:
```javascript
mkdir create-project && cd create-project
npm init --yes
```
在目录下创建src目录并创建cli.js文件，cli.js内容;
```javascript
export function cli(args) {
 console.log(args);
}
```
该文件是用来解析参数和业务逻辑实现的文件。 下一步我们需要创建命令行的入口。 根目录创建一个文件夹bin并在其中创建一个新的文件create-project,写入内容：
```javascript
#!/usr/bin/env node

require = require('esm')(module /*, options*/);
require('../src/cli').cli(process.argv);
```
该文件中只做了很小的工作。首先我们加载了`esm`模块,让我们可以使用 `import`在我们的文件中,(也可以不使用import方式使用require的方式，本教程使用了[ES Module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import),esm包能够解决该方式的兼容),然后我们加载我们的 `cli.js`文件并调用cli方法传入 `process.argv`,该参数是通过命令行调用时传入的一个命令行参数数组.

这时需要安装esm依赖
```javascript
npm install esm
```

此时目录文件:
```
.
├── bin
│   └── create-project
├── node_modules
│   └── esm
├── package-lock.json
├── package.json
└── src
    └── cli.js
```

接下来我们将告知包管理器（npm）我们将暴漏一个CLI script（命令行脚本）.我们是通过在 `package.json`中添加合适的入口,在[bin](https://docs.npmjs.com/files/package.json#bin)字段，同时也修改 description name keyword main 字段

```javascript
{
  "name": "@pipu11qiao/create-project",
  "version": "1.0.0",
  "description": "A cli to create project",
  "main": "src/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": {
    "create-project": "bin/create-project",
    "@pipu11qiao/create-project": "bin/create-project"
  },
  "publishConfig": {
    "access": "public"
  },
  "keywords": [
    "cli",
    "create-project"
  ],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "esm": "^3.2.25"
  }
}
```
通过bin字段，告知npm安装这个命令行命令，我们在bin字段中添加两个命令，如果使用我们npm包可以通过用户名调用，如果是一般用户可以直接使用 `create-project`命令.

添加到命令行还需要最后一步，最简单的方式是使用 [npm link](https://docs.npmjs.com/cli/link.html),在项目中执行

```
npm link
```
这将在全局创建一个软链接，通过它能访问到你的项目,所以后续的代码更新也无需更新这个操作。 现在注册的命令已经可以调用了，输入：
```
create-projet
```
可以看到输出：

```
args [ '/usr/local/bin/node', '/usr/local/bin/create-project' ]
```
前两个参数随着node安装路径的变化而不同，随着你调用命令参数的变化改输出结果也会变多,加上--yes参数
```
create-project --yes
```
结果：
```
args [ '/usr/local/bin/node',
  '/usr/local/bin/create-project',
  '--yes' ]
```

#### 2.解析参数处理用户输入 ####

上面我们已经能拿到命令中的参数了，我们将解析参数。我们的命令将支持一个参数和一些选项：

* template 将会支持不同的模版 如果用户没输入将提示用户选择模版
* --git 使用 `git init `为项目初始化git
* -install 自动安装依赖
* -yes 跳过提示，使用默认选项

我们项目中使用 `inquirer`来提示用户输入确实的选项，使用 `arg`包来解析参数, 添加依赖

```
npm i inquirer arg
```

首先在cli.js文件中添加解析参数的功能：

```javascript
import arg from 'arg';

function parseArgumentsIntoOptions(rawArgs) {
 const args = arg(
   {
     '--git': Boolean,
     '--yes': Boolean,
     '--install': Boolean,
     '-g': '--git',
     '-y': '--yes',
     '-i': '--install',
   },
   {
     argv: rawArgs.slice(2),
   }
 );
 return {
   skipPrompts: args['--yes'] || false,
   git: args['--git'] || false,
   template: args._[0],
   runInstall: args['--install'] || false,
 };
}

export function cli(args) {
 let options = parseArgumentsIntoOptions(args);
 console.log(options);
}
```
运行 create-project --yes,可以看到skipPrompts选项变为true

```
{ skipPrompts: true,
  git: false,
  template: undefined,
  runInstall: false }
```
接下来我么将根据用户的输入参数决定是否微缺失的参数提示，如果用户选择跳过就直接返回默认的选项，否则提示用户选择确实的选项,添加promptForMissingOptions方法并在parseArgumentsIntoOptions后面调用。
```javascript
import arg from 'arg';
import inquirer from 'inquirer';

function parseArgumentsIntoOptions(rawArgs) {
// ...
}

async function promptForMissingOptions(options) {
 const defaultTemplate = 'JavaScript';
 if (options.skipPrompts) {
   return {
     ...options,
     template: options.template || defaultTemplate,
   };
 }

 const questions = [];
 if (!options.template) {
   questions.push({
     type: 'list',
     name: 'template',
     message: 'Please choose which project template to use',
     choices: ['JavaScript', 'TypeScript'],
     default: defaultTemplate,
   });
 }

 if (!options.git) {
   questions.push({
     type: 'confirm',
     name: 'git',
     message: 'Initialize a git repository?',
     default: false,
   });
 }

 const answers = await inquirer.prompt(questions);
 return {
   ...options,
   template: options.template || answers.template,
   git: options.git || answers.git,
 };
}

export async function cli(args) {
 let options = parseArgumentsIntoOptions(args);
 options = await promptForMissingOptions(options);
 console.log(options);
}
```
现在运行create-project命令将会看到输入提示：
```javascript
~/project/create-project  create-project
? Please choose which project template to use (Use arrow keys)
❯ JavaScript
  TypeScript
```
选择完模版后也会让你选择是否开启git，最后的输入结果：
```
{ skipPrompts: false,
  git: false,
  template: 'JavaScript',
  runInstall: false }
```
也可以通过添加-y参数跳过提示

#### 3.添加业务逻辑 ####
我们已经能够通过命令行拿到我们需要的参数，接下来就是我们实际的程序逻辑，创建一个模版项目，在一个空的文件夹中，
* 从模版中复制项目文件
* 执行git init 和 npm instal 加载依赖

##### 3.1 复制文件 #####

首先创建模版文件夹，templates 文件夹，包含javascript和typescript两个项目模版,里面有项目文件src等,其他配置（.babelrc lint配置）和package.json文件

```
.
├── javascript
│   ├── package.json
│   └── src
└── typescript
    ├── package.json
    └── src
```

复制文件使用 `ncp`包,改包能够递归复制文件夹,也可以强制覆盖同名文件，在控制台能够输出色彩文字使用 `chalk`包。

将所有的程序逻辑写在main.js文件中，在src目录下，代码：

```javascript
import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
 return copy(options.templateDirectory, options.targetDirectory, {
   clobber: false,
 });
}

export async function createProject(options) {
 options = {
   ...options,
   targetDirectory: options.targetDirectory || process.cwd(),
 };

 const currentFileUrl = import.meta.url;
 const templateDir = path.resolve(
   new URL(currentFileUrl).pathname,
   '../../templates',
   options.template.toLowerCase()
 );
 options.templateDirectory = templateDir;

 try {
   await access(templateDir, fs.constants.R_OK);
 } catch (err) {
   console.error('%s Invalid template name', chalk.red.bold('ERROR'));
   process.exit(1);
 }

 console.log('Copy project files');
 await copyTemplateFiles(options);

 console.log('%s Project ready', chalk.green.bold('DONE'));
 return true;
}
```
这段代码将会抛出一个 `createProjet`方法，该方法首先通过fs.access方法检测模版是否存在，如果存在通过ncp将模版目录复制到目标目录中去，会输出带有颜色的提示，在文件复制完成的时候

在cli.js中调用该方法

```javascript
import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';

function parseArgumentsIntoOptions(rawArgs) {
// ...
}

async function promptForMissingOptions(options) {
// ...
}

export async function cli(args) {
 let options = parseArgumentsIntoOptions(args);
 options = await promptForMissingOptions(options);
 await createProject(options);
}
```
新建文件夹 test-dir 并执行

```
create-project TypeScript --git

```
会看到提示完成，这是typescript目录下的文件也已经被复制到文件夹中了

```
/create-project/test-dir  tree -L 2
.
├── package.json
└── src

1 directory, 1 file
```

##### 3. 执行git init 和 npm instal 加载依赖 #####
我们将安装三个依赖,execa 能让我们运行外部的命令 pkg-install 安装依赖 listr 定义一个任务列表包含任务执行进度反馈

```
npm install execa pkg-install listr
```
在main.js中添加代码：

```javascript
import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
 return copy(options.templateDirectory, options.targetDirectory, {
   clobber: false,
 });
}

async function initGit(options) {
 const result = await execa('git', ['init'], {
   cwd: options.targetDirectory,
 });
 if (result.failed) {
   return Promise.reject(new Error('Failed to initialize git'));
 }
 return;
}

export async function createProject(options) {
 options = {
   ...options,
   targetDirectory: options.targetDirectory || process.cwd()
 };

 const templateDir = path.resolve(
   new URL(import.meta.url).pathname,
   '../../templates',
   options.template
 );
 options.templateDirectory = templateDir;

 try {
   await access(templateDir, fs.constants.R_OK);
 } catch (err) {
   console.error('%s Invalid template name', chalk.red.bold('ERROR'));
   process.exit(1);
 }

 const tasks = new Listr([
   {
     title: 'Copy project files',
     task: () => copyTemplateFiles(options),
   },
   {
     title: 'Initialize git',
     task: () => initGit(options),
     enabled: () => options.git,
   },
   {
     title: 'Install dependencies',
     task: () =>
       projectInstall({
         cwd: options.targetDirectory,
       }),
     skip: () =>
       !options.runInstall
         ? 'Pass --install to automatically install dependencies'
         : undefined,
   },
 ]);

 await tasks.run();
 console.log('%s Project ready', chalk.green.bold('DONE'));
 return true;
}
```
如果用户选择了git执行将会在项目中执行git init,选择了加载依赖，就会执行npm install 或 yarn 来加载依赖。

```
/project/create-project  rm -rf test-dir
/project/create-project  mkdir test-dir
/project/create-project  cd test-dir
/project/create-project/test-dir  create-project typescript --git --install
  ✔ Copy project files
  ✔ Initialize git
  ✔ Install dependencies
DONE Project ready
 wangyong@wangyongdeMacBook-Pro  ~/Study/project/create-project/test-dir   master 
```
此时会在目录中看见.git和node_moduels目录
```
.
├── .git
│   ├── HEAD
│   ├── config
│   ├── description
│   ├── hooks
│   ├── info
│   ├── objects
│   └── refs
├── node_modules
│   └── esm
├── package-lock.json
├── package.json
└── src
```
祝贺你已经成功创建了第一个cli应用

如果想将应用包装成一个真正额别人能够使用的模块，需要在src目录下添加index.js文件（package.json指定的入口文件）
```javascript
require = require('esm')(module);
require('../src/cli').cli(process.argv);
```

#### 下一步？ ####

目前为止已经创建了一个完整的命令行应用的包，如果只是自己用只需要使用npm link来在全局注册一下。 
如果想将你的应用分享给其他人，可以通过github npm发布等方式，这里强烈推荐npm发布的方式，注意要在package.json中添加files字段来明确那个文件将被发布

```
 },
 "files": [
   "bin/",
   "src/",
   "templates/"
 ]
}
```
[npm publish 发布自己的npm包](https://www.jianshu.com/p/7dcd87bd2d8f)


相关文章

* [How to build a CLI with Node.js](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js)
* [The magic behind npm linkjkkk](https://medium.com/@alexishevia/the-magic-behind-npm-link-d94dcb3a81af#:~:text=You%20can%20%E2%80%9Cundo%E2%80%9D%20the%20effects,to%20remove%20the%20global%20symlink.)

