## 在vim中使用模版文件

vim 中模版或框架，能让你在创建新的特定扩展名的文件时使用相对应的模版。

#### 内容列表

* 在vim中使用模版
* 为什么是一个框架文件
* 为什么使用一个框架文件
* 一个框架文件的例子
* 填充新文件
* 填充不带后缀名的文件
* 定制你的喜好

#### 在vim中使用模版

vim 理念鼓励用户去自动实现重复的操作并为此提供了带有优秀的使用文档的丰富工具包来实现。一个这种微小优化的例子就是在新文件打开的时候使用模板或者框架来填充vim的buffer（流）文件。

在**~/.vimrc**使用几行代码就能够创建一个丰富的框架模板库,而不必使用插件和添加依赖在你的VIM配置中。

#### 为什么是一个框架文件

框架文件是新文件创建时的基础模板。这意味着无论何时当新文件被创建是标准模板将会被调用并被调用到vim流文件中。例如一个**ruby**文件，模板可能是一个ruby类。文件的内容相比为特定扩展名文件如go、js的注意来说不那么重要。Vim能够用模板来填充新文件的内容。


#### 为什么使用一个框架文件

* 拥有能写脚本的标准。
* 可以包含权限信息
* 可以被分享
* 可以再版本控制中管理


#### 一个框架文件的例子

这是一个简单的shell脚本例子。Shell脚本一般应以释伴（用来解释用什么执行）作为开始，通常关于使用什么类型的释伴是正确的都会引起争论。我个人习惯是：

```
#!/usr/bin/evn bash

```
为了保证我能始终记住添加这段代码，使用矿建文件将是一个完美的选项。
只有一行的模板被保存到**~/.vim/templates/skeleton.sh**.你或许想添加权限和用法说明到模板中


#### 填充新文件
当创建新文件的时候使用框架模板，如下代码将会说过你预设的shell脚本模板来填充后缀名为**.sh**的新文件。

```bash

if has("autocmd")
    augroup templates
        autocmd BufNewFile *.sh 0r ~/.vim/templates/skeleton.sh
    augroup END
endif

```
这段代码可解释为：

* 用if语句判断当前vim是否开启[autocmd](http://vimdoc.sourceforge.net/htmldoc/autocmd.html)特性
* 创建一个名为**templates**的[group](http://vimdoc.sourceforge.net/htmldoc/autocmd.html#autocmd-groups)
* 一个新的自动命令会被调用在每次“开始编辑一个不存在文件”事件发生时（[BufNewFile](http://vimdoc.sourceforge.net/htmldoc/autocmd.html#BufNewFile)）
* 如果该文件是以**.sh**为后缀名就读取**~/.vim/templates/skeleton.sh**的内容并插入到第0行

#### 填充不带后缀名的文件

假如我们创建了换一个名为**backup**的bash脚本。这并不会使用模板因为没有.sh后缀名。因为Vim可以从硬盘中读取文件并把它写入文件流所以这不是一个问题。在Vim中简单的读文件到流命令：
```
:read ~/.vim/templates/skeleton.sh

```
#### 定制你的喜好

Vim 这种轻量的模版功能极方便,没有任何依赖，还可以将其整合到你自己的代码控制中存储。它能保证样式一致性不管是你自己的脚本还是被用来团队内部标准。

更多信息可通过**:help template**查看

#### 参考文章
* [Using template files in Vim](https://shapeshed.com/vim-templates/)



