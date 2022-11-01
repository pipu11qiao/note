## find 命令 ##

find命令在Unix中是遍历文件层次的命令行工具,可以用来查找文件和目录，对它们执行一些后续命令。它支持查找：文件、文件夹、名称、创建日期，修改日期，创建者和权限。 通过使用 `-exex` 参数可以在找到的文件和目录上执行其他的Unix命令。

#### 语法 ####

find [path 开始搜索位置] [定义搜索内容的表达式] [选项 -opitons] [搜索内容]

#### 选项 options ####

* -exec CMD: 符合上述查找条件的文件，返回0如果执行的命令成功的话
* -ok CMD: 和exec参数一样区别在于用户先被提示
* -name demo: 查找文件名为demo的文件
* -newer file： 查找在file文件之后创建或修改的文件
* -perm octal: 查找权限是octal的文件
* -print: 展示文件名称
* -empty： 查找空的文件和文件夹
* -size +N/-N 查找含有N个block的文件（扇区）+N表示大于N -N表示小于N
* -user name: 根据创建者名称查找文件
* \(expr\): 使用expr表达式来查找文件，当expr匹配结果为真是表示文件符合条件，用来结合OR和AND来使用
* !expr: 使用expr表达式取反的匹配来查找文件


例子：
当前p文件夹及其中的文件：

```
➜  Tmp tree p
p
├── d1
├── d2
│   ├── a.txt
│   └── b.txt
└── d3

3 directories, 2 files
➜  Tmp cat p/d2/a.txt
aaaa
a1a1
➜  Tmp cat p/d2/b.txt
bbbbbb
b1b1b1
➜  Tmp

```
##### 1. 查找特定名称的文件 #####

用法和结果: 其中find的以第一个参数是搜索的文件夹，淡然也可以是./ ../ 或者是绝度路径

```
➜  Tmp find p -name a.txt
p/d2/a.txt
➜  Tmp


```


##### 2. 查找包含万用字符的文件 #####
名称中可以结合unix中命令行的万用字符

用法和结果:

```
➜  Tmp find p -name [ab].txt
p/d2/b.txt
p/d2/a.txt
➜  Tmp

```

##### 3. 对查找到的文件执行询问删除 #####

用法和结果:

```
➜  Tmp find p -name a.txt -exec rm -i {} \;
rm: remove regular file 'p/d2/a.txt'? y
➜  Tmp find p -name a.txt
➜  Tmp

```

##### 4.查找空文件和空文件夹 #####

用法和结果:

```
➜  Tmp find -empty
./p/d1
./p/d3
➜  Tmp


```

##### 5. 查找权限相关的文件 #####

用法和结果:

```
➜  Tmp find p -perm 664
p/d2/b.txt
➜  Tmp 

```

##### 6. 在找到的文件中执行搜索命令 #####

用法和结果:

```
➜  Tmp find p  -name b.txt -exec grep 'bb' {} \;
bbbbbb
➜  Tmp 


```

##### 7. 除了某些文件及 ##### 

find Work -path */node_modules/* -prune -o -name 'deploy.sh' -print
