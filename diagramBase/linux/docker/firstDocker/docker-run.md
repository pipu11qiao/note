###  docker-run - Run a command in a new container


man docker-run
查看帮助信息

docker run -i -t ubuntu /bin/bash

-i, --interactive=true|false
    Keep STDIN open even if not attached. The default is false.
    When set to true, keep stdin open even if not attached. The default is false.
 -t, --tty=true|false
       Allocate a pseudo-TTY. The default is false.

       When set to true Docker can allocate a pseudo-tty and attach to the standard input of any container. This can be used, for example, to run a throwaway
       interactive shell. The default is false.

       The -t option is incompatible with a redirection of the docker client standard input.

teletype TTY
 -d, --detach=true|false
          Detached mode: run the container in the background and print the new container ID. The default is false.

       At any time you can run docker ps in the other shell to view a list of the running containers. You can reattach to a detached container with docker attach.

       When attached in the tty mode, you can detach from the container (and leave it running) using a configurable key sequence. The default sequence is CTRL-p
       CTRL-q.  You configure the key sequence using the --detach-keys option or a configuration file.  See config-json(5) for documentation on using a configuration
       file.
--restart=always 自动重启

-p, --publish
    Publish a container's port, or range of ports, to the host.

       Format: ip:hostPort:containerPort | ip::containerPort | hostPort:containerPort | containerPort Both hostPort and containerPort can be specified as a range of
       ports.  When specifying ranges for both, the number of container ports in the range must match the number of host ports in the range.  (e.g., docker run -p
       1234-1236:1222-1224 --name thisWorks -t busybox but not docker run -p 1230-1236:1230-1240 --name RangeContainerPortsBiggerThanRangeHostPorts -t busybox) With
       ip: docker run -p 127.0.0.1:$HOSTPORT:$CONTAINERPORT --name CONTAINER -t someimage Use docker port to see the actual mapping: docker port CONTAINER
       $CONTAINERPORT
--network="bridge"

       ┌───────────────┬────────────────────────────────┐
       │Value          │ Description                    │
       ├───────────────┼────────────────────────────────┤
       │none           │ No networking in the           │
       │               │ container.                     │
       ├───────────────┼────────────────────────────────┤
       │bridge         │ Connect the container to the   │
       │               │ default Docker bridge via veth │
       │               │ interfaces.                    │
       ├───────────────┼────────────────────────────────┤
       │host           │ Use the host's network stack   │
       │               │ inside the container.          │
       ├───────────────┼────────────────────────────────┤
       │container:name │ id                             │
       ├───────────────┼────────────────────────────────┤
       │network-name   │ network-id                     │
       └───────────────┴────────────────────────────────┘
docker run 命令创建并启动容器

 --privileged=true|false
          Give extended privileges to this container. The default is false.

       By default, Docker containers are “unprivileged” (=false) and cannot, for
       example, run a Docker daemon inside the Docker container. This is because by
       default a container is not allowed to access any devices. A “privileged”
       container is given access to all devices.

       When the operator executes docker run --privileged, Docker will enable access
       to all devices on the host as well as set some configuration in AppArmor to
       allow the container nearly all the same access to the host as processes
       running outside of a container on the host.
 -h, --hostname=""
          Container host name

       Sets the container host name that is available inside the container.

docker run \
  -u root \
  --rm \
  -d \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkinsci/blueocean
