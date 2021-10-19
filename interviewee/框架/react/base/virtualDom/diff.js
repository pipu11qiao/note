// 模拟 react diff算法 同层兄弟节点之间的策略
// 基于新的节点
function updateChildren(prevChildrenArr, nextChildrenArr) {
    var name;
    var lastIndex = 0;
    var nextIndex = 0;
    let oldMap = {};
    let newMap = {};
    prevChildrenArr.forEach((item,i)=>{
        oldMap[item] = i;
    });
    nextChildrenArr.forEach((item,i)=>{
        newMap[item] = i;
    });

    let len = nextChildrenArr.length;
    // 进行移动和新增
    for(let i = 0;i<len;i++){
        let mountIndex= i;
        let curKey = nextChildrenArr[i];
        if(oldMap[curKey]!== undefined ){
            let oldIndex = -1;
            oldIndex = oldMap[curKey];
            let isSame = true;//key和type都一样
            if(isSame){
                if(i<lastIndex){
                    operate.moveChild(curKey,i);
                }
            }else{
                // 先删除在新增
                operate.removeChild()
                operate.createChild(curKey,i);
            }
            lastIndex = Math.max(oldMap[curKey],lastIndex); //重点
        }else {
            // 新增
            operate.createChild(curKey,i);

        }
    }
    for (let i = 0,len = prevChildrenArr;i<len;i++) {
        if (newMap[prevChildrenArr[i]]){
            operate.removeChild(prevChildrenArr[i],i);
        }
    }
}

const operate = {
    // 移动节点
    moveChild: function (child, toIndex, lastIndex) {
        if (child._mountIndex < lastIndex) {
            console.log('move', child, toIndex, lastIndex);
        }
    },
// 创建节点
    createChild: function (child, mountIndex) {
        console.log('create', child, mountIndex);
    },
// 删除节点
    removeChild: function (child, removeIndex) {
        console.log('remove', child, removeIndex);
    },
}
