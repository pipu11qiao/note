
#### resolve reject

```javascript
Promise.resolve = function (val) {
    if (val instanceof Promise) {
        return val;
    }
    return new Promise(function (resolve, reject) {
        if (val && typeof val === 'object' && val.then && typeof val.then === "function") {
            setTimeout(() => {
                val.then(resolve, reject);
            })
        } else {
            resolve(val);
        }
    });
}
Promise.reject = function (err) {
    return new Promise((resolve, reject) => {
        reject(err)
    });
}

```

#### catch finally

```javascript
Promise.prototype.catch = function (catchFn) {
    return this.then(null, catchFn)
}
Promise.prototype.finally = function (finalFn) {
    return this.then(
        (value) => {
            return Promise.resolve(finalFn()).then(() => {
                return value;
            })

        },
        (err) => {
            return Promise.resolve(finalFn()).then(() => {
                throw err
            })
        }
    )
}

```

#### all

* 顺序对应
* 完成判断

```javascript

Promise.all = function (promises) {
    let result = [];
    return new Promise(function (resolve, reject) {
        if (promises.length === 0) {
            resolve(result);
        }
        try {
            let finishCount = 0;
            let len = promises.length;

            function resolveOne(i, value) {
                result[i] = value;
                finishCount++
                if (finishCount >= len) {
                    resolve(result);
                }
            }

            for (let i = 0; i < len; i++) {
                Promise.resolve(promises[i]).then((value) => {
                    resolveOne(i, value)
                }, (err) => {
                    reject(err);
                    return
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

```

#### race

```javascript
Promise.race = function (promises) {
    let result = [];
    return new Promise(function (resolve, reject) {
        if (promises.length === 0) {
            resolve(result);
        }
        try {
            let len = promises.length;
            for (let i = 0; i < len; i++) {
                Promise.resolve(promises[i]).then((value) => {
                    resolve(value);
                }, (err) => {
                    reject(err);
                    return
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

```
