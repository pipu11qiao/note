## linux 输入/输出重定向介绍

#### 介绍

linux 内置的重定向能力提供了很多工具,使你更加轻松地完成各种各样的任务。无论你是通过命令行在编写复杂的软件或是在完成文件管理，懂得在当前的环境中如何去操作不同的输入/输出**流**将会极大的提升你的产出能力。

### 流（stream）的种类

在linux环境下，输入和输出分为三种类型的流，分别是：

* 标准输入（stdin）
* 标准输出（stdout）
* 标准错误（stderr）
这些流也可以用数字表示

* stdin(0)
* stdout(1)
* stderr(2)

在用户和终端的标准交互过程中，标准输入（stdin）是通过用户键盘输入，标准输出（stdout）和标准错误（stderr）在用户的终端以文字显示。总结来说，这三种流都被用做标准流。


#### 参考文章
[An Introduction to Linux I/O Redirection](https://www.digitalocean.com/community/tutorials/an-introduction-to-linux-i-o-redirection)
