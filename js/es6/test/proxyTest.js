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

