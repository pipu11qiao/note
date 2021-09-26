# curl 命令介绍和例子 #

**curl** 是一个命令行工具用来向/从服务器传输数据，它可以使用任何支持的传输协议（HTTP,FTP,IMAP,POP3,SCP,SFTP,SMTP,TFTP,TELNET,LDAP OR FILE）。 curl 是用libcurl支持的。主要来自动化处理，因为它被设计时没有考虑用户交互。它可以一次传输多个文件。

##### 语法 #####

```
curl [options] [URL...]

```
##### URL资源地址  #####

最基本的用法就是下面的命令，输入一个url

```
curl https://www.geeksforgeeks.org
```

这会输出这个地址的内容。URL的语法是协议依赖的，多个url可以写成：

```
curl http://site.{one, two, three}.com

```
url中如果是数字的连续部分可以写成

```
curl ftp://ftp.example.com/file[1-20].jpeg

```

## 选项##

* -o: 使用给定的文件名保存文件到本地
    语法
    ```
    curl -o [file_name] [URL...]

    ```
    例子：

    ```
    curl -o hello.zip ftp://speedtest.tele2.net/1MB.zip

    ```
* -O: 保存文件到本地，文件名用链接中的的文件名
    ```
    curl -o [file_name] [URL...]

    ```
* -C: - 这个选项会继续下载那些因为其他原因停止的下载。对于现在大文件和被打断的很有用
    ```
    curl -O [URL...]

    ```
* -limit-rate: 限制数据传输的速度的上限，让它保持在给定的数值字节速度。
    ```
    curl --limit-rate [value] [URL]

    ```
* -u: curl命令也提供了从需要用户验证的ftp服务器下载的选项
    ```
    curl -u {username}:{password} [FTP_URL]

    ```
* -T: 该选项向ftp服务器上传文件
    ```
    curl -u {username}:{password} -T {filename} {FTP_Location}

    ```
curl 命令还有很多其他的选项，可以通过man命令来查询。
