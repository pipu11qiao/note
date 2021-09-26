const a = {
    name: 'aa',
    age: 27
};

for (let key in a) {
    overwriteKey(a, key)
}

function overwriteKey(obj, key) {
    // 属性拦截
    Object.defineProperty(obj, key, (function (obj, key) {
        const _obj = Object.create(null);
        _obj.set = function (val) {
            obj['__' + key] = val
        }
        _obj.get = function () {
            return obj['__' + key];
        }
        return _obj
    })(obj, key))
}

a.name = 'a1a';
a.age = 20;
console.log('a', a);
console.log(a.name)

