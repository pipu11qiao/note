### 在二叉树中找到一个节点的后继节点和前驱前驱节点,先序、中序、后序遍历的分别实现
【题目】 现在有一种新的二叉树节点类型如下:

Node { 
value;
left;
right;
parent;
}
该结构比普通二叉树节点结构多了一个指向父节点的parent指针。假 设有一 棵Node类型的节点组成的二叉树，树中每个节点的parent指针 都正确地指向 自己的父节点，头节点的parent指向null。只给一个在 二叉树中的某个节点 node，请实现返回node的后继节点的函数。在二 叉树的中序遍历的序列中， node的下一个节点叫作node的后继节点。


#### 先序遍历 ####

```javascript
// 先序遍历中找到节点的后继节点
function getSuccessorNode(node) {
    if (node.left) { // 有左侧节点直接返回左侧节点
        return node.left;
    } else if (node.right) { // 没有左侧节点有右侧节点直接返回右侧节点
        return node.right;
    } else {// 既没有左侧节点也没有右侧节点,找到所属祖先中第一个不是左节点的节点（属于左节点的都被输出过)，如果找不到说明该节点已经是最后节点
        let parent = node.parent;
        while (parent !== null && (parent.left !== node || parent.right === null)) {
            node = parent;
            parent = node.parent;
        }
        if (parent) {
            return parent.right;
        }
    }
}


// 先序遍历中找到节点的前驱节点
function getPrecursorNode(node) {
    if (node.parent) { // 不存在是第一个节点
        const parent = node.parent;
        if (parent.left === null || node === parent.left) { // 该节点是父节点的左节点或父节点不存在，遍历父节点
            return parent;
        } else { //该节点是父节点的右侧节点，找到父节点左侧树中的先序遍历最后遍历的节点
            return getFarRightNode(parent.left);
        }
    }
}
function getFarRightNode(node) {
    // 找到先序遍历最后遍历的节点
    while (node.left || node.right) {
        if (node.right) {
            node = node.right;
        } else {
            node = node.left;
        }
    }
    // console.log(node);
    return node;
}


```

#### 中序遍历 ####
```javascript
// 中序遍历中的找到节点的后继节点
function getSuccessorNode(node) {
    if (node.right) {
        // 找到右节点树中序最左边的节点
        node = node.right;
        while (node.left) {
            node = node.left;
        }
        // console.log(node);
        return node;
    } else {
        // 找到不一直是右节点的节点，知道根节点
        let curNode = node;
        while (curNode.parent !== null && curNode.parent.right === curNode) {
            curNode = curNode.parent;
        }
        if (curNode.parent) {
            return curNode.parent
        }
    }

}


// 中序遍历的中找到节点的前驱节点
function getPrecursorNode(node) {
    let parent = node.parent;
    if (node.left) {
        // 找到左侧节点树中中序遍历最右边的节点
        node = node.left;
        while (node.right) {
            node = node.right;
        }
        return node
    } else {
        // 祖先节点不是父节点的左侧节点的节点（知道根节点还没找到那就是自己）,找到就是给节点的父节点
        while (parent && node === parent.left) {
            parent = parent.parent
        }
        if (parent.parent) {
            return parent
        }
    }
}

```

#### 后序遍历 ####

```javascript
// 后序遍历中的找到节点的后继节点
function getSuccessorNode(node) {
    let parent = node.parent;
    if (!parent) {
        return;
    }
    // 如果该节点为父节点的右节点输出父节点 或父节点无右节点
    if (!parent.right || node === parent.right) {
        return parent;
    } else {
        // 如果该节点为父节点的左节点 找到从父节点触发的
        parent = parent.right;
        while (parent.left || parent.right) {
            if (parent.left) {
                parent = parent.left
            } else {
                parent = parent.right
            }
        }
        return parent;
    }

}


// 后序遍历的中找到节点的前驱节点
function getPrecursorNode(node) {
    // 如果有子节点,有右节点返回右节点，否则返回左节点
    if (node.right || node.left) {
        return node.right || node.left
    } else {
        // 没有子节点,找祖先节点中，该节点是父节点的右节点并且父节点含有左节点的节点
        let curNode = node;
        while (curNode.parent && (curNode.parent.left === curNode || curNode.parent.left === null)) {
            curNode = curNode.parent;
        }
        if (curNode.parent) {
            return curNode.parent.left
        }

    }
}


```




