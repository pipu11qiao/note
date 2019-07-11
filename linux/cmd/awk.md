## awk 命令 ##

awk 是用来管理数据和生成报告的脚本语言，awk命令行编程不需要编译，允许用户使用变量，数学方法，字符串方法和逻辑晕眩。

awk是一个可以让程序员以语句的形式编写简短但是强有效的程序的工具,这些语句用来定义使用于整个文档每一行搜索的文本表达式以及定义当在一行中有匹配是采取的操作。awk通常被用于表达式搜索和处理。他搜索一个或多个文件来查看他们是否含有特定表达式的行，然后采取相关的操作。

awk 是开发者名字的简写--Aho,Weinberger和Kernighan

### awk可以用来做什么 ###

#### 1.awk 操作  ####
* 挨行搜索一个文件
* 拆分每个输入行拆分为字段
* 比较输入行（字段）和表达式
* 在匹配行执行操作

#### 2.用处 ####
* 转换数据文件
* 产生格式化的报告

#### 3.编程结构 ####

* 格式化输出行
* 算术和字符串运算符
* 条件语句和循环许菊

#### 语法 ####

> awk options '选择标准 {操作}' 输入文件 > 输出文件

#### 选项options ####

* -f program-file: 从文件‘program-file’中读取awk的编写程序，而不是命令行中的参数程序
* -F fs: 使用fs来为输入字段分割

### 例子 ###

下面的例子中的文件都是有下面代码创建的

```
cat > employee.txt

```
输入内容

```
ajay manager account 45000
sunil clerk account 25000
varun manager sales 50000
amit manager account 47000
tarun peon sales 15000
deepak clerk sales 23000
sunil peon sales 13000
satvik director purchase 80000 

```
##### 1.awk 默认行为 awk默认输出给定文件的每一行 #####

```
 awk '{print}' employee.txt

```
结果：

```
 ajay manager account 45000
  sunil clerk account 25000
  varun manager sales 50000
  amit manager account 47000
  tarun peon sales 15000
  deepak clerk sales 23000
  sunil peon sales 13000
  satvik director purchase 80000
```
在上面命令中，没有给出选择表达式。所以每一行都调用了该动作。print 操作没有参数会打印整行，整个文件都被打印了。

##### 2.打印匹配行 #####

```
awk '/manager/ {print}' employee.txt

```
结果

```
  ajay manager account 45000
  varun manager sales 50000
  amit manager account 47000
```
打印匹配manager的行

##### 3.将一行分割成字段 #####

对于每一个记录航，awk程序会将一行用风分隔符分割（默认是空格），并将每个字段存入$n中，比如一行中有四个单词，那么将会被存储在$1,$2,$3和$4中，$0表示整行

```
a·wk '{print $1,$4}' employee.txt
```
结果：
```
ajay 45000
sunil 25000
varun 50000
amit 47000
tarun 15000
deepak 23000
sunil 13000
satvik 80000
```
$1和$4分别代表了名字和薪水字段

#### awk内置变量 ####

awk的内置变量包括$n,($0,$1,$2...)，还包括一下变量

* NR 当前记录的数量，记录通常是行。
* NF 当前记录的字段数量
* FS 分隔符
* RS 记录的分隔符，一般都是新行字符
* OFS 输出文件的分隔符
* ORS 输出文件的记录分隔符

变量的例子

##### NR展示行号 #####

```
 awk '{print NR,$0}' employee.txt 
```
结果
```
1   ajay manager account 45000
2   sunil clerk account 25000
3   varun manager sales 50000
4   amit manager account 47000
5   tarun peon sales 15000
6   deepak clerk sales 23000
7   sunil peon sales 13000
8   satvik director purchase 80000
```

##### 输出3到6行 #####

```
awk 'NR==3,NR==6 {print NR,$0}' employee.txt

```
结果：
```
3   varun manager sales 50000
4   amit manager account 47000
5   tarun peon sales 15000
6   deepak clerk sales 23000
```

#### 更多例子####

文件 geek.txt

内容:

```
Tarun    A12    1
Man    B6    2
Praveen    M42    3
```
##### 打印行号和第一列,用‘-’分割  #####

```
awk '{print NR "-" $1}' geek.txt
```
结果：
```
1-Tarun
2-Man
3-Praveen

```
##### 查找最长的一行并且输出长度 #####

```
awk '{ if(length($0) > max) max = length($0) } END {print max}' geek.txt

```
结果:
```
19
```

