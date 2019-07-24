## vim为markdown文件写snippets

vim 中可以为不同的文件类型写snippets（代码片段，用来快速补全一些经常输入的代码或文本）,本篇文章通过给markdown文件写snippets来熟悉snippets文件的语法。

#### snippet 语法简单的介绍

每个snippet片段分为三部分，起始行，片段代码，结束行。

##### 起始行 语法
> snippet trigger_word [ "description" [options]]

其中snippet 为关键字 trigger_word 是触发关键字，可以是单词也可以是表达式（含有空格的字符串需要用引号包裹，或使用其他的边界符号）,description是该snippet的描述，options是该snippet的属性

###### snippet 属性

* b Beginning of line 如果代码块中有这个选项，只有在关键字是该行第一个单词的情况下触发。如果在该触发词之前只有空格，也会触发。（不加选项，默认是在任何位置都能触发的。）
* i In-word expansion 字内扩展 - 默认情况下，片段在该行第一个单词或者前面是一个或多个空格时触发。一个含有此选项snippet,会忽略前面的字母。换句话说，snippet可以在单词中间触发,会忽略前面的字母。
* w Word boundry 使用此选项，片段会在触发关键字匹配特定单词开头边界、和匹配特定单词结束边界时展开。换言之，触发关键字的前面和后面必须是分单词字符。单词字符是有‘iskeyword’设置的。
* r Reggular expression 触发关键字是python正则表达式。必须用引号包裹（或其他字符）
* t Do not expand tabs 忽略片段中的tab字符，默认情况下，代码片段在插入的时候会根据vim现有的关于tab的设置对代码片段中含有的tag字符进行正确的配置。如果含有此选项，snippet会忽略代码中的tab字符，原样添加
* s 在跳转下一个tab停止位时，删除在行尾处光标前的空白字符。
* m 删除代码片段右侧的空格
* e 自定义代码上下文
* A 代码片段会自动触发
##### 中间片段代码

###### $VISUAl

在Snippet中包含一个特殊的替换字符 ${VISUAl}。用来替换选中的文字。
在观察模式下选中一些文字，按下触发（g:UltiSnipsExpandTrigger）键，这时选中的文字会被删除。进入插入模式，输入触发关键字，触发代码模版，这时就能看到选择的文字在里面.
##### 插入代码
中间的代码片段可以支持三种代码类型的编辑

* shell 代码
* Vim script 也可称为Viml
* python

###### tabstop

Snippets 是用来快速向文档中插入重复使用的文本。一般该文本会由不同的部分组成固定的结构。Tabstop(触发中继)用来简化变化部分的修改。通过Tabstop你可以很容易的在变化的内容上放置光标，进入内容输入，或者调到下一个输入内容处，直到所有内容输入完成。
tabstop的语法是一个'$'符后接一个数字，tabstop最开始的数字是1，以此类推。‘$0’是一个特殊字符，它总是代表了最后一个tabstop,无论有多少tabstop被定义，如果没有定义‘$0’，那么在代码的最后会被定义成'$0'

##### 结束行

结束行只有一个 ‘endsnippet’关键字

------

### 标题的snippet ###

markdown标题的语法是‘#‘,数量1-6，代表各标题的等级。我们要实现的目标是：
* 把选中的文字以标题语法包裹
* 直接在创建空的标题语法用来写入

实现的代码如下：

```
snippet sec "Section"
# ${1:${VISUAL:标题}} #$0
endsnippet

```

下面对这段代码作详细的说明：

这是一级标题的snippet,如果有选中内容就把选中的内容放到两个‘#’之间（没有选中则有默认值标题），因为tabstop$1的关系，内容会被置为选中状态，这时标题内容可以被编辑。再次按下tab键。光标会跳转到#后。

### 代码块snippet ###

markdown 的语法是\`\`\`\`\`\`，如果在第三个反引号的后面加上代码块使用的语言可以让编辑器增加语法高亮方便阅读,如html、javascript等,下面来通过书写一个正则匹配的snippet。

要实现输入cd，生成代码块，cd + (js/html/css)来让代码块后面标识上javascript html css的语言标识,我们需要写一个匹配这种情况的正则，cd(\w+)?。然后通过写一小段python代码获得匹配的结果，通过判断匹配的词来写入语言。

```vim

snippet "cd(\w+)?" "Codeblock With Lan" br
\`\`\``!p
if match.group(1) == "html":
	snip.rv="html"
elif match.group(1) == "css":
	snip.rv="css"
elif match.group(1) == "js":
	snip.rv="javascript"
`
$1
\`\`\`
$0
endsnippet

```

反引号\`\`,后接!p说明是python语句，在python代码块中 match是有正则的情况下的匹配结果。snip.rv 赋值就是返回该代码块的结果（根据cd后面的单词判断并输出代码块的语言）。



