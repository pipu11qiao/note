
##### require.resolve #####

官方文档中的说明：

```
require.resolve(request[,options])
```
* request 模块路径
* options 

    * paths 从哪个路径开始查找模块

该方法和require方法不同之处在于不是加载模块，而是只返回对应的模块路径。

