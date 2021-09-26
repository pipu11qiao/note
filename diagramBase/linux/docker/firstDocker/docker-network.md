### docker-network Manage networks

 docker(1), docker-network-connect(1), docker-network-create(1),
       docker-network-disconnect(1), docker-network-inspect(1), docker-network-ls(1),
       docker-network-prune(1), docker-network-rm(1)


* docker network create app
* docker network inspect app
* docker network ls
* docker network rm app

### 两个容器相互访问

1. 创建网络

```
docker network create -d bridge my-net
```
2. 基于网络创建两个容器

```

docker run -d -it --network=my-net --name centos1 centos
docker run -d -it --network=my-net --name centos2 centos

```
3. 测试相互访问

```
dcoker exec -it centos1 /bin/bash
ping centos2
```

在 /etc/hosts 中没有找到对应的域名配置，估计是通过别的方式来解析对应的域名与ip的联系

#### 将已有容器连接到Docker网络

添加
```
docker network connect app db2
```

断开

```
docker network disconnect app db2
```
