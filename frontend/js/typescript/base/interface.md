#### 对象类型 接口(Interface) ####

接口是对行为的抽象，具体行动由类实现

ts中接口是一个很灵活的概念，除了可用于对类的一部分行为进行抽象以外，也可用于对 对象的形状进行描述

* 对类的行为进行一部分抽象
* 对象的形状

interface 接口的首字母大写

```javascript
interface Person {
    name: string;
    age: numbe;
}
```

定义的对象比接口多一些和小一些属性都是不允许的

可以通过添加可选属性，来控制不完全匹配形状

```javascript
interface Person {
    name: string;
    age?: numbe;
}
```
但是还是不允许添加未定义属性

任意属性和只读属性

```javascript
interface Person {
    readonly name: string;
    age?: numbe;
    [propName:string]:any
}
```


#### 数组类型 ####

在ts中数组类型的定义有多种方式
* 类型+方括号 `number[]`
```javascript
let arr:number[] = [1,2,3];
```

* 数组泛型 `Array<number>`
泛型 （Array generic）
```javascript
let arr:Array<numbe> = [1,2,3];
```

* 用接口表示数组

```javascript
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

##### 类数组 #####

```javascript
interface Args {
  [index:number]:any,
  length: number,
}
```
常用的







