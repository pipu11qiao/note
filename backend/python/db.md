python 对书库链接的模块编写规范：

模块接口

#### Constructors

connect 方法 构造连接器实例的方法,接收数据库需要的参数

#### Globals 全局属性

* apilevel
* threadsafety
* paramstyle

#### Exceptions 异常

一些error

Connection Objects 连接对象

方法

* close
* commit 提交所有挂起的事物
* rollback
* cursor 返回 cursor实例

光标实例 就是命令行的光标？
表示数据库光标，用来管理获取操作的上下文操作的

光标实例的属性和方法

属性

* description 返回每一列的描述 name type_code 是必须返回 列名称 列的数据类型
* rowcount 行数

方法

* callproc
* close 关闭光标
* execute 准备和执行数据库操作
*





