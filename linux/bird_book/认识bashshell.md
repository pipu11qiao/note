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
# name=tom
# myname="$name is cool"
# echo $myname
tom is cool
# myname='$name is cool'
# echo $myname
$name is cool

 ```
 反引号的作用：
 在一串在一串指令中，在 \` 之内的指令将会被先执行，而其执行出来的结果将做为外部的输 入信息!例如 uname -r 会显示出目前的核心版本.查看当前的git分支名，输出

```
# branchName=`git symbolic-ref --short -q HEAD`
# echo $branchName
develop

```
##### 变量的用途 #####

* 用来记录日常需要用到的路径（这样就不用记住路径了，只需要记住变量名）,如设置nginx的配置文件

```
nginx_conf='/usr/local/etc/nginx/nginx.conf'

```
这样我们就能直接`vi $nginx_conf`来编辑nginx config 文件了

* 用在shell script文件中，shell script 就像小型的程序语言，中有用到变量的部分。

##### 环境变量的功能 #####

查看当前shell环境中的变量，有两个指令： env 和 export

* 一些环境变量的说明:env
```
HOSTNAME=linux.dmtsai.tw <== 这部主机的主机名称
SHELL=/bin/bash <== 目前这个环境下，使用的 Shell 是哪一个程序
TERM=xterm <== 这个终端机使用的环境是什么类型
HISTSIZE=1000 <== 这个就是『记录指令的笔数』在 FC4 预设可记录 1000 笔
USER=root <== 使用者的名称啊!
ENV=/root/.bashrc <== 使用的个人环境设定档
MAIL=/var/spool/mail/root <== 这个使用者所取用的 mailbox 位置
PATH=/sbin:/usr/sbin:/bin:/usr/bin:/usr/X11R6/bin:/usr/local/bin:/usr/local/sbin: <== 是执行文件指令搜寻路径
/root/bin
INPUTRC=/etc/inputrc <== 与键盘按键功能有关。可以设定特殊按键!
PWD=/root <== 目前使用者所在的工作目录 (利用 pwd 取出!)
LANG=en_US.UTF-8  <== 这个与语系有关，底下会再介绍!
HOME=/root <== 这个使用者的家目录啊!
_=/bin/env <== 上一次使用的指令的最后一个参数(或指令本身)

```
    * SHELL : 告知我们，目前这个环境使用的 SHELL 是哪支程序? 如果是 bash 的话，预设是 /bin/bash 的啦!
    * ENV : 这个使用者所使用的个人化环境设定档的读取档案。
    * PATH : 就是执行文件搜寻的路径啦~目录与目录中间以冒号(:)分隔， 由于档案的搜寻是依序由 PATH 的变量内的目录来查询，所以，目录的顺序也是重要的喔。
    * 这个玩意儿就是『随机随机数』的变量啦!目前大多数的 distributions 都会有随机 数产生器，那就是 /dev/random 这个档案。我们可以透过这个随机数档案相关的变量 ($RANDOM)来随机取得随机数值喔。在 BASH 的环境下，这个 RANDOM 变量的内容，介于 0~32767 之间，所 以，你只要 echo $RANDOM 时，系统就会主动的随机取出一个介于 0~32767 的数值。万一我想要 使用 0~9 之间的数值呢?呵呵~利用 declare 宣告数值类型， 然后这样做就可以了
```
declare -i number=$RANDOM*10/32767 ; echo $number
```
    * LANG : 这个重要!就是语系档案啰~很多数据都会用到他， 举例来说，当我们在启动某些 perl的程序语言档案时，他会主动的去分析语系数据文件， 如果发现有他无法解析的编码语系，可能 会产生错误喔!一般来说，我们中文编码通常是 zh_TW.Big5 或者是 zh_TW.UTF-8，这两个编码 偏偏不容易被解译出来，所以，有的时候，可能需要修订一下语系数据。 这部分我们会在下个小 节做介绍的!


* 其他所有的变量说明： set

```
BASH=/bin/bash <== bash 的主程序放置路径
PS1='[\u@\h \W]\$ ' <== PS1 就厉害了。这个是命令提示字符，也就是我们常见的[root@linux ~]# 或 [dmtsai ~]$ 的设定值啦!可以更动的!
SUPPORTED=zh_TW.UTF-8:zh_TW:zh:en_US.UTF-8 <== 本系统所支持的语系
$ <== 目前这个 shell 所使用的 PID
? <== 刚刚执行完指令的回传值。
```
* PS1: 命令提示符，每次按下enter执行某个命令，最后再次出现提示字符时，就会主动读取这个变数的值。其中预设的bash的PS1变量内的特殊符号代表的意义：
	* \d :代表日期，格式为 Weekday Month Date，例如 "Mon Aug 1"
	* \H :完整的主机名称。举例来说，鸟哥的练习机 linux.dmtsai.tw ，那么这个主机名称就是 linux.dmtsai.tw
	* \h :仅取主机名称的第一个名字。以上述来讲，就是 linux 而已， .dmtsai.tw 被省k略。
	* \t :显示时间，为 24 小时格式，如: HH:MM:SS
	* \T :显示时间，12 小时的时间格式!
	* \A :显示时间，24 小时格式， HH:MM
	* \u :目前使用者的账号名称;
	* \v :BASH 的版本信息;
	* \w :完整的工作目录名称。家目录会以 ~ 取代;
	* \W :利用 basename 取得工作目录名称，所以仅会列出最后一个目录名。 o \# :下达的第几个指令。
	* \$ :提示字符，如果是 root 时，提示字符为 # ，否则就是 $ 啰~
可以根据上述的特殊变量来生成自定义的命令行提示符，如加上时间

```
 PS1='[\u@\h \w \A #\#]\$ '

```
* $ 目前这个shell的执行绪代号，也可称为PID（Process ID）
* ? (上个执行指令的回传码)般来说，如果成功的执行该指令， 则会回传一个 0 值，如果执行过程发生错误，就会回传错误代码才对



