## fswatch ##

**fswatch**是一个文件修改监视器，当指定的文件或者文件夹被修改的时候会受到通知。

#### 特点 ####
* 支持许多OS系统特定的API，如kevent,inotify和FsEvents
* 递归监听文件夹
* 使用正则表达式控制包含和排除的文件
* 可定制记录格式
* 支持周期性闲置事件

#### 安装 ####

```
# Homebrew
$ brew install fswatch
```
#### 用法 ####

**fswatch** 接收一组路径，它们能收到改变事件

```
$ fswatch [options] ... path-0 ... path-n

```
事件流将会被创建即使其中的路径不存在。 如果这些路径在 **fswatch**激发之后被创建，改变事件将会被正确的收到。取决于正在使用的监视程序，那些新创建的路径将在经过大量的配置的延迟后被监听到。

**fswatch**的输出结果可以通过管道命令传递给其他的程序来进行后续处理

```
fswatch -0 a.js | while read -d "" event ;  do echo ${event}; done
```

如果是需要在一系列的变化事件被打印到标准输出时执行某一个命令，并且对事件细节并不关心,这时可以使用下面的命令：

```
$ fswatch -o path | xargs -n1  program
```

#### 常用参数 ####

* -0, --print0 使用ASCII NUL 字符作为行分隔符。因为文件名中潜在可能包含除了NUL之外的任意字符，本选项能够保证fswatch的输出结果可以被使用NUL作为分隔符的程序安全的解析,例如使用xargs -0 和 shell内建的read -d ''
* -1, --one-event 事件触发一次后就退出
* -e, --exclude regexp 根据正则表达式文件排除
* -i,--include regexp 根据正则表达式文件包含，可以添加多次
* -r, --recursive 递归监听
