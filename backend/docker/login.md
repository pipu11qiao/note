
登录命令

> docker login 地址 -u 用户名 -p 密码

登出命令

> docker logout 地址 

查看当前登录的地址, 在文件~/.docker/config.json的auths属性中可以查看到已经登录的地址

> cat ~/.docker/config.json

```
{
	"auths": {
		"micr.cloud.mioffice.cn": {}
	},
	"credsStore": "desktop"
}
```
表示已经登录micr.cloud.mioffice.cn