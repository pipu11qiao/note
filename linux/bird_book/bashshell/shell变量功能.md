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
* ? (上个执行指令的回传码)般来说，如果成功的执行该指令， 则会回传一个 0 值，如果执行过程发生错误，就会回传错误代码。

##### 自定义变量转成环境变量： export #####
自定义变量和环境变量的区别在于变量是否可以被子程序所引用。

在在一个bash中，再次执行bash命令，会重新打开一个bash（子程序），父级程序中的变量将不能引用，能引用的只有环境变量。

如果想把自定义变量转为环境变量执行
```
export 变量
```
若果后面不接参数，export命令会将所有的环境变量列出来。

##### 语系变量 #####

??

##### 变量的有效范围 #####
出了父程序和子程序之间的变量的引用范围，还有两个shell脚本之间的变量范围，比如script2想引用script1中的变量，那个该变量之前就需要加export关键字。

环境变量可以让子程序继续引用的原因：

* 当启动一个 shell ，操作系统分配一记忆区块给 shell 使用，此区域之变量可以让子程序存取;
* * 利用 export 功能，可以让变量的内容写到上述的记忆区块当中(环境变量);
* 当加载另一个 shell 时 (亦即启动子程序，而离开原本的父程序了)，子 shell 可以将父 shell 的环境变量所在的记忆区块导入自己的环境变量区块当中。

##### 变量键盘读取、数组和宣告 #####
让使用者能够经由键盘输入。可以设定该变量的数据类型，例如是数组还是数字等。

* read
    语法
    ```
    read [-pt] variable
    ```
    read + 变量名，然后会有一个空白行，等待用户输入完毕。输入的内容就是该变量的内容。
    参数：
    * -p: 后面可以接提示字符!
    * -t: 后面可以接等待的『秒数!』这个比较有趣~不会一直等待使用者啦!
```
# read atest
thi is a test
# echo $atest
thi is a test
#

```

* declare / typeset
    declare 或 typeset 是一样的功能，就是在宣告变量的属性。
    语法：
    ```
    declare [-aixr] variable
    ```
    * -a: 将后面的 variable 定义成为数组 (array)
    * -i: 将后面接的 variable 定义成为整数数字 (integer)
    * -x :用法与 export 一样，就是将后面的 variable 变成环境变量;
    * -r :将一个 variable 的变量设定成为 readonly ，该变量不可被更改内容，也不能 unset
```
# sum=100+300+50
# echo $sum
100+300+50
# declare -i sum=100+300+50
# echo $sum
450
#
```


* 数组属性array说明

    数组的设定方式是: var[index]=content
    建议直接以 ${数组} 的方式来读取
```
# var[1]="aaa"
# var[2]="bbb"
# var[3]="ccc"
# echo "${var[1]},${var[2]},${var[3]}"
aaa,bbb,ccc
#
```
* 与档案系统及程序的限制关系: ulimit
bash可以限制使用者某些系统资源，如开启的档案数量
```
ulimit [-SHacdflmnpstuv] [配额]
```

* 额外的变量设定功能
两种变量的取用方式

```
echo $HOME
echo ${HOME}
```
使用${variable}的方式中，可以做一些变量的修订工作,下面的例子中，变量名为tom，内容为/home/tom/testing/tesing.x.sh
1. 设定变量
```
# tom="/home/tom/testing/tesing.x.sh"
# echo ${tom}
/home/tom/testing/tesing.x.sh
#
```
2. tom变量中，从头开始比对给定的表达式\/\*\/,其中*表示任意字符，满足就删除
```
# echo ${tom##/*/}
tesing.x.sh <==删除了 /home/tom/testing/
# echo ${tom#/*/}
tom/testing/tesing.x.sh <==仅删除 /home/ 而已
#
```
 这两个小例子有趣了~变量名称后面如果接了两个 ## ，表示在 ## 后面的字符串取最长的那一段;如果仅有一个 # ，表示取最小的那一段

3. 如果是从后面开始，删除 /* 呢?
```
# echo ${tom%%/*/}
/home/tom/testing/tesing.x.sh <==都没被删除
# echo ${tom%%/*}
  <==被删除光了!
# echo ${tom%/*}
/home/tom/testing <==只删除 /testing.x.sh 部分
#
```
这个例子当中需要特别注意，那个 % 表示从后面开始,%%表示最长的,%表示最短的

4.将变量中的tesing变为TEST
```
# echo ${tom/testing/TEST}
/home/tom/TEST/testing.x.sh
# echo ${tom//testing/TEST}
/home/tom/TEST/TEST.x.sh
#
```
如果变量后面接的是 / 时，那么表示后面是进行『取代』的工作~而且仅取代『第一个』 # 但如果是 // ，则表示全部的字符串都取代

目前我需要用到两个变量，分别是 var 与 str ， 那我想要针对 str 这个变量内容是否有设定成一个字符串，亦即 "expr" 来决定 var 的内容。
变量设定方式| str 没有设定| str 为空字符串| str 已设定非为空字符串
--|--|--|--
 var=${str-expr}| var=expr|var=|var=$str
 var=${str:-expr}| var=expr | var=expr | var=$str
 var=${str+expr} | var=expr | var=expr | var=expr
 var=${str:+expr} | var=expr | var= | var=expr
 var=${str=expr} |str=expr var=expr |str 不变 var= str 不变 | var=$str
 var=${str:=expr} |str=expr var=expr |str=expr  var=expr| str 不变 var=$str
 var=${str?expr} |expr 输出至 stderr | var= | var=str
 var=${str:?expr} |expr 输出至 stderr| expr 输出至 stderr | var=str

 练习:
 1. 若 str 这个变量内容存在，则 var 设定为 str ，否则 var 设定为 "newvar"
 ```
# unset str;var=${str-newvar}
# echo var="$var",str="$str"
var=newvar,str=       <==因为 str 不存在，所以 var 为 newvar
# str="oldvar";var=${str-newvar}
# echo var="$var",str="$str"
var=oldvar,str=oldvar    <==因为 str 存在，所以 var 等于 str 的内容
#
 ```
 2. 若 str 不存在，则 var 与 str 均设定为 newvar，否则仅 var 为 newvar
 ```
# unset str; var=${str=newvar}
# echo var="$var",str="$str"
var=newvar,str=newvar <==因为 str 不存在，所以 var/str 均为 newvar
# str="oldvar";var=${str=newvar}
# echo var="$var",str="$str"
var=oldvar,str=oldvar <==因为 str 存在，所以 var 等于 str 的内容
#
 ```
3. 若 str 这个变量存在，则 var 等于 str ，否则输出 "novar"
```
# unset str; var=${str?novar}
zsh: str: novar <==因为 str 不存在，所以输出错误讯息
# str="oldvar"; var=${str?novar}
# echo var="$var",str="$str"
var=oldvar,str=oldvar  <==因为 str 存在，所以 var 等于 str 的内容
#
```
