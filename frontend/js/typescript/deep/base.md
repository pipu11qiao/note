### 声明空间

两种声明空间： 类型声明空间和变量声明空间

##### 类型声明空间

包含用来当做类型注解的内容

出现错误提示： cannot find name 'Bar' 的原因是名称 Bar 并未定义在变量声明空间。

##### 变量声明空间


#### 基本注解

```ts
 const num: number  = 123;
 function identity(num:number):number {
    return num;
 }
 const identify = (num:number):number=>{
    return num;
 }
```
