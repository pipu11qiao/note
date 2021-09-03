Dockerfile 指令

##### CMD

CMD指令用于指定一个容器启动时要运行的命令
docker RUN 命令可以覆盖CMD指令。

#### ENTRYPOINT

#### 3. WORKDIR
在容器内部创建一个目录  ENTRYPOINT 和 CMD指令会在这个目录下执行

#### 4. ENV

构建过程中设置环境变量

docker run -e 指定运行时环境变量

#### 5. USER 该镜像会以生么样的用户去运行

#### 6. VOLUME 

#### 7. ADD 用来将构建环境下的文件和目录复制到镜像中

#### 8. COPY

#### 9.LABEL 用于为Docker 镜像添加元数据
