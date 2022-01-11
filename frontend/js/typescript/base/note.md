#### type ####

```javascript
type Todo = {
    id: number,
    text: '',
    done: boolean,
};
```
在编译时进行类型检查,如果有错误，编译的时候就会报错

#### 原始数据类型(Primitive) ####

* 布尔值 bollean
* 数字 number
* 字符串 string
* 空值 void
    js中没有空值的概念，在ts中用 `void` 表示没有返回值的函数
    ```javascript
    function f():void{
        alert('ok')
    }
    ```
    声明一个void类型的变量没什么用，只能赋值null和undefined
* Null 和 Undefined
    null和undefined 是所有类型的子类型

#### 任意值(Any) ####

任意值（Any）表示允许赋值为任意类型

如果是一个普通类型，在赋值过程中改变类型是不被允许的，any类型可以
在任意值上访问任何属性都是被允许的，也允许调用任何方法
声明一个变量为任意值后，对他的任何操作返回的内容都是任意值

如果变量未声明，会被默认识别为任意值类型

#### 类型推论 (Type Inference) ####

如果没有指定类型，ts会依据类型推论额规则推断出一个类型

#### 联合类型 （Union Types） ####

表示可以去多个类型中的一种,用 `|` 连接多个类型

```javascript
let val: string | number | bollean = 2;
```

访问联合类型的属性和方法，当不能确定具体类型时，只能访问联合类型的公有属性和方法

##### ts 项目中使用第三方包

先安装包
> yarn add crypto-js
如果有对应的type包,安装 types
> yarn add  -D @types/crypto-js
如果没有type包
如果没有这个库的声明文件的话，我们需要手动声明这个库。查找项目中是否有以.d.ts结尾的文件；有的话，在文件中添加代码 declare module "第三方类库名";没有的话可以在src目录下新建一个types目录,然后在types 目录下新建一个 index.d.ts文件然后在文件中添加代码 declare module "第三方类库名"。

> declare module 'rc-checkbox';
这个bug就解决了，重启项目就可以了！

