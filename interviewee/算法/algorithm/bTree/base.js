const {getOneNode} = require('./util')

function pre(node, fun = console.log) {
    if (node === null) {
        return
    }
    const val = node.val;
    fun(val)
    pre(node.left, fun);
    pre(node.right, fun);
}

function mid(node, fun = console.log) {
    if (node === null) {
        return
    }
    mid(node.left, fun);
    const val = node.val;
    fun(val)
    mid(node.right, fun);
}

function back(node, fun = console.log) {
    if (node === null) {
        return
    }
    back(node.left, fun);
    back(node.right, fun);
    const val = node.val;
    fun(val)
}


function prevNormal(node, fun = console.log) {
    const stack = [];
    stack.push(node);
    while (stack.length > 0) {
        const node = stack.pop();
        if (node !== null) {
            const val = node.val;
            fun(val);
            stack.push(node.right);
            stack.push(node.left);
        }
    }
}

function midNormal(node, fun = console.log) {
    const stack = [];
    stack.push({
        type: 'node',
        node: node,
    });
    while (stack.length > 0) {
        const {node, type} = stack.pop();
        if (node !== null) {
            if (type === 'left') {
                fun(node.val);
            } else {
                stack.push(
                    {
                        type: 'node',
                        node: node.right,
                    },
                    {
                        type: 'left',
                        node: node,
                    },
                    {
                        type: 'node',
                        node: node.left,
                    },
                )
            }
        }
    }
}

function backNormal(node, fun = console.log) {
    const stack = [];
    stack.push({
        type: 'node',
        node: node,
    });
    while (stack.length > 0) {
        const {node, type} = stack.pop();
        if (node !== null) {
            if (type === 'left') {
                fun(node.val);
            } else {
                stack.push(
                    {
                        type: 'left',
                        node: node,
                    },
                    {
                        type: 'node',
                        node: node.right,
                    },
                    {
                        type: 'node',
                        node: node.left,
                    },
                )
            }
        }
    }
}

const node = getOneNode();

function check(cur, noCur) {

// console.log('node', node);
    let arr = []
    cur(node, function (val) {
        arr.push(val)
    });
    console.log(arr.join(','));
    arr = []
    noCur(node, function (val) {
        arr.push(val)
    });
    console.log(arr.join(','));
}

// check(pre, prevNormal);
// check(mid, midNormal);
check(back, backNormal);
