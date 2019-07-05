## Snippets  vim 使用

Snippets 就是一些代码模板，能用通过输入特定的关键词和热键(一般设定为Tab)来触发。它可以节省很多的时间，因为有些代码在编写过程中都是重复的。Vim 本身不支持Snippet功能，我现在使用[UltiSnips](https://github.com/SirVer/ultisnips)并且把它和[YouCompleteMe](https://github.com/ycm-core/YouCompleteMe)结合来使用，当然还有别的引擎和可以完成类似功能，如[SnipMate](https://github.com/garbas/vim-snipmate), [Neosnippet](https://github.com/Shougo/neosnippet.vim), [Xptemplate](https://github.com/drmingdrmer/xptemplate)

#### 安装
使用[v-plug](https://github.com/junegunn/vim-plug)来管理vim插件
在 **~/.vimrc**中加入

```
Plug 'SirVer/ultisnips'
Plug 'honza/vim-snippets'

```
执行 : PlugInstall 安装两个插件,设置快捷键

```
let g:UltiSnipsExpandTrigger="<tab>"
let g:UltiSnipsJumpForwardTrigger="<c-b>"
let g:UltiSnipsJumpBackwardTrigger="<c-z>"

```

#### vim-snippets 介绍
[vim-snippets](https://github.com/honza/vim-snippets) 是在github上的一个包含了各种各样编程语言代码snippets文件的仓库。它是由社区维护的

其中： **snippets/*** 文件夹中的snippets是使用snipMate格式，**UltiSnips/***是UltiSnips格式的

这时在vim-snippets中提供的snippets模板都可以使用了，当然你也可以自定义snippets更好的适应个人的编程习惯。

##### 自定制snippet

##### snippet 加载方式

UltiSnips 中加载snippets文件方式是在相应的文件夹中找snippets文件，其中相应的文件夹是有两个参数来决定的

* g:UltiSnipsSnippetDirectories 配置搜索snippets文件的文件夹
* g:UltiSnipsSnippetsDir 定义自己的snippets文件放置的位置
比如你将你的snippets文件放在**~/.vim/mycoolsnippets**中，这时你的g:UltiSnipsSnippetDirectories配置应该是

```
   let g:UltiSnipsSnippetDirectories=["UltiSnips", "mycoolsnippets"]

```
###### snippets 文件对应文件类型
snippets文件与文件类型的对应是通过文件的命名来完成的。

如果一个当前文档类型是**ft**，那么ft.snippets,ft_*.snippets,ft/*都会被使用,下面是具体例子

snippet filename | filetype 
-- | --
ruby.snippets | ruby
perl.snippets | perl
c.snippets | c
c_my.snippets | c
c/a | c
c/b.snippets | c
all.snippets | all
all/a.snippets | all

##### 基本语法

* 使用**#**来注释
* **extends** 关键字来组合snippet文件，比如在cpp.snippets第一行加入
    ```
        extends c
    ```
    那么在UltiSnipes激活cpp类型snippets文件的时候，会同时搜索c类型的snippets并激活
* **priority** 关键字 来定义当前特性的权重
* 一行以**snnipet**开始来表示snippet代码的开始，一行以**endsnippet**开始来标记结束,snippet 代码就是在两行之间下面是一个Unix中sh文件类型的**if**语句的snippet

    ```
    snippet if "if ... then (if)"
    if ${2:[[ ${1:condition} ]]}; then
            ${0:#statements}
    fi
    endsnippet
    ```
第一行的采用下面的书写格式：

> snippet triigger_word [ "description" [options]]

触发的单词（triigger_word）,是必须的参数，描述（description）和 选项(options) 是可选的参数
**triigger_word** 是用来触发代码块的单词或字符串表达式,通常来讲是一个单词但是如果你想包含空格，可以使用引号来包裹，例如

```
snnippet "tab trigger" 

```
**description** 是描述该snippet的作用，用来和别的相同的名称（triigger_word）作区分

###### 选项

**options** 来控制snippet的表现,是一些单个字符的组合使用

* b Beginning of line 若果代码块中有这个选项，只有在触发关键字是改行第一个单词的情况下触发。换句话说，在该触发词之前只有空格。默认是在任何位置都能触发的。
* i 


#### 参考链接

* [vim-snippets](https://github.com/honza/vim-snippets)
* [UltiSnips](https://github.com/SirVer/ultisnips)
