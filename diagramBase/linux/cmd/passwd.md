linux下passwd命令设置修改用户密码


passwd [OPTION...]

passwd 作为普通用户和超级权限用户都可以运行，但作为普通用户只能更改自己的用户密码，但前提是没有被root用户锁定；如果root用户运行passwd ，可以设置或修改任何用户的密码；

passwd 命令后面不接任何参数或用户名，则表示修改当前用户的密码；请看下面的例子；