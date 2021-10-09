performUnitOfWork 
```javascript
function performUnitOfWork(workInProgress) {
    beginWork(workInProgress);
    // console.log('workInProgress', workInProgress);
    // 如果创建完子fiber后又child,说明有大儿子节点
    if (workInProgress.child) {
        return workInProgress.child; // 返回太子
    }
    // 如果没有儿子处理兄弟
    while (workInProgress) {
        if (workInProgress.sibling) {
            // console.log('workInProgress.sibling', workInProgress.sibling);
            return workInProgress.sibling;
        }
        // 如果没有弟弟，找叔叔
        workInProgress = workInProgress.return;
    }
}

```
