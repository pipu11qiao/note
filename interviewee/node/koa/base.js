// 调用next
function compose(middlewares, context) {
    const len = middlewares.length;

    function next(index) {
        // console.log('index', index);
        if (index >= len) {
            return Promise.resolve();
        }
        const fun = middlewares[index];
        try {
            const value = fun.call(null, context, (value) => {
                // console.log('value', value);
                next(index + 1)
            })
            return Promise.resolve(value);
        } catch (e) {
            return Promise.reject(e)
        }
    }

    next(0);
}

class Koa {
    constructor() {
        this.name = 'koa';
        this.middlewares = [];
    }

    use(fun) {
        if (!fun || typeof fun !== 'function') {
            throw new Error('fun need a function');
        }
        this.middlewares.push(fun);
    }

    getBaseContext() {
        return {}
    }

    listen() {
        const context = this.getBaseContext();
        compose(this.middlewares, context);
    }
}

// test 使用方式
const app = new Koa();

app.use(async function (context, next) {
    console.log('start1');
    await next();
    console.log('end1');
});

app.use(async function (context, next) {
    console.log('start2');
    await next();
    console.log('end2');
});

app.use(async function (context, next) {
    console.log('start3');
    await next();
    console.log('end3');
});
app.listen()

