什么是尾调用优化?

尾调用优化是指你可以避免重新分配给一个函数新的堆栈因为正在调用的函数会简单的返回它从已经调用过得函数中获得的值。最常用的是尾递归，利用尾调用优化写出的递归能够使用常数个栈空间。

Shema 是这类有限的语言中的一个，在规范中保证任何实现都要提供优化（js从ES6开始也这样做）。下面是两种阶乘函数的例子:

```javascript
function fact(x) {
    if (x === 0) {
        return 1
    }
    return x * fact(x - 1);
}

function fact(x) {
    function fact_tail(x, accum) {
        if (x === 0) {
            return accum;
        }
        return fact_tail(x - 1, x * accum)
    }

    fact_tail(x, 1)
}

```
第一个函数不是为递归因为当递归被创建是，函数需要保存每步的乘操作因为它需要跟上一步调用返回的结果进行操作。栈看起来是这个样子:

```javascript

(fact 3)
(3 * (fact 2))
(3 * (2 * (fact 1)))
(3 * (2 * (1 * (fact 0))))
(3 * (2 * (1 * 1)))
(3 * (2 * 1))
(3 * 2)
6

```
相反，尾递归形式的阶乘的栈追踪看起来是下面的样子:

```javascript
(fact 3)
(fact_tail 3 1)
(fact_tail 2 3)
(fact_tail 1 6)
(fact_tail 0 6)
6
```
可以看到，每次调用fact_tail我们只需要保持追踪相同数量的数据,因为我们在函数最后简单的返回从函数体上部分钟获得的结果。这意味着是处理fac(1000000)，也只需要和fact(3)一样的空间。这和非尾递归的情况不同，想这么大的数据量会导致栈溢出。



