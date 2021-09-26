# tar 命令介绍 #

tar tar是tape archive(磁带归档)的缩写,用来创建和提取档案文件。该命令是linux中很重要的命令，提供了存档的功能。我们可以使用该命令来压缩或解压缩归档文件，也可以来维护和修改这些文件。

#### 语法 ####

```
tar [options(选项)] [归档文件] [要归档的文件或文件夹]

```

#### 选项 ####

* c 创建归档
* x 提取归档
* f 创建给定名字的归档
* t 展示或列举出归档文件中的文件
* u 归档，打包已存在的归档文件
* v 展示冗长的信息
* A 拼接归档文件
* z zip 告诉tar命令使用gzip来创建文件
* j 使用tbzip来归档文件
* W 验证归档文件
* r 向一个已生成的.tar文件中更新或添加文件或文件夹

##### 什么是归档文件 #####

归档文件是一个或多个文件连同自身的元信息的组合。归档文件用来收集多个的数据文件放到一起成为一个文件，方便移动和存储。 或简单的压缩减少存储空间。

#### 列子 ####

1. 使用 -cvf,创建一个未压缩的tar归档。 下面的命令是创建一个包含文件夹中所有.md(markdown)后缀的文件的.tar归档。

```
tar cvf file.tar *.md

```
结果

```
 190613_thor.md
 avalon.md
 diff.md
 mobile_teacher.md
 msg.md
 pisces_app.md
 thor.md

```
2. 使用 -xvf,提取文档文件.

```
tar xvf file.tar

```
结果

```
 190613_thor.md
 avalon.md
 diff.md
 mobile_teacher.md
 msg.md
 ./._pisces_app.md
 pisces_app.md
 thor.md

```

3. 使用-cvzf 命令用gzip压缩归档文件

```
tar cvzf file.tar.gz *.md

```
4. 使用-xvzf 提取gzip tar归档

```
tar xvzf file.tar.gz

```

4. 使用 -j 命令用linux中tbzip压缩和解压缩tar归档,这种压缩方式比gzip压缩体积要小，相应的时间要多。

```
tar cvfj file.tar.tbz *.md
tar xvfj file.tar.tbz

```
5. 解归档一个文件或通过-C选项解归档特定文件夹中的文件

```
 tar xvfj file.tar

 tar xvfj file.tar -C path of file in directoy

```
6. 使用-tf来列举和明确tar文件的内容

```
tar tf file.tar

```



