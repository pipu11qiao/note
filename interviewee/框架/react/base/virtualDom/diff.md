
##### diff 策略

1. web UI 中的DOM节点跨层级的移动操作特别少，可以忽略不计
2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构
3. 对于同一层级的一组子节点，他们可以通过唯一id进行区分

基于以上三个策略，react分别对tree diff, component diff 以及 element diff 进行算法优化。

* tree diff
* component diff
* element diff

#### tree diff

分层比较，两棵树只会对同一层次的节点进行比较

```javascript
updateChildren: function(nextNestedChildrenElements, transaction, context) {
  updateDepth++;
  var errorThrown = true;
  try {
    this._updateChildren(nextNestedChildrenElements, transaction, context);
    errorThrown = false;
  } finally {
    updateDepth--;
    if (!updateDepth) {
      if (errorThrown) {
        clearQueue();
      } else {
        processQueue();
      }
    }
  }
}
```
React 官方建议不要进行 DOM 节点跨层级的操作。

#### component diff

React 是基于组件构建应用的，对于组件间的比较所采取的策略也是简洁高效的

* 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree
* 如果不是，则将该组件判断为dirty component,从而替换整个组件下的所有节点
* 对于同一类型的组件，有可能其virtualDom 没有任何变化，如果能够确切的知道这点那可以节省大量的diff运算时间，因此React允许用户通过shouldComponentUpdate 来判断该组件是偶发需要进行diff

#### element diff

当节点处于同一层级时，React diff 提供了三种节点操作，分别为： INSERT_MARKUP MOVE_EXISTING REMOVE_NODE

```javascript
function enqueueInsertMarkup(parentInst, markup, toIndex) {
  updateQueue.push({
    parentInst: parentInst,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
    markupIndex: markupQueue.push(markup) - 1,
    content: null,
    fromIndex: null,
    toIndex: toIndex,
  });
}

function enqueueMove(parentInst, fromIndex, toIndex) {
  updateQueue.push({
    parentInst: parentInst,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
    markupIndex: null,
    content: null,
    fromIndex: fromIndex,
    toIndex: toIndex,
  });
}

function enqueueRemove(parentInst, fromIndex) {
  updateQueue.push({
    parentInst: parentInst,
    parentNode: null,
    type: ReactMultiChildUpdateTypes.REMOVE_NODE,
    markupIndex: null,
    content: null,
    fromIndex: fromIndex,
    toIndex: null,
  });
}
```

通过添加key来同层级查找相同的节点， 

重点是 新的元素的mountIndex 小于老元素的

对新集合的节点进行循环遍历,for(name in nextChildren), 通过key在老集合中比对，是否有相同的节点，如果有相同的节点，进行移动操作。在移动前需要通过比对新老节点的index来判断是否需要移动，if(child,_mountIndex < lastIndex 则进行节点移动，否则不进行该操作。这是一种顺序优化手段，，lastIndex 一直在更新，表示访问过的节点在老集合中的最后位置，如果新集合中当前访问的节点比lastIndex打，说明当前访问的节点比上一个新节点在老index靠前，需要移动才不影响上一个节点的index

