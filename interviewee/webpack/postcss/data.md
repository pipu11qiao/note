postcss 是css后处理器，输入是css输出是css

通过自己的parser将css代码抽象成cssAST


```css
@media screen and (min-width: 480px) {

    body {

        background-color: lightgreen;

    }

}

#main {

    border: 1px solid black;

}

ul li {

	padding: 5px;

}
```
CSS AST 节点主要有以下构造类组成：
媒体查询 注释 选择器
{
    type: 'root',//root根节点 atrule带@标识的部分 rule选择器节点 decl css属性和属性值 comment 注释
    nodes: [],子节点
}

Root: 根结点，整个处理过程基本上都在围绕着 Root，Commont，AtRule，Rule 都是它的子节点。
Commont: css 中的注释信息，注释的内容在 comment.text 下。
AtRule: 带@标识的部分，name 为标识名称，params 为标识参数。nodes 为内部包含的其他子节点，可以是 Commont，AtRule，Rule，这让我们可以自定义更多的规则。
Declaration：每个 css 属性以及属性值就代表一个 declaration

#### 4.1 Rule 选择器节点
一个选择器代表一个Rule,nodes 为Declaration 
* raws
    * before
    * between 选择器与 { 之间的内容
    * semicolon
    * after
* type
* nodes
* source
    * start 开始 行列
    * end 结束 行列
    * input 匹配的文本
        * file The absolute path to the CSS source file defined with the from option.
    
* selector 选择器    
#### 4.2 Declaration 属性节点

* prop 样式属性
* value 样式值

可以手动修改属性值，也可以添加属性值

#### 4.3 comment

* text 

构造器的方法和属性

继承自Container 

nodes 
parent
rows
source
type
last
first
after
clearRaws
clone
cloneBefore
cloneAfter
each 遍历儿子节点
error
next Returns the next child of the node’s parent. Returns undefined if the current node is the last child.

walk
walkAtRues
walkComments
walkRules
walkDecls 遍历属性节点

postcss 官方文档很详尽的描述了构造函数的api，相应的属性和方法
