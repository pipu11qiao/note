## [翻译] ubuntu 安装 oh-my-zsh

前期依赖,安装 zsh 和 git-core

```bash

apt-get install zsh
apt-get install git-core

```
让**zsh**在ubuntu上运行有点奇怪，因为**sh**无法识别**source**命令。因此，你需要运行下面代码来安装**zsh**

```bash

wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh

```

接下来将你得shell换成zsh

```bash

chsh -s `which zsh`

```

最后重启

```bash

sudo shutdown -r 0

```

#### 参考链接
* [Getting oh-my-zsh to work in Ubuntu](https://gist.github.com/tsabat/1498393)
