function test() {

    function sliceArguments(argumentsObj, startI = 0) {
        return [].slice.call(argumentsObj, startI);
    }

    function rememberArg(fn) {
        const args = sliceArguments(arguments, 1)
        return function () {
            return fn.apply(this, args.concat(sliceArguments(arguments)))
        }
    }

    function curry(fn, length) {
        const len = length || fn.length;
        return function () {
            if (arguments.length < len) {
                // 记住当前的参数
                const args = sliceArguments(arguments);

                var combined = [fn].concat(sliceArguments(arguments));
                return curry(rememberArg.apply(this, combined), len - args.length)
            } else {
                console.log('do')
                return fn.apply(this, sliceArguments(arguments));
            }
        }

    }

// function add(a, b, c, d) {
//     return a + b + c + d;
// }
    function add(a, b) {
        console.log(a, b)
        return a + b;
    }


    let res = curry(add)
    res = res(1);
    console.log(res);
    res = res(2);
    console.log(res);
}

function curry(fn) {
    return function judge(...args) {
        if (args.length < fn.length) {
            return (...nextArgs) => judge(...args, ...nextArgs);
        } else {
            return fn.apply(this, args);
        }
    }
}

function add(a, b, c) {
    console.log(a, b, c)
    return a + b + c;
}

let res = curry(add)(1)(2)(4);
console.log(res);
