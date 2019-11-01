#### 二叉树序列化和反序列化 ####

##### 前序 序列化和反序列化 #####

```javascript
// 前序序列化
function preOrderSerialize(node) {
    // console.log('preOrderUnRecur');
    const stack = [];
    const serializeArr = [];
    stack.push(node);
    while (stack.length !== 0) {
        const node = stack.pop();
        serializeArr.push(node ? node.value : '#');
        if (node) {
            stack.push(node.right);
            stack.push(node.left)
        }
    }
    return serializeArr.join('_');
}

// 前序反序列化
function preOrderDeserialize(str) {
    const queue = str.split('_');
    const stack = [];
    const head = new Node(queue.shift())
    stack.push(head);
    while (stack.length > 0 && queue.length > 0) {
        const parent = stack[stack.length - 1];
        if (parent.right) {
            stack.pop();
            continue
        }
        // stack 中保存当前处理的父节点,如果处理完拿到的节点，查看父节点状态
        const nextStr = queue.shift();
        const isNull = nextStr === '#';
        if (parent.left === null) {
            // 如果父节点左节点为null，如果该节点为空，左节点置为占位符,继续循环,如果不为空，创造节点为左节点，压入栈，循环
            if (isNull) {
                parent.left = '#';
            } else {
                stack.push(parent.left = new Node(nextStr));
            }
        } else {
            // 否则如果父节点左节点不为null，如果父节点左节点为占位符，该节点置为父节点的有节点，修改左节点为null，
            //      如果该节点为空，弹出父节点,继续循环,如果不为空，创造节点为右节点，压入栈，循环
            if (parent.left === '#') {
                parent.left = null;
            }
            if (isNull) {
                parent.right = null;
                stack.pop();
            } else {
                stack.push(parent.right = new Node(nextStr));
            }

        }
    }
    return head;
}

```



