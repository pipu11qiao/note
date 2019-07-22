# vim 学会使用 help #

Vim的帮助文档对使用者非常的有帮助，但是需要在使用前花点时间了解使用方法。

### help 命令 ###

* :help 或 :h , :h是:help的简写，下文中的:h 都可以被替换成:help。 单独输入这个命令会打开vim的帮助文档，包含了常用的命令总览，教程链接和本地安装的插件的帮助文档
* :h pattern 查看 **pattern(表达式)**主题的帮助文档

在查看pattern过程中，
    * 如果输入：h patt 这时按下Ctrl + d,可以列出所有包含‘patt’的主题
    * 如果输入：h patt 这时按下Tab,可以列出所有包含‘patt’的主题（如果设置了 wildmenu 能够使用增强版的自动补全的命令。）

#### context 上下文 ####

 类别 | 前缀 | 例子
 :-|:-|:-
 普通模式命令 |  |  :help x
 可视模式命令 | v_ | :help v_u
 插入模式命令 | i_ | :help i_<Esc>
 命令行模式命令 | : | :help :quit
 命令行编辑 | c_ | :help c_<Del>
 Vim 命令参数 | - | :help -r
 选项 | ' | :help 'textwidth'
 正规表达式 | \/ | :help \/[


 #### 在帮助页面的操作 ####
打开的帮助页面就是一个k
 * 转至主题
 可以使用 Ctrl + ] 跳转到光标所在的主题上，如果开启了鼠标可以,如果开启了鼠标，双击左键也可跳转
 * 返回跳转前主题
 使用 Ctro + o,可以返回浏览前主题

##### 参考链接 #####
[ Lear to use help ](https://vim.fandom.com/wiki/Learn_to_use_help)
