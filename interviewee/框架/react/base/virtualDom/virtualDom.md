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
