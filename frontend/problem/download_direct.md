### 下载文件相关设置

一般都做过下载文件的需求，如果一些常见的文件类型(html,音频，图片，压缩包，文档pdf、word等)的下载,本文在chrome,火狐，safari和微信浏览器做的相关测试。

本文中访问的文件是：download文件夹中的

        a.html
        a.mp3
        a.zip
        p.pdf
        pada.jpeg

#### 用法

直接在当前或重新打开窗口访问文件路径

```html
 window.open(filepath)
 location.href=filepath;
 <a href="filepath"></a>
```
##### 测试结果:
chrome、火狐,safari除了zip文件外都在浏览器中打开,zip文件在chrome和safari中直接被下载，火狐是询问下载
微信浏览器其他文件都直接打开，pdf是用默认浏览器打开(可能自身打不开),zip文件点击没反应

很明显，这种办法不能很好地实现需求，H5中a标签可以添加download属性(有些浏览器不兼容，ie)

```html
 <a href="filepath" download></a>
```

##### 测试结果:

chrome,safari都直接被下载
火狐除了zip文件外都在浏览器中打开,火狐是询问下载
微信浏览器所有文件点击没反应

显然这个办法也不是很实用，经过google后发现可以通过设置请求的content-disposition属性来控制浏览器对于文件的行为


#### Content-Disposition 属性

在普通的HTTP响应中 **Content-Disposition**可以作为响应头用来表明该响应内容是要在浏览器中内联(inline)显示，如作为一个网页或者网页的一部分展示,还是作为附件(attachment)，被下载和本地保存。
在内容类型为multipart/form-data的响应体,**Content-Disposition**可以作为普通头部属性，用来作为文件流报文的子组成部分来提供响应相应的信息。这些子组成部分，被Content-Type中的boundary字段分割，他们对报文实体没有影响。

在服务器端进行设置(node代码）

```javascript
        if(filePath.indexOf('download') > -1){
            console.log('okk');
            await ctx.set('Content-disposition','attachment');
        }
```

##### 测试结果:

chrome,safari都直接被下载
火狐都是询问下载
微信浏览器所有文件点击没反应

可以看到除了微信浏览器其他浏览器都能正确的下载文件
##### 解决方法
通过相关搜索发现微信屏蔽了内置浏览器的下载功能(真是无语,你一个浏览器能改变用户习惯么),所以看到很多app或软件在微信浏览器打开的时候提示在别的浏览器打开该页面。

#### 总结

下载文件方面前端能做的工作有限，需要后端同学在需要下载的文件请求中设置content-diposition:attachment来告知浏览器正确下载文件。

