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

这些shell功能都差不多，语法上不太一样。以bash和csh为主要的shell。
