
promise 实现有两个关键的地方
1. 状态机 不可逆 只触发一次
2. then 链式调用，对结果的处理
        1. pending fulfilled rejected
           接受参数 executor
           内部定义 resolve,reject 改变状态接受值或原因，调用onFulfilled 或 onRejected 中的方法
          调用executor 传入resolve 和 reject
         2. then 方法接受两个可选参数 onFulfilled 和 onReject
          首先封装成基本函数
          返回新的promise, 保证其在异步的实现(下一个eventLoop中被调用) 在新的promise的executor中用setTimeout 模仿微任务的实现
          定义promise和onFulfilled 和 onReject 返回值 x
          判断当前promise的状态，如果fulfilled 调用onFulfilled 方法，结果x，如果rejected 调用onRejected 结果x
          如果是pending状态，将函数push到对应的等待队列中
          链式调用，返回一个新的promise 对象，

           then 中会根据x的值对promise 的状态和结果进行处理
            resolvePromise(promise,x,resolve,reject)

           如果x 是function 或者 对应
                如果有then 方法说明是类promise对象
                    调用其then方法，获得返回结果，递归进行 resolvePromise
                    !!!!! 这一步是promise的关键
                 否则resolve
           否则 resolve
### 思考
1. then 中怎么处理返回的promise
2. promise 和微任务之间的关系，onFulfilled onReject 合适加入微任务队列
 

#### 1.状态 和构造

``` javascript
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
    let self = this;
    self.state = PENDING;
    self.onFulfilled = [];
    self.onRejected = [];

    function resolve(value) {
        if (self.state === PENDING) {
            self.state = FULFILLED;
            self.value = value;
            self.onFulfilled.forEach(fn => fn());
        }
    }

    function reject(reason) {
        if (self.state === PENDING) {
            self.state = REJECTED;
            self.reason = reason;
            self.onRejected.forEach(fn => fn())
        }
    }

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

```
#### 2. then 处理

```javascript
Promise.prototype.then = function (onFulfilled, onRejected) {
    let self = this;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
        throw err
    }
    let x;
    let promise2 = new Promise(function (resolve, reject) {
        if (self.state === FULFILLED) {
            setTimeout(() => {
                try {
                    x = onFulfilled(self.value);
                    resourcePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e)
                }
            })
        } else if (self.state === REJECTED) {
            setTimeout(() => {
                try {
                    x = reject(self.reason);
                    resourcePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e)
                }
            })
        } else if (self.state === PENDING) {
            self.onFulfilled.push(() => {
                setTimeout(() => {

                    try {
                        x = onFulfilled(self.value);
                        resourcePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                })
            })
            self.onRejected.push(() => {

                setTimeout(() => {
                    try {
                        x = reject(self.reason);
                        resourcePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                })
            })

        }
    })
    return promise2;
}

```

#### 3. resolvePromise 处理 核心是返回的是一个类promise对象

```javascript

function resolvePromise(promise,x,resolve,reject){
    if(promise===x){
        throw new TypeError('chaining promise');
    }
    if(x&&typeof x==='object' || typeof x === 'function'){
        let used;
        try {
            const then = x.then;
            if(typeof then ==='function'){
                then.call(x,(value)=>{
                    if (used) return;
                    used = true;
                    resolvePromise(promise, value, resolve, reject);
                },(err)=>{
                    if (used) return;
                    used = true;
                    reject(err)
                })
            }else {
                if(used) return;
                used = true;
                resolve(x);
            }
        }catch (e){
            if(ggused) return;
            used = true;
            reject(e)
        }
    }else {
        resolve(x)
    }

}

```

