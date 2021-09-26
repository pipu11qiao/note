## proxy

用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种元编程，即对编程语言进行编程

在目标对象之前假设一层拦截，外界对该对象的访问，都必须先通过这层拦截。

```javascript
const a = {
    name: 'a',
    age: 20,
};

const aProxy = new Proxy(a, {
    get: function (target, propKey, receiver) {
        console.log(`getting ${propKey}!`);
        return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
        console.log(`setting ${propKey}!`);
        return Reflect.set(target, propKey, value, receiver);
    }
});
const obj1 = aProxy;

aProxy.age = 3;
const obj2 = aProxy;


console.log(obj1 === obj2);

```
