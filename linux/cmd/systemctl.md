## 如何使用systemctl命令来管理systemd的服务(Service)和资源(单元) ##

##### 介绍 #####

**Systemd** 是一个系统初始化和系统管理工具,作为linux机器的新标准正被广泛的接受。虽然 **systemd** 相比于正被其替代的传统的 **SysV** 初始系统是否有改进仍有一些值得考虑的细节,但在主要的版本中准备采纳或已经采纳它了。

由于其被广泛采纳，熟悉 **systemd** 是物有所值的，它会使得管理服务非常简单。学习和掌握组成**systemd**的工具和守护进程,将会有助你领会其提供的强力、灵活等能力,至少可以帮助你以最少的麻烦处理工作。

在本指南中，我们将讨论**systemctl**命令，该命令是来控制初始化系统的核心管理工具。我们将包含如何管理服务、检查状态、改变系统状态和使用配置文件。

请注意虽然**Systemd**已经成为大多数linux版本中的初始系统，它并没有在所有的发行版中挂载。如果你在跟随本教程，在你的终端中输出 `bash: systemctl is not installed` 那表示你的机器中安装了不同的初始化系统。

#### 服务管理 ####

一个初始化系统的基本目的是在启动某些必须在Linux核心启动后启动的模块（传统上称其为用户模块）。该初始化系统也被用来在系统正在运行时的任何时间点来管理服务和用于服务的守护进程。留心这一点，我们将开始一些简单的服务管理操作

在**Systemd**中，大部分操作的对象是单元（units)，一些**Systemd**知道如何去管理的资源。单元按照其代表的资源类型进行归类，由作为单元文件被熟知的文件定义。每个单元的类型可以通过文件的后缀名推断出来。

对于服务管理任务，目标单元将会是服务单元集，它含有**.service**后缀名的单元文件。然而，对于大多数服务管理命令，可以省略**.service**后缀，因为**systemd**在你使用服务管理命令的时候巧妙的知道你想操作一个服务文件。

##### 启动和暂停服务 #####

要启动一个**Systemd**服务，使用**start**命令，来执行服务的单元文件中的执行集。如果当前用户非根用户，需要使用**sudo**执行，因为要执行的命令将对整个系统产生影响：

```
sudo systemctl start application.service
```

就像我们上面提到的，**systemd**知道去寻找**.service**文件来进行服务管理命令，所以该命令可以简单的这样输入：

```
sudo sytemctl start application
```

虽然你可以使用上述格式来完成一般的操作，但为了清晰起见，我们将使用**.service**后缀来提醒命令明确的执行我们要操作的目标文件。

要停止当前运行的服务，可以用**stop**命令来替换：

```
sudo systemctl  stop application.service
```

##### 重启和重新加载 #####

要重启当前运行的服务，可以用**restart**命令来替换：

```
sudo systemctl  restart  application.service
```

如果讨论中的应用可以重载他的配置文件（不用重启），你可以调用**reload**命令来初始化进程：

```
sudo systemctl reload application.service
```

如果你不能确定当前服务是否重载其配置的功能，你可以调用**reload-or-restart**命令 这将会在可以重载的情况下重载配置，否则，会重启服务使新配置被使用：

```
sudo systemctl reload-orrestart application.service
```

##### 打开和关闭服务的开机启动 #####

上述命令在当前会话中启动或停止命令是很有用。但是告知系统开机启动程序，你必须执行开机启动。

要执行开启，使用**enable**命令

```
sudo systemctl enable application.service
```

这将创建一个从系统的拷贝的服务文件（通常在/lib/systemd/system 或 /etc/systemd/system）指向用来给**systemd**程序寻找自动启动文件的本地硬盘（一般是/etc/systemd/system/some_target.target.wants 我们将在本教程后续中介绍）符号链接

关闭该服务的开机自启，你可以键入：

```
sudo systemctl disable application.service
```
这将会删除说明该程序是开机启动的符号链接。

记住打开开机自启并不会在当前会话中启动服务，如果你既希望启动服务也想打开开机自启，你将必须**start**和**enable**命令调用。

##### 检查服务的状态 #####:

要检查系统中服务的状态，可以使用**status**命令：
```
systemctl status application.service
```

这将提供服务的状态，cgroup的结构，和少量的最开始的日志行。

举个例子，当你检查Ngix服务的状态时，你将看到这样的输入结果：
```
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; vendor preset: disabled)
   Active: active (running) since Tue 2015-01-27 19:41:23 EST; 22h ago
 Main PID: 495 (nginx)
   CGroup: /system.slice/nginx.service
           ├─495 nginx: master process /usr/bin/nginx -g pid /run/nginx.pid; error_log stderr;
           └─496 nginx: worker process
Jan 27 19:41:23 desktop systemd[1]: Starting A high performance web server and a reverse proxy server...
Jan 27 19:41:23 desktop systemd[1]: Started A high performance web server and a reverse proxy server.
```

这为你提供当前服务很好的状态查看，通知你任何问题还有某个需要执行的动作。

也有别的检查特定状态的方法，例如，检查一个单元是否正在运行，可以使用** is-active ** 命令：

```
systemctl is-active application.service
```

这将返回当前单元的状态，通常是**active** 或 ** inactive**,这段代码执行的结果，如果是运行状态将会是“0”，可以在程序上更容易使用。（一般linux程序成功后会返回0）

查看该单元是否是开机自启，可以使用**is-enalbed**命令

```
systemctl is-enabled application.service

```
这将输出该服务是否开机自启，同样的返回结果为“0”或"1"根据其自身的状态。

另外一个检查是查看该单元是否是在一个错误的状态，这指示了讨论中的单元在启动时是否有问题：

```
systemctl is-failed application.service
```

如果正常运行返回**active**，如果有错误返回**failed**。如果该单元被显式的停止，将会返回**unknown** 或 **inactive**。返回状态码”0“表示有失败发生而返回状态码“1”表示别的状态。

#### 系统状态查看 ####

到现在介绍的命令对于控制单个服务很有用，但是对于探查系统当前状态用处不大。有很多的**systemctl**命令来提供该信息。

##### 列举当前单元 #####

要查看当前**systemd**知道的所有的活动的单元列表，我们可以使用**list-units**命令：

```
systemctl list-units
```

这将会展示系统中**systemd**激活的所有的单元列表。输出会类似于这样：

```
UNIT                                      LOAD   ACTIVE SUB     DESCRIPTION
atd.service                               loaded active running ATD daemon
avahi-daemon.service                      loaded active running Avahi mDNS/DNS-SD Stack
dbus.service                              loaded active running D-Bus System Message Bus
dcron.service                             loaded active running Periodic Command Scheduler
dkms.service                              loaded active exited  Dynamic Kernel Modules System
getty@tty1.service                        loaded active running Getty on tty1
. . .
```
输出中包含如下几列：

* UNIT： **systemd**的单元名称
* LOAD： 单元的配置是否被**systemd**解析，加载过的单元的配置保存在内存中
* ACTIVE： 一个简要关于单元是否激活的状态信息，通常是相当基本的告知该单元是否成功的启动
* SUB：这是低等级状态标识了该单元的更多的细节信息。这通常会根据单元类型，状态和单元运行的真是真实方法变化。
* DESCIPTION： 一个简短的单元功能的文字描述

因为**list-units**命令默认只展示激活的单元，上面所有的条目中的LOAD列都显示“loaded”和ACTIVE列都显示“active”，这些信息就是不带额外参数**systemctl**的默认展示行为，所以如果你不带参数的调用**systemctl**命令，你将看到同样的输出结果:

```
systemctl
```

我们可以通过添加额外的标志参数告知**systemctl**输出不同的信息。列如，查看**systemd**中所有加载的（或试图加载），不论是否被激活的单元，你可以使用**-all**参数，像这样：

```
systemctl list-units --all
```

这将会输出**systemd**加载的或试图去加载的单元，不考虑他们当前在系统中的状态。其中，一些单元在运行后变为非激活状态，一些**systemd**试图去加载的但是在硬盘中找不到的单元。

你可以使用别的参数来过滤这些结果。例如，我们可以使用**--state**参数来标识LOAD、ACTIVE，或SUB状态中我们想要查看的。同时你需要保留**--all**参数来告知**systemctl**允许非激活状态的单元展示。

```
systemctl list-units --all --state=inactive
```
另外一个常用的过滤参数**--type=**.我们可以告知**systenctl**来展示我们感兴趣的类型的单元。例如，只查看激活的服务的单元，我们可以使用

```
systemctl list-units --type=service
```

##### 列举所有单元文件 #####

**list-units**命令只展示哪些**systemd**试图解析和加载进内存的单元。因为**systemd**只会读取它认为他将需要的单元，这将不一定包含系统中所有可用的单元。要查看在**systemd**目录中每个可用的单元文件，包含哪些**systemd**没有试图加载的。你可以使用**list-unit-files**命令替代：

```
systemctl list-unit-files
```

单元是**systemd**知道的资源的集合。因为**systemd**不一定需要读取所有的定义信息，它只展示文件本身的基本信息。输出结果有两列： 单元文件名和状态

```
UNIT FILE                                  STATE   
proc-sys-fs-binfmt_misc.automount          static  
dev-hugepages.mount                        static  
dev-mqueue.mount                           static  
proc-fs-nfsd.mount                         static  
proc-sys-fs-binfmt_misc.mount              static  
sys-fs-fuse-connections.mount              static  
sys-kernel-config.mount                    static  
sys-kernel-debug.mount                     static  
tmp.mount                                  static  
var-lib-nfs-rpc_pipefs.mount               static  
org.cups.cupsd.path                        enabled
. . .
```

状态列通常为“enabled”,"disabled"，“static”，“masked”。在该语境下，静态表示该单元文件没有包含那些用来打开单元开机自启功能的安装部分代码，因此这些单元不能够开机自启。通常，这意味着扮演者一次性执行动作或仅被用来其他单元的依赖不能够单独运行的。

我们将在涉及到时展开“masked”的解释。

#### 单元管理 ####

目前为止，我们已经实践了服务相关和展示**systemd**知道的单元和单元文件的信息。我们可以使用一些其他的命令来查找找出更多的特定信息。

#### 展示一个单元文件 ####

要展示一个被**systemd**加载进其系统的单元文件，你可以使用**cat**命令。例如，查看**atd**计划守护进程，我们可以键入：

```
systemctl cat atd.service
```

```
[Unit]
Description=ATD daemon
[Service]
Type=forking
ExecStart=/usr/bin/atd
[Install]
WantedBy=multi-user.target

```

输出的结果是被当前运行的**systemd**进程所知道的单元文件内容，如果你最近修改了单元文件内容或正在重写一个单元文件片段的内容，知道这点很重要。（我们在后续会涉及到）

##### 展示依赖 #####

查看一个单元的依赖树，你可以使用**list-dependencied**命令：

```
systemctl list-dependencies sshd.service
```

这将展示一个分层的那些为了开启讨论中单元时必须处理的依赖关系图。这些依赖，在当前语境下，包括那些直接被程序需要以及启动这些程序的上一级的依赖程序。

```
sshd.service
├─system.slice
└─basic.target
  ├─microcode.service
  ├─rhel-autorelabel-mark.service
  ├─rhel-autorelabel.service
  ├─rhel-configure.service
  ├─rhel-dmesg.service
  ├─rhel-loadmodules.service
  ├─paths.target
  ├─slices.target
. . .
```

递归的依赖只展示到**.target**单元，这些单元用来指示系统的状态。若要递归展示所有的依赖，加入**--all**参数。

展示反转的依赖（给定的单元被别的单元依赖），你可以添加**--reverse**参数，其他常用的参数**--before**和**--after**，可以用来分别展示在特定单元之前或之后运行的单元。

##### 检查单元的属性 #####

若要查看低一级的单元属性，你可以使用**show**命令。这将用**key==value**(键值对)形式列举出该单元的属性：

```
systemctl show sshd.service
```

```
Id=sshd.service
Names=sshd.service
Requires=basic.target
Wants=system.slice
WantedBy=multi-user.target
Conflicts=shutdown.target
Before=shutdown.target multi-user.target
After=syslog.target network.target auditd.service systemd-journald.socket basic.target system.slice
Description=OpenSSH server daemon
. . .
```

如果你想展示某个特定的属性，你可以使用**-p**参数并附带属性名称。例如,查看**sshd.service**单元的conflicts属性，你可以键入：

```
systemctl show sshd.service -p Conflicts
```

```
Conflicts=shutdown.target
```

##### 标记和不标记单元 #####

我们已经在服务管理部分知道如何去停止和关闭开机启动服务，但是**systemd**也有把单元标记为不论自动或手动都不可启动的能力，这是通过将该单元链接到**/dev/null**实现的。这被称为标记单元，可以用个**mask**命令来实现：

```
sudo systemctl mask nginx.service
```

这将阻止nginx服务被自动或手动启动，只要在其被标记的状态下。

如果你查看**list-unit-files**，你将会看到该服务已经被标记为“masked”状态展示：

```
systemctl list-unit-files
```

```

. . .
kmod-static-nodes.service              static  
ldconfig.service                       static  
mandb.service                          static  
messagebus.service                     static  
nginx.service                          masked
quotaon.service                        static  
rc-local.service                       static  
rdisc.service                          disabled
rescue.service                         static
. . .
```

如果你试图启动该服务，你将看到如下信息:

```
sudo systemctl start nginx.service
```

```
Failed to start nginx.service: Unit nginx.service is masked.
```

若要解锁一个单元的标记机，让其可以被使用，简单的使用**unmask**即可：

```
sudo systemctl unmask nginx.service
```

这将是该单元返回到其被标记前的状态，被允许启动或开机自启。

#### 编辑单元文件内容 ####

关于单元文件的格式的讨论不在本教程范围内，如果你需要调整单元文件的内容可以使用**systemctl**提供了内置的修改或编辑单元文件的命令来完成。

**edit**命令默认会打开当前的单元文件片段：

```
sudo systemctl edit nginx.service
```

这将打开一个空白的文件，该文件可以用来覆盖或添加单元中定义的指令。同时在**/etc/systemd/system**路径下，一个文件夹将会被创建，文件名是单元文件名附加**。d**.例如，对于**nginx.service**来说，一个名为**nginx.service.d**的文件夹将会被创建。

在该文件夹内，名为**override.conf**的片段文件将会被创建。当单元被加载过，**systemd**将会在内存中将该重写片段和初始的单元文件合并起来。该片段中的指令的优先级高于初始单元文件中相应的指令。

如果你想要编辑完成的单元文件而不是单元文件片段，你可以输入**--full**参数：

```
sudo systemctl edit --full nginx.service
```

这将会将当前的单元文件加载到编辑器，在那里可以被修改。当编辑器退出时，修改后的文件将会被存储到**/etc/systemd/system**，该文件将会被以比系统的单元定义（通常在**/lib/systemd/system）高的优先级被使用。

如要删除任意的你创建的附加的或者单元的**.d**配置文件夹或者在**/etc/systemd/system**路径下的修改的文件。例如，删除片段，我们可以键入：

```
sudo rm -r /etc/systemd/system/nginx.service.d
```

若要删除一个完整修改的单元文件，你将键入：

```
sudo rm /etc/systemd/system/nginx.service
```

在删除这些文件或文件夹后，你需要重载**systemd**进程，这样它就不会再引用这些文件，让它回溯使用原来系统给定文件。你可以通过键入如下信息来完成：

```
sudo systemctl daemon-reload
```

#### 通过目标（Targets)调整系统状态（运行等级） ####

目标是一些特殊的单元文件，可以来描述系统状态或同步点。像其他的单元，定义目标的文件也可以通过后缀名被认出，对于目标文件来说是**.target**。目标本身不做很多功能，代之的是被用来整合其他的单元。

这点可以用来使系统变成特定的状态，跟别的初始化系统中使用运行级别（runlevel)很相似。它们被用来当作某个特定功能可用时的索引，可以让你直接指明想要的状态而不是通过一些需要的单独的单元来完成状态修改。

例如，有个**swap.target**文件是用来标识交换（swap）功能可用的。那些是该进程的组成部分的需要目标文件同步加载单元，在其配置中以**WantedBy=**或**RequiredBy=**那个**swap.target**标识。而那些需要swap文件可用的单元文件在配置中可以使用**Wants=**，××Requires=**,和**After=××指令来说明他们之间的关系。

##### 获取和设置默认的目标 #####

**systemd**进程当启动系统时会使用默认的目标。完成那个目标文件的级联的依赖将会是系统进入所需的状态。若要查看系统中默认的目标，键入：

```
systemctl get-dafault
```

```
multi-user.target
```

如果你想要设置一个不同的默认目标，你可以使用**set-default**。例如，你如果有个图形桌面安装目标，你希望系统将其作为默认的目标加载，你可以相应的改变系统默认的目标：

```
sydo systemctl set-default graphical.target
```

##### 列举可用的目标 #####

你可以查看在系统中可用的目标列表，键入：

```
systemctl list-unit-files --type=target
```

不像运行级别，目标一次可以启动多个。一个激活的目标示意**systemd**重新试图启动所有跟该目标相关的单元并且没有试图将这些单元停止。要查看所有的活动目标，键入：

```
systemctl list-units --type=target
```

##### 隔离目标 #####

启动一个目标中涉及的所有的单元，并且停止所有不再依赖树上的单元是可以的。想达到该目的的命令被称为，**isolate**。这类似去其他初始化系统中的改变运行级别。

例如，你正在通过**graphical.target**激活来操作一个图形化系统，你可以使用隔离**multi-user.target**来关闭图形系统让系统进入多用户命令行状态。由于**graphical.target**依赖于**multi-user.target**但不包括其他的依赖，所以所有的图形单元会被关闭。

在你要使用隔离功能隔离某个目标前，你或许希望查看一下你要隔离的目标中所有的依赖来保证重要的依赖不被停止：

```
systemctl list-dependencies multi-user.target
```

当你认为这些单元仍被激活还满意的或，键入：

```
sudo systemctl isolate multi-user.target
```

##### 使用重要事件的快捷方式 #####

有一些被定义用来服务与重要事件的目标如关机或重启。 然而，**systemd**也有一些添加了一些额外功能的快捷方式。

例如，让系统计入安全模式（single-user)，你可以使用**rescue**命令代替**isolate rescue.target**

```
sudo systemctl rescue
```

这将产生额外的功能，提醒关于事件的用户日志。

若想挂起系统，可以使用**halt**命令：

```
sudo systemctl halt
```

若要执行彻底的关机，使用**poweroff**命令：

```
sudo systemctl poweroff
```

重启是**reboot**命令：

```
sudo systemctl reboot
```

这些都会给提示普通用户不能使用该功能，这些提示是简单的运行和隔离目标不会给出的。注意大多数机器会将这些快捷方式转变成更加方便的使用方式。

例如，重启系统，可以键入：

```
sudo reboot
```

#### 总结 ####

到现在位置，你已经熟悉了一些**systemctl**的基本能力，用来允许你控制和使用**systemd**实例。该**systemctl**工具将会是你主要的服务控制和系统状态管理工具。

然而**systemctl**操作主要是来操作**systemd**核心功能，还有别的**systemd**模块系统被别的工具来控制。 其它能力，像日志管理和用户对话被单独的守护进程和管理工具控制（**journald/journalctl ** 和 **logind/loginctl**). 花点时间来熟悉这些工具和守护进程，将会是管理系统变得很简单。







