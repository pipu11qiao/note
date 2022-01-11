使用 docker 安装openresty 

在路径下

>/usr/local/openresry/

主要配置都在nginx文件夹下,其他平级文件夹暂时不知道是干嘛的

>/usr/local/openresty/nginx

nginx 下的目录
conf     html     logs     lua      modules  sbin
 
* conf 存放默认的nginx.conf 文件
* html 默认的html文件夹
* lua lua文件夹的位置
* modules nginx modules ?
* logs 

  * access.log 默认的是一个软链接，指向 /dev/stdout ?? 为什么要这么做
  * error.log 默认的是一个软链接，指向 /dev/stderr

```sh
  lrwxrwxrwx    1 root     root            11 Dec  3 02:52 access.log -> /dev/stdout
  lrwxrwxrwx    1 root     root            11 Dec  3 02:52 error.log -> /dev/stderr
  -rw-r--r--    1 root     root             2 Jan 11 09:21 nginx.pid
```

如果需要记录log 需要重新在logs目录下创建对应的log

  