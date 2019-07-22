要学习 **ln**命令之前先要了解linux中软链接和硬链接的概念

## linux中软链接和硬链接的概念 ##

在Unix系统中链接就是指向文件的指针。就像其他程序中的指针，Unix中的链接指向一个文件或文件夹。创建链接以一种快捷的访问文件方式,允许多个链接指向同一个文件。

有两种链接类型：

* 软链接或符号链接
* 硬链接

两者区别在于当链接的资源被移动或被删除时的行为不一样。符号链接（几乎是一个目标文件的路径字符串）不会更新，而硬链接总是指向资源，甚至移动或本删除。

举例来说。 如果我们创建了一个a.txt文件，我们为其创建一个硬链接，当我们把文件删除时，我们通过硬链接仍能访问到文件。但是如果我们创建的是软链接，当删除文件时，我么访问不到该文件了。通俗来说硬链接是创建了一个位置的引用计数，而软链接像一个快捷方式（类似于Window系统）