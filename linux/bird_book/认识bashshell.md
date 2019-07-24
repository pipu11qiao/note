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

#### Shell 的变量功能 ####
举例来说系统中程序使用邮箱(Mail)路径，用户不同邮箱路径也会不一样，tom的邮箱路径是 /var/spool/mail/tom,而emmy的邮箱路径是 /var/spool/mail/emmy,通过设置变量程序只需要访问该变量来获取每个用户的邮箱路径，不用存储每个用户的邮箱路径。

变量就是以一组文字或符号等，来取代一些设定或者是一串保留的数据。

##### 变量的取用与设定：echo 变量的设定规则：unset #####

可以使用echo指令来获取变量的内容。变量在被取用时，要加上$符号或以${variable}的形式获取。例如获取PATH的内容

```
echo $PATH

```
结果

```
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

```

变量的设定和修改很简单，只需要用等号（=）链接变量与内容就好了。例如将myname设定为tom
```
myname=tom

echo $myname
```
当一个变量没有被设定时，默认值是空的。另外，变量在设定时需要符合某些规则，否则会设定失败。规则如下：

* 变量与变量内容用等号（=）连结
* 等号两边不能直接接空字符
* 变量名可以是英文和数字，但不能以数字开头
* 若有空格可以使用双引号("")或单引号('')将变量内容结合起来，单需注意，双引号的特殊字符可以保有变量的特性，单引号内的特殊字符仅为一般字符
* 必要时使用转义字符（\）来转移特殊字符，如（\/\n,\$,\.\\,空格符,'）等
* 在一串指令中，还需要借助其他指令提供的信息，可以使用反引号（\`,语法为\`command\`）
* 若该变量为扩增变量内容时，需要以双引号及$变量名称，“$PATH”: /home 继续累加内容
* 若该变量需要在其他子程序执行，则需要以export来使变量变成环境变量。如 export PATH
* 通常大写字符为系统预设变量，自行设定变量可以使用小写字符，方便判断
* 取消变量的方法为， `unset 变量名称`

在变量的设定当中，单引号与双引号的用途有何不同?

 单引号和双引号最大的不同在于双引号仍然可以保有变量的内容。假设有一个变量name=tom,现在想以name这个变量的内容定义出myname显示tom is cool 这个内容

 ```
  name=tom
  myname="$name is cool"
  echo $myname
tom is cool
  myname='$name is cool'
  echo $myname
$name is cool

 ```
 反引号的作用：
 在一串在一串指令中，在 \` 之内的指令将会被先执行，而其执行出来的结果将做为外部的输 入信息!例如 uname -r 会显示出目前的核心版本.查看当前的git分支名，输出

```
  branchName=`git symbolic-ref --short -q HEAD`
  echo $branchName
develop

```

