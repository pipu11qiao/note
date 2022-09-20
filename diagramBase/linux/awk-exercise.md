1. 统计/etc/fstab 文件中每个文件系统类型出现的次数

```
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/sda2 during installation
UUID=68a92ea7-2d46-4f93-93b7-bc79e7e83b3a /               ext4    errors=remount-ro 0       1
# /boot/efi was on /dev/sda1 during installation
UUID=6CF6-3420  /boot/efi       vfat    umask=0077      0       1
/swapfile                                 none            swap    sw              0       0
```

> awk '/^UUID*/{filetype[$3]++}END{for(i in filetype){print i,filetype[i]}}' /etc/fstab

2. 统计/etc/fstab,文件中每个单词出现的次数

> awk '/^UUID*/{for(i=1;i<=NF;i++){count[$i]++}}END{for(i in count){print i,count[i]}}' /etc/fstab

3. 提取出字符串Yd$C@M05MB%9&Bdh7dq+YVixp3vpw中的所有数字

> echo 'Yd$C@M05MB%9&Bdh7dq+YVixp3vpw' | awk -F "[^[:digit:]]" '{for(k=1;k<=NF;k++){count[$k]}}END{for(i in count){printf "%s",i}printf "\n"}'

* 通过awk判断系统的用户都属于什么用户：

```
~$ cat /etc/passwd

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin

```