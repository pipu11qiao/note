虚拟dom表示真实dom的js对象

优点

* 性能高
* 处理兼容

数据结构

```javascript
import React from 'react';

const vDom = (
    <div id="A1" key="A1">
        <div id="B1" key="B1">B1</div>
        <div id="B2" key="B2">B2</div>
    </div>
)
console.log('vDom', vDom);

```

数据结构

```json
{
  "$$typeof": "element",
  "type": "div",
  "key": "A1",
  "ref": null,
  "props": {
    "id": "A1",
    "children": [
      {
        "type": "div",
        "key": "B1",
        "ref": null,
        "props": {
          "id": "B1",
          "children": "B1"
        },
        "_owner": null
      },
      {
        "type": "div",
        "key": "B2",
        "ref": null,
        "props": {
          "id": "B2",
          "children": "B2"
        },
        "_owner": null
      }
    ]
  },
  "_owner": null
}

```

就是通过createElement 方法得到的


#### Virtual DOM

实际也是操作Dom树进行渲染更新,但是它只是针对修改部分进行局部渲染,将影响降到最低,虽然实现方式各有不同,但是大体步骤如下:

用Javascript对象结构描述Dom树结构,然后用它来构建真正的Dom树插入文档
当状态发生改变之后,重新构造新的Javascript对象结构和旧的作对比得出差异
针对差异之处进行重新构建更新视图
无非就是利用Js做一层映射比较,操作简单并且速度远远高于直接比较Dom树

* createElement element 数据结构

createElement('div',{id:'root',style:"color:red"},[
    createElement("h1", { style: "color: blue" }, ["Tittle1"]),
])

#### diff 算法


// 4. 比较两棵虚拟DOM树的不同
const patches = diff(tree, newTree);

// 5. 在真正的DOM元素上应用变更
patch(root, patches);

#### tree diff
传统 diff 算法的复杂度为 O(n^3)，但是一般Dom跨层级的情况是非常少见的。所以React 只针对同层级Dom节点做比较，将 O(n^3) 复杂度的问题转换成 O(n) 复杂度的问题。

### component diff
某个组件发生变化,会导致自其从上往下整体替换
同一类型组件会进行Virtual DOM进行比较
React提供了一个shouldComponentUpdate决定是否更新
尽可能将动态组件往底层节点迁移,有利于提高性能

#### element diff
元素操作无非就是几种,我们定义几个类型做状态标记

const REPLACE = "replace";
const REORDER = "reorder";
const PROPS = "props";
const TEXT = "text";
const NOKEY = "no_key"

export {
REPLACE,
REORDER,
PROPS,
TEXT,
NOKEY
}
其中NOKEY就是专门给那些没有定义key的组件做默认,React对同一层级的同组子节点，添加唯一 key 进行区分进行位移而不是直接替换,这点对于整体性能尤为关键

* 提高开发效率
* 提升性能
* 跨浏览器兼容
* 跨平台兼容
