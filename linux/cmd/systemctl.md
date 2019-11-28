## 如何使用systemctl命令来管理systemd的服务和资源(单元) ##

##### 介绍 #####

**Systemd** 是一个系统初始化和系统管理工具,作为linux机器的新标准正被广泛的接受。虽然关于 **systemd** 相比于正被其替代的传统的 **SysV** 初始系统是否一种改进仍有一些值得考虑的细节,但主要的版本中准备采纳或已经采纳它了。

由于其被广泛采纳，熟悉 **Systemd** 是物有所值的，它会使得管理服务。学习和掌握组成**Systemd**的工具和守护进程将会帮助你领会其提供的强力性、灵活性和能力,至少可以帮助你以最少的麻烦处理工作。

在本指南中，我们将讨论**systemctl**命令，该命令是来控制初始化系统的核心管理工具。我们将包含如何管理服务、检查状态、改变系统状态和使用配置文件。

请注意虽然**Systemd**已经成为大多数linux版本中的初始系统，它并没有在所有的发行版中挂载。如果你在跟随本教程，如果你的终端中输出 `bash: systemctl is not installed` 那表示你的机器中安装了不同的初始化系统。

#### 服务管理 ####

一个初始化系统的基本目的是启动某些必须在Linux核心启动后启动的模块（传统上称其为用户模块）。该初始化系统也被用来当系统正在运行时的任何时间点管理服务和用于服务的守护进程。留心这一点，我们将开始一些简单的服务管理操作

在**Systemd**中，大部分操作的对象是单元（units)，一些**Systemd**知道如可去管理的资源。单元按照其代表的资源类型进行归类，由作为单元文件被熟知的文件定义。每个单元的类型可以通过文件的后缀名推断出来。

对于服务管理任务，目标单元将会是服务单元集，它含有**.service**后缀名的单元文件。然而，对于大多数服务管理命令，可以省略**.service**后缀，因为**systemd**在你使用服务管理命令的时候巧妙的知道你或许想操作一个服务文件。

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

如果讨论中的应用可以重载他的配置文件（不用重启），你可以调用**reload**命令来初始改进程：

```
sudo systemctl reload application.service
```

如果你不能确定当前服务是否重载其配置的功能，你可以调用**reload-or-restart**命令 这将会在可以重载的情况下重载配置，否则，会重启服务这样新配置被使用：

```
sudo systemctl reload-orrestart application.service
```

##### 打开和关闭服务的开机启动 #####

上述命令在当前会话中启动或停止命令是很有用。但是告知系统开机启动程序，你必须打开开机启动。

要打开开启启动，使用**enable**命令

```
sudo systemctl enable application.service
```

这将创建一个从系统的拷贝的服务文件（通常在/lib/systemd/system 或 /etc/systemd/system）指向用来给**systemd**程序寻找自动启动文件的本地硬盘（一般是/etc/systemd/system/some_target.target.wants 我们将在本教程后续中介绍）符号链接

关闭该服务的开机自启，你可以键入：

```
sudo systemctl disable application.service
```

这将会删除那个指示改程序将开机自启的符号链接。

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

如果正常运行返回**active**，如果有错误返回**failed**。如果该单元被显式的停止，将会返回**unknown** 或 **inactive**。返回状态码”0“表示又失败发生而返回状态码“1”表示别的状态。




