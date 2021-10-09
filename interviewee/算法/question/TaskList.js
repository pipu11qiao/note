class Task {
    constructor(fun, index) {
        this.fun = fun;// 需要执行的函数
        this.index = index;// 任务中的位置
    }

    start() {
        try {
            if (typeof this.fun === "function") {
                const result = this.fun()
                if (result instanceof Promise) {
                    return result
                }
                return Promise.resolve(result);
            } else {
                if (this.fun instanceof Promise) {
                    return this.fun
                }
                return Promise.resolve(this.fun);
            }

        } catch (e) {
            return Promise.reject(e);
        }
    }
}

class TaskList {
    constructor(
        funcArr = [],
        callback = () => {
        },
        maxTaskCount = 3
    ) {
        this.taskPool = []
        this.workPool = [];
        this.resultPool = [];
        this.maxTaskCount = maxTaskCount;
        this.finishCount = 0;
        this.taskCount = 0;
        this.callback = callback;
        this.init(funcArr)
    }

    init(funcArr) {
        this.taskCount = funcArr.length;
        this.taskPool = funcArr.map((fun, index) => new Task(fun, index))
        for (let i = 0; i < this.maxTaskCount; i++) {
            this.add();
        }
    }

    checkAdd() {
        return this.workPool.length < this.maxTaskCount && this.taskPool.length > 0
    }

    checkDone() {
        return this.finishCount >= this.taskCount;
    }

    remove(obj) {
        const index = this.workPool.findIndex(item => item === obj);
        if (index > -1) {
            this.workPool.splice(index, 1);
        }
    }

    add() {
        if (this.checkAdd()) {
            const newTaskObj = this.taskPool.shift();
            this.startTask(newTaskObj);
            this.workPool.push(newTaskObj);
        }
    }

    startTask(newTaskObj) {
        newTaskObj.start().then((data) => {
            this.next(newTaskObj, data);
        }).catch((e) => {
            console.log('e', e);
            this.next(newTaskObj, null);
        })
    }

    next(prevTaskObj, prevTaskResult) {
        const index = prevTaskObj.index
        this.finishCount++
        this.remove(prevTaskObj)
        this.resultPool[index] = prevTaskResult;
        if (this.checkDone()) {
            this.callback(this.resultPool);
        } else {
            this.add();
        }
    }

}

// 原始数据
// new TaskList([3, 4, 5, 6, 2, 1, 7, 8], (data) => {
//     console.log('pri', data);
// })
// 函数
// new TaskList(
//     [3, 4, 5, 6, 2, 1, 7, 8].map((item) => () => item),
//     (data) => {
//         console.log('fun', data);
//     })

// promise
new TaskList(
    [3, 4, 10, 5, 6, 2, 1, 7, 8].map(
        (item) => new Promise((resolve) => {
            setTimeout(() => {
                resolve(item);
            }, item * 100)
        })),
    (data) => {
        console.log('fun', data);
    }
)
// fun => promise
new TaskList(
    [3, 4, 10, 5, 6, 2, 1, 7, 8].map(
        (item) => () => new Promise((resolve) => {
            setTimeout(() => {
                resolve(item);
            }, item * 100)
        })),
    (data) => {
        console.log('fun', data);
    }
)

