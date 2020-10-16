## webpack css中使用别名(alias)和node_modules中的文件 ##

在webpack中配置的别名(alias),也就是常用路径索引，在js文件中可以直接使用。举例来说:
> 有如下文件，现在我们要使用`/src/imgs/star.png`,赢配置别名'@imgs'->'/src/imgs'

```
└── src
    ├── components
    ├── error
    ├── imgs
        ├── ssz_icon_v2.png
        ├── star.png
    ├── pages
    ├── routes
    ├── store
    └── templates
```
在js中可以直接使用：

```javascript
import starImg from '@imgs/star.png';
```
在css中是通过**css-loader**来完成别名路径的替换
> To import assets from a node_modules path (include resolve.modules) and for alias, prefix it with a ~:
如果要使用node_moduels或别名中的路径，使用**~**前缀
因此，我们在css中使用别名`@imgs`:

```css
url('~@imgs/star.png');
```



