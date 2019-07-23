#### shell

shell 就是用来通过控制 kernel(核心)和它提供给工具来控制kernel,从层次上分，shell是介于用户和kernal中间沟通的桥梁。

bash (Bourne Again Shell),第一个流行的shell由StevenBourne发展来的，成为Bourne shell。简称 sh。 另一个广为流传的是 Boll Joy 设计的 C shell，简称csh。

查看一下 /etc/shells这个档案

* /bin/sh (已被bash取代)
* /bin/bash (linux 预设的shell)
* /bin/ksh (Kornshell 由AT & T Bell lab 发展出来，兼容bash)
* /bin/tcsh （整合 C shell）
* /bin/csh (已被tcsh取代)
* /bin/zsh (基于ksh，更强大的shell)

这些shell功能都差不多，语法上不太一样。以bash和csh为主要的shell。当用户登录系统是，登入时使用的shell记录在/etc/passwd档案中。

#### Bash shell 的功能 ####

bash的主要优点：

* 命令编辑能力
    bash 可以记录使用过的指令，通过上下键就能找到前面使用的指令。 ~/.bash_history 记录，记录的是前一次登入以前所执行过得指令。当前登入所执行的指令会暂存在内存中，当注销系统后会被记录到.bash_history中。类似的有.zsh_history。为了安全性考虑，应当减少允许记录的历史次数。
* 命令与档案补全功能
    tab键可以方便的补全命令或者档案，是一个很好的习惯。可以让你1）少打很多字，2）保证输入的数据的准确性，tab命令的补全功能依据按键所在的指令位置变化.

    * tab 接在一串指令的第一个字的后面，则为命令补全;
    * tab 接在一串指令的第二个字以后时，则为档案补齐;
* 命令别名（alias）设置功能
    可以通过设置命令别名来简化或者丰富现有命令的使用。如查看目录下所有档案和档案属性，需要输入ls -al,通过如下别名

    ```
    alias lm='ls -al'

    ```
    就可以通过lm命令来实现该功能了。
* 工作控制（jobs）、前景背景控制
     使用前、背景的控制可以让工作进行的更为顺利!至于工 作控制(jobs)的用途则更广，可以让我们随时将工作丢到背景中执行!而不怕不小心使用了 Ctrl + c 来 停掉该程序!
* Shell scripts 的强大功能
    将日常生活中下达的连续指令写成一个档案。类似于小型的程序序言，可以和主机对谈交互，也可以执行相关指令。
* 万用字符
    bash 支持很多的万用字符来帮助使用者查询和下达指令。 如查看当前目录下所有的markdown档案

    ```
    ls -l *.md
    ```
#### Bash shell 内建命令：type ####

man bash 命令查看到的说明文件中有很多如cd的那个命令的介绍，这些是内建命令。可以用 **type**命令来查看命令是否是内建命令。

语法：

```
type [-tpa] cmd_name

```
参数说明：

* 不加任何参数时，则 type 会显示出那个 name 是外部指令还是 bash 内建的指令
* -t 当加入 -t 参数时，type 会将 name 以底下这些字眼显示出他的意义:
    * file :表示为外部指令;
    * alias :表示该指令为命令别名所设定的名称;
    * builtin :表示该指令为 bash 内建的指令功能;
* -p 如果后面接的 name 为指令时，会显示完整文件名(外部指令)或显示为内建指令;
* -a 会将由 PATH 变量定义的路径中，将所有含有 name 的指令都列出来，包含 alias
