### docker tag docker 标签

#### 描述

创建一个指向源镜像的带有标签的目标镜像

#### 用法

> docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]

#### 额外描述

一个镜像名是由斜线分隔的名称组构成，前缀可以使一个可选的仓库域名。
* 仓库域名是标准的dns规则，可选端口，如果不指明仓库域名，默认是registry-1.docker.io
* 名称组包含小写，数字和分隔符。

一个标签名由大小写，数字，阶段符，斜线组成


#### 例子

##### 通过镜像ID标记一个镜像

>  docker tag 0e5574283393 fedora/httpd:version1.0

##### 通过镜像名称标记一个镜像

>  docker tag httpd fedora/httpd:version1.0

##### 通过镜像名称和标记名标记一个镜像

> docker tag httpd:test fedora/httpd:version1.0.test

##### 标记为一个私有仓库的镜像

> docker tag 0e5574283393 myregistryhost:5000/fedora/httpd:version1.0 
