

#### 当你写的代码不在你想要的开发分支的时候，使用git stash 记录中当前的修改，切换到开发的分支 使用 git stash pop 命令将修改拿出来。

#### git从某次提交拉分支

> git checkout -b branchname <commitId>

#### 查看某个commit的改动 ####

* `git show COMMIT` 查看某个commit的改动
* `git show COMMIT filename` 查看某个commit的改动
* `git diff COMMIT` 查看某个commit与当前工作区的差异
* `git diff COMMIT filename` 查看某个commit中某个文件与当前工作区的差异

#### 查看所有的log

`git log --oneline --graph --decorate --all`
`git log --pretty=oneline --graph --decorate --all`

#### 查看某个文件的改动
`git log -p filename`


