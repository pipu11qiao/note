Function.prototype.my_bind = function () {
    const _this = arguments[0];
    const _fun = this;
    const otherArgs = [].slice.call(arguments, 1);
    return function () {
        _fun.call(_this, otherArgs.concat([].slice.call(arguments, 0)));
    }
}

// const obj = {
//     text: "aa"
// }
// let fun = function () {
//     console.log(this.text);
// }
//
// fun();
//
// const newFun = fun.my_bind(obj, 'a1', 'b1');
// newFun('a2', 'b2')
