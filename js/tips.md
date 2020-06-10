
push,pop,unshift,shift 用法

```javascript
var arr = [1,2];
```


这四个方法都是对栈进行操作，分为两组 pop和push，shift和unshift。
不同的是push,pop是从数组的尾部进行增减，unshift,shift是从数组的头部进行增减。
push 和 unshift,向数组的尾部/头部添加若干元素，并返回数组的长度；

```javascript
arr.push(3,4) // 返回arr的长度4
arr;//[1,2,3,4]
arr.unshift(0,0.5);
arr //[0,0.5,1,2,3,4,]
```

pop 和 shift 从数组的 尾部/头部 删除一个元素，并返回被删除的元素；空数组是继续删除，不报错，但返回undefined

