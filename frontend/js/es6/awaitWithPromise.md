### 结合async/await使用Promise对象的api（all,race）

Promise 和 async/await 是新版本的js中的受欢迎的更新, 下面介绍怎么结合async/await使用Promise对象的[all](http://es6.ruanyifeng.com/#docs/promise#Promise-all)和[race](http://es6.ruanyifeng.com/#docs/promise#Promise-race)等方法,这些方法的参数都是接收一个可以放置promise对象的数组。

```javascript

const resolve1 = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(200), 200);
    })
};

const resolve2 = async () => {
    return await new Promise((resolve) => {
        setTimeout(() => resolve(1000), 1000);
    })
};

const resolve3 = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(2000), 2000);
    })
};

(async function() {
    let result = await resolve1();
    console.log(result); // 200
    result = await resolve2();
    console.log(result); // 1000
    result = await resolve3();
    console.log(result); // 2000
})()


```
#### 1.Promise.all 方法 ####

Promise.all方法接收一个放置promise对象的数组,返回一个包装好的promise对象

```javascript
const asyncFunctions = [
    resolve1(),
    resolve2(),
    resolve3(),
];
(async function() {
let result = await Promise.all(asyncFunctions);
console.log(result); // [200,1000,2000]
})()
```
#### 2.Promise.race 方法 ####

Promise.all方法接收一个放置promise对象的数组,返回一个包装好的promise对象

```javascript
const asyncFunctions = [
    resolve1(),
    resolve2(),
    resolve3(),
];
(async function() {
let result = await Promise.race(asyncFunctions);
console.log(result); //200
})()

```

### 总结

像resolve2这种async方法返回值是promise对象,这样就可以放到promise数组中去，Promise.all 和 Promise.race 方法返回的都是promise 对象也可以使用async/await方案转成同步写法。


##### 参考链接
[Dealing with Promises In an Array with async/await]( https://dev.to/afifsohaiii/dealing-with-promises-in-an-array-with-async-await-5d7g)

