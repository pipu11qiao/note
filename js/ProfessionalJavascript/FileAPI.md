File API为web开发人员提供一种安全的方式，以便在客户端访问用户计算机中的文件，并更好的对文件进行操作。

files 集合  包含一组File对象，每个File对象对应一个文件。每个File对象都有下列只读属性：

* name
* size
* type
* lastModifiedDate


#### FileReader 类型

实现异步读取文件机制。FileReader 提供了几个方法

* readAsText(file, encoding) 以纯文本的形式读取文件
* readAsDataURL(file) 读取文件并将文件以数据URI的形式保存在result属性中
* readAsBinaryString(file) 读取文件并将一个字符串保存在result属性中，字符串每个字符表示一个字节
* readAsArrayBuffer(file) 读取文件并将一个包含文件内容的ArrayBuffer保存在result属性中

提供了 progress error load 

#### slice 读取部分内容

#### 对象URL
对象URL也被称为blob URL
