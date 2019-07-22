## NERDTree 的一些功能

* 打开/关闭 以.开头的文件的显示,快捷键 **I**。

#### 书签功能 Bookmark

nerdtree中书签功能是给某个文件或者文件夹加上一个标记。例如，你可以给你的项目文件夹打上一个标签。

使用**B**键来开启或者关闭标签，标签会在目录窗口最上方展示，你可以使用o键打开某个标签，也可以使用t或T键。

常用命令：

* :Bookmark [<name书签名>] 给当前选中的路径创建一个书签，书签名可以随意，不能有空格
* :ClearBookmarks [<bookmarks>] 清除书签
* :ClearAllBookmarks 清除所有书签
* :EditBookmarks 编辑书签

#### nerdtree menu 功能提供了一些文件操作的功能，方便在vim中创建/移动/重命名/删除文件和文件夹
在nerdtree 窗口先要操作的文件夹或文件上键入**m**,调出菜单小窗口，使用j/k和enter键，或者键入缩写来选择对应的操作


 NERDTree Menu. Use j/k/enter . or the shortcuts indicated

=========================================================
  (a)dd a childnode 添加一个子节点
  (m)ove the current node 移动或重命名一个子节点
> (d)elete the current node 删除一个子节点
  (r)eveal in Finder the current node 文件浏览中打开该节点
  (o)pen the current node with system editor 使用系统默认编辑器打开该节点
  (q)uicklook the current node 查看快捷信息
  (c)opy the current node 复制该节点
  copy (p)ath to clipboard 复制节点路径
  (l)ist the current node 查看该节点

#### nergtree 部分快捷键 默认设置 

快捷键 | 描述
--- | ---
o | 打开文件、文件夹和书签
go | 打开文件，打开后光标留在nerdtree窗口,在本窗口打开书签
t | 在新的tab中打开选中的节点或书签
T | 同t，光标留在当前的tab
i | 在新打开竖直窗口打开文件
gi | 同i,光标留在nerdtree窗口
s | 在新打开水平窗口打开文件
gs | 同s,光标留在nerdtree窗口
O | 展开该文件夹所的内容
x | 收起该节点的父节点
X | 收起该节点及所有下面的的子节点
e | 编辑该文件夹
<CR> | 同o 
double-click | 同 o 
middle-click | 如果是文件同i 如果是文件夹同e
D | 删除当前书签
P | 跳到根节点
p | 跳到父节点
K | 跳到当前目录树的第一个一级节点
J | 跳到当前目录树的最后一个一级节点
<C-J> | 跳到下一个兄弟节点
<C-K> | 跳到上一个兄弟节点
C | 将根节点变成选中的节点
u | 将根节点变成上一级文件夹
U | 同u，但是原来的的根节点保持打开
r | 刷新当前文件件和子文件
R | 刷线整个目录
m | 展示nerdtree功能菜单
cd | 将CWD（current working directory 当前工作的文件夹）设置为选中的节点
CD | 设置根节点为CWD及节点
A | 放大nerdtree窗口
