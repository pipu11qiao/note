// function sum(a, b, c, d, e) {
//     // a,b,c,d,e
//     return a + b + c + d + e;
// }

// sum(1, 2, 3, 4, 5);

const res = sum(1)(2)(3)(4)(5)();

function sum(num) {
    let sum = 0;
    if (num) {
        sum+=num;
        return function (n) {
            sum+
        }
    } else {
    }

}
