function curry(fun, length) {
    let len = length || fun.length;
    return function () {
        let _this = this;
        if (arguments.length >= len) {
            return fun.apply(_this, Array.prototype.slice.call(arguments))
        } else {
            let prevArr = Array.prototype.slice.call(arguments);
            return curry(function () {
                return fun.apply(_this, [...prevArr, ...Array.prototype.slice.call(arguments)])
            }, len - arguments.length)
        }

    }
}

function add(a, b, c,d) {
    return [a, b, c,d];
}

const res = curry(add)(1)(2)(3);
console.log('res', res);

