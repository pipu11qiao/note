// vnode.js

虚拟DOM就是用JS来描述一个真实的DOM节点。而在Vue中就存在了一个VNode类，通过这个类，我们就可以实例化出不同类型的虚拟DOM节点
```javascript
// 源码位置：src/core/vdom/vnode.js
export default class VNode {
  constructor (...) {
    this.tag = tag                                /*当前节点的标签名*/
    this.data = data        /*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型*/
    this.children = children  /*当前节点的子节点，是一个数组*/
    this.text = text     /*当前节点的文本*/
      // ......
    this.isStatic = false         /*静态节点标志*/
    this.isRootInsert = true      /*是否作为跟节点插入*/
    this.isComment = false             /*是否为注释节点*/
    this.isCloned = false           /*是否为克隆节点*/
    this.isOnce = false                /*是否有v-once指令*/
  }
}
```
