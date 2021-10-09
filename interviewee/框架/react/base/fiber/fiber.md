
* 单进程调度

并发与并行
并行可以是并发，而并发不一定是并行，两种不能划等号, 并行一般需要物理层面的支持

#### 调度策略

* 0 先到先得 FCFS first come first served
* 1 轮转 公平的给每一个进程一定的执行官时间
* 2 最短进程优先 SPN shortest process next 
* 3 最短剩余时间 SRT shortess remaining time
* 4 最高响应比优先 HRRN
* 5 反馈法

#### js执行环境

javascript > style > layout > paint > composite

javascript 引擎和页面渲染引擎， GUI渲染和Javascript两者是互斥的

前端框架，解决这个问题的三个方向
* 1 优化每个任务，让它有多快就多快，挤压cpu运算量
* 2 快速响应用户，让用户觉得够快，不能阻塞用户的交互
* 3 尝试worker 多线程

react 对比virtualDom树，找出需要变动的节点，然后同步更新他们， 这个过程React称为Reconcilation 协调

React 通过fiber架构，让自己的reconcilation 过程变成可以被中断，适时的让出CPU执行权，除了可以让浏览器及时的相应用户的交互，还有其他好处：

* 与其一次性操作大量的Dom节点，分批延时的对DOM进行操作可以得到更好的用户体验。
* 给浏览器一点喘息的机会，他会对代码进行编译优化，及进行热代码优化，或者对reflow进行修正

## 何为Fiber
对于react可以从两个角度理解
#### 1. 一种流程控制原语 
Fiber 协程 

 coroutine generator

 1. 浏览器没有抢占的条件, 所以React只能用让出机制?
 2. 怎么确定有高优先任务要处理，即什么时候让出？ 
 3. React 那为什么不使用 Generator？

##### 合作市调度

向浏览器申请时间片， 执行，返回控制权

全屏自律

##### requestIdleCallback 

浏览器在一帧中可能执行的任务，

* 处理用户输入事件 
* javascript 执行
* requestAnimation 调用
* 布局 layout
* 绘制 paint

##### 太麻烦

#### 2. 一个执行单元

将它视作一个执行单元，每次执行完一个'执行单元', React 就会检查现在还剩多少时间，如果没有时间就将控制权让出去.

workLoop 的工作大概猜到了，它会从更新队列(updateQueue)中弹出更新任务来执行，每执行完一个‘执行单元‘，就检查一下剩余时间是否充足，如果充足就进行执行下一个执行单元，反之则停止执行，保存现场，等下一次有执行权时恢复:

### React 的 Fiber 改造

1. 数据结构调整 递归改链表描述
2. 两个阶段拆分
* 协调阶段 可以认为是diff阶段，可以被中断。这个阶段会找出所有节点的变更，例如节点的新增、删除、属性变更等等，这些变更React称之为副总用Effect，以下声明周期钩子会在协调阶段调用：
    * constructor
    * componentWillMount 飞起
    * componentWillReceiveProps 
    * static getDerivedStateFromProps
    * should ComponentsUpdate
    * componentWillUpdate
    * render
* 提交阶段 将上一个阶段计算出来的需要处理的副作用effects一次性执行。这个阶段必须同步执行，不能被打断。 提交阶段被执行
  
* getSnapshotBeforeUpdate()
* componentDidMount
* componentDidUpdate
* componentWillUnmount

需要注意的是：因为协调阶段可能被中断、恢复，甚至重做，⚠️React 协调阶段的生命周期钩子可能会被调用多次!, 例如 componentWillMount 可能会被调用两次。
因此建议 协调阶段的生命周期钩子不要包含副作用. 索性 React 就废弃了这部分可能包含副作用的生命周期方法，例如componentWillMount、componentWillUpdate. v17后我们就不能再用它们了, 所以现有的应用应该尽快迁移.

3. Reconcilation

4. 双缓冲




