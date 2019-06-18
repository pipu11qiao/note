#### [翻译] grep command in Unix/Linux 

grep (gloabally search for regular expression and print out) 过滤器在一个文件中搜索由字符组成的特定的表达式并且展示所有匹配表达式的行。在搜索过程中这个表达式会被处理成正则表达式使用。

##### 语法

> grep [options] pattern [files]

###### 参数说明

* -c: 匹配的函数。
* -h: 展示匹配行，但是不展示所属文件名
* -i: 忽略大小写
* -l: 只展示文件名
* -n: 展示匹配行和它的行号
* -v: 反转查找
* -e <exp>: <正则> 搜索表达式，可以使用多次
* -f <file>: 使用指定文件的内容搜索，每次一行
* -E: 将表达式当做扩展正则来使用
* -w: 匹配单词
* -o: 只输出文件中匹配到的部分

#### 参考链接
[grep command in Unix/Linux](ohttps://www.geeksforgeeks.org/grep-command-in-unixlinux/)

#### 示例

创建示例文件 a.txt,内容:

```
unix is great os. unix is opensource. unix is free os.
learn operating system.
Unix linux which one you choose.
uNix is easy to learn.unix is a multiuser os.Learn unix .unix is a powerful.
```

1. 忽略大小写
> grep -i "UNix" a.txt

结果：
```
unix is great os. unix is opensource. unix is free os.
Unix linux which one you choose.
uNix is easy to learn.unix is a multiuser os.Learn unix .unix is a powerful.
```
2. 显示匹配行的数量

> grep -c "unix" a.txt

结果： 
```
2
````

3. 显示匹配的文件

> grep -l "unix" *  或  grep -l "unix" f1.txt f2.txt

结果： 
```
a.txt

````

4. 查找单词匹配的

> grep -w "unix" a.txt
结果： 

```
unix is great os. unix is opensource. unix is free os.
uNix is easy to learn.unix is a multiuser os.Learn unix .unix is a powerful.

````

5. 只展示匹配的部分


> grep -o "unix" a.txt
结果： 

```
unix
unix
unix
unix
unix
unix

````

6. 显示行号

> grep -n "unix" a.txt

结果： 

```
1:unix is great os. unix is opensource. unix is free os.
4:uNix is easy to learn.unix is a multiuser os.Learn unix .unix is a powerful.

````

7. 反转搜索 

> grep -v "unix" a.txt

结果： 

```
learn operating system.
Unix linux which one you choose.

````


8. 匹配行首是以某个字符串开头的行 (正则表达式的运用)


> grep  "^unix" a.txt

结果：

```
unix is great os. unix is opensource. unix is free os.

````
9. 使用-e 参数，能匹配多个

> grep  -e "unix" -e "Unix" -e "UNix"  a.txt

结果：

```
unix is great os. unix is opensource. unix is free os.
Unix linux which one you choose.
uNix is easy to learn.unix is a multiuser os.Learn unix .unix is a powerful.

````

10. 匹配特定文件里面的表达式
创建文件 pattern.txt,内容(其实和上例是一样的)：

```
unix
Unix
UNix

```

> grep  -f pattern.txt  a.txt

结果：

```
unix is great os. unix is opensource. unix is free os.
Unix linux which one you choose.
uNix is easy to learn.unix is a multiuser os.Learn unix .unix is a powerful.

````




















