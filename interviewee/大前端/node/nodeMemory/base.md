v8 的垃圾回收机制与内存限制

> Node选择了V8引擎，基于事件驱动、非阻塞I/O模型。
 
v8 的内存限制

64位系统约为1.4GB，32位系统约为0.7GB，在这样限制下，将会导致Node无法直接操作大内存对象，比如无法将一个2GB的文件读入内存中进行字符串分析处理，即使物理内存有32GB，这样在单个Node进程的情况下，计算机的内存资源无法得到充足的使用。要知晓V8为何限制了内存的用量，则需要回归到V8在内存使用上的策略。

v8的对象分配

在v8中，所有的js对象都是通过堆来进行分配的

```bash
 node
 process.memoryUsage();
{
  rss: 18702336,
  heapTotal: 10295296,
  heapUsed:5409936
}
```

JS声明变量并赋值时，所使用对象的内存就分配在堆中。如果已申请的堆空闲内存不够分配新的对象，将继续申请堆内存，直到对的大小超过V8的限制为止。

至于V8为何要限制堆的大小，表层原因：V8最初为浏览器而设计，不太可能遇到用大量内存的场景。深层原因：V8的垃圾回收机制的限制。官方说法，以1.5GB的垃圾回收堆内存为例，V8做一次小的垃圾回收需要50毫秒以上，做一次非增量式的垃圾回收甚至要1秒以上。这是垃圾回收中引起JS线程暂停执行的时间，在这样时间花销下，应用的性能和响应能力都会直线下降。

V8提供选择来调整内存大小的配置，需要在初始化时候配置生效，遇到Node无法分配足够内存给JS对象的情况，可以用如下办法来放宽V8默认内存限制。避免执行过程内存用的过多导致崩溃
node --max-old-space-size=1700 index.js
node --max-new-space-size=1024 index.js

v8 内存限制
max-old-space-size
max-new-space-size

v8 的垃圾回收机制
v8垃圾回收策略主要基于分代式垃圾回收机制，现代的垃圾回收算法中按对象的存活时间将内存的垃圾回收进行不同的分代，然后分别对不同的分代的内存施以更高效的算法

v8的内存分代

分为新生代和老生代，新生代的对象为存活时间较短的对象，老生代的对象为存活时间较长或常驻内存的对象，

```javascript
// a multiple of Page::kPageSize
`#`if defined(V8_TARGET_ARCH_X64)
`#`define LUMP_OF_MEMORY ( 2 * MB)
    code_range_size_(512*MB),
`#`else
`#`define LUMP_OF_MEMORY MB
    code_range_size_(0),
`#`endif
`#`if defined(ANDROID)
    reserved_semispace_size_(4 * Max(LUMP_OF_MEMORY, Page::kPageSize)),
    max_semispace_size_(4 * Max(LUMP_OF_MEMORY, Page::kPageSize)),
    initial_semispace_size_(Page::kPageSize),
    max_old_generation_size_(192*MB),
    max_executable_size_(max_old_generation_size_),
`#`else
    reserved_semispace_size_(8 * Max(LUMP_OF_MEMORY, Page::kPageSize)),
    max_semispace_size_(8 * Max(LUMP_OF_MEMORY, Page::kPageSize)),
    initial_semispace_size_(Page::kPageSize),
    max_old_generation_size_(700ul * LUMP_OF_MEMORY),
    max_executable_size_(256l * LUMP_OF_MEMORY),
`#`endif
```
新生代内存由两个reserved_semispace_size_所构成，最大值在64位系统和32位系统上分别为32MB和16MB。
V8堆内存的最大保留空间可以从下面代码中看出来，其公式为4 * reserved_semispace_size_ + max_old_generation_size_:
// Returns the maxmum amount of memory reserved for the heap. For
// the young generation, we reserve 4 times the amount needed for a
// semi space. The young generation consists of two semi spaces and
// we reserve twice the amount need for those in order to ensure
// that new space can be aligned to its size
intptr_tMaxReserved() {
return 4 * reserved_semispace_size_ + max_old_generation_size_;
}

此，默认情况下，V8堆内存的最大值在64位系统上为1464MB，32位系统上则为732MB。这个数值可以解释为何在64位系统下只能使用约1.4GB内存，在32位系统下只能使用约0.7GB内存。
* scavenge 算法
  在分代基础上，新生代中的对象主要通过Scavenge算法进行垃圾回收。在Scavenge的具体实现中，主要采用了Cheney算法

Cheney算法是一种采用复制的方式实现的垃圾回收算法。它将堆内存一分为二，每一部分空间称为semispace。在这两个semispace空间中，只有一个处于使用中，另一个处于闲置状态。处于使用状态的semispace空间称为From空间，处于闲置状态的空间称为To空间。当我们分配对象时，先是在From空间中进行分配。当开始进行垃圾回收时，会检查From空间中的存活对象，这些存活对象将被复制到To空间中，而非存活对象占用的空间将会被释放。完成复制后，From空间和To空间的角色发生兑换。简而言之，在垃圾回收过程中，就是通过将存活对象在两个semispace空间之间进行复制。

Scavenge的缺点是只能使用堆内存中的一半，这是由划分空间和复制机制所决定的。但Scavenge由于只复制存活的对象，并且对于生命周期短的场景存活对象只占少部分，所以它在时间效率上有优异的表现。

由于Scavenge是典型的牺牲空间换取时间的算法，所以无法大规模地应用到所有的垃圾回收中。但可以发现，Scavenge非常适合应用在新生代中，因为新生代中对象的生命周期较短，恰恰适合这个算法。

实际使用的堆内存是新生代的两个semispace空间大小和老生代所用内存大小之和。当一个对象经过多次复制依然存活时，它将会被认为是生命周期较长的对象。这种较长生命周期的对象随后会被移动到老生代中，采用新的算法进行管理。对象从新生代中移动到老生代中的过程称为晋升。

新生代适合scavenge 算法，重复使用的对象会晋升到老生代
From To

对象晋升的条件主要有两个，一个是该对象是否经历过scavenge回收， 一个是To空间的内存占用比超过限制

Mark-Sweep & Mark-Compact

Mark-Sweep最大的问题是在进行一次标记清除回收后，内存空间会出现不连续的状态。这种内存碎片会对后续的内存分配造成问题，因为很可能出现需要分配一个大对象的情况，这时所有的碎片空间都无法完成此次分配，就会提前触发垃圾回收，而这次回收是不必要的。

为了解决Mark-Sweep的内存碎片问题，Mark-Compact被提出来。Mark-Compact是标记整理的意思，是在Mark-Sweep的基础上演变而来的。它们的差别在于对象在标记为死亡后，在整理的过程中，将活着的对象往一端移动，移动完成后，直接清理掉边界外的内存。图5-7为Mark-Compact完成标记并移动存活对象后的示意图，白色格子为存活对象，深色格子为死亡对象，浅色格子为存活对象移动后留下的空洞

回收算法	Mark-Sweep	Mark-Compact	Scavenge
速度	中等	最慢	最快
空间开销	少（有碎片）	少（无碎片）	双倍空间（无碎片）
是否移动对象	否	是	是

incremental marking

为了避免出现js应用逻辑与垃圾回收器看到的不一致的情况，垃圾回收的3种基本算法都需要将应用逻辑暂停下来，待执行完垃圾回收后再恢复执行应用逻辑，这种行为被称为“全停顿”（stop-the-world）。在V8的分代式垃圾回收中，一次小垃圾回收只收集新生代，由于新生代默认配置得较小，且其中存活对象通常较少，所以即便它是全停顿的影响也不大。但V8的老生代通常配置得较大，且存活对象较多，全堆垃圾回收（full垃圾回收）的标记、清理、整理等动作造成的停顿就会比较可怕，需要设法改善。
为了降低全堆垃圾回收带来的停顿时间，V8先从标记阶段入手，将原本要一口气停顿完成的动作改为增量标记（incremental marking），也就是拆分为许多小“步进”，每做完一“步进”就让js应用逻辑执行一小会，垃圾回收与应用逻辑交替执行直到标记阶段完成。
Alt text

V8在经过增量标记的改进后，垃圾回收的最大停顿时间可以减少到原本的1/6左右。
V8后续还引入了延迟清理（lazy sweeping）与增量式整理（incremental compaction），让清理与整理动作也变成增量式的。同时还计划引入并行标记与并行清理，进一步利用多核性能降低每次停顿的时间。

从V8的自动垃圾回收机制的设计角度可以看到，V8对内存使用进行限制的缘由。新生代设计为一个较小的内存空间是合理的，而老生代空间过大对于垃圾回收并无特别意义。V8对内存限制的设置对于Chrome浏览器这种每个选项卡页面使用一个V8实例而言，内存的使用是绰绰有余，对于Node编写的服务器端来说，内存限制也并不影响正常场景下的使用。但是对于V8的垃圾回收特点和js在单线程上的执行情况，垃圾回收是影响性能的因素之一。想要高性能执行效率，需要注意让垃圾回收尽量少地进行，尤其是全堆垃圾回收。
#### 高并发
以Web服务器中的会话实现为例，一般通过内存来存储，但在访问量大的时候会导致老生代中的存活对象骤增，不仅造成清理/整理过程费时，还会造成内存紧张，甚至溢出

#### 高效实用内存

* 作用域
  foo()函数在每次被调用时会创建对应的作用域，函数执行结束后，该作用域将会销毁。同时作用域中声明的局部变量分配在该作用域上，随作用域的销毁而销毁。只被局部变量引用的对象存活周期较短。在这个示例中，由于对象非常小，将会分配在新生代中的From空间中。在作用域释放后，局部变量local失效，其引用的对象将会在下次垃圾回收时被释放。
* 释放变量

闭包

#### 内存指标

process.memoryUsage()

rss 是resident set size 的缩写，即进程的常驻内存部分， 进程的常驻内存部分， rss 交换区 swap 文件系统 filesystem 
heapTotal heapUsed

```javascript
var showMem = function() {
  var mem = process.memoryUsage();
  var format = function(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };
  console.log('Process: heapTotal ' + format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
  console.log('---------------------------------------------------------------------------');
  console.log(format(os.totalmem()));
  console.log(format(os.freemem()));

};


```


#### 内存泄漏


* 缓存
* 队列消费不及时
* 作用域未释放

任何拿内存当缓存的操作都要慎用,即使要做，缓存要加时间和数量限制

将缓存放在进程外解决

* redis 
* memcached

关注队列状态

内存泄漏的另一个情况则是队列。在js中可以通过队列（数组对象）来完成许多特殊的需求，比如Bagpipe。队列在消费者-生产者模型中经常充当中间产物。在大多数应用场景下，消费的速度远大于生产的速度，内存泄漏不易产生，但是一旦消费速度低于生产速度，将会形成堆积。

举个例子，有的应用会收集日志。如果欠缺考虑，也许会采用数据库来记录日志。日志通常会是海量的，数据库构建在文件系统之上，写入效率远远低于文件直接写入，于是会形成数据库写入操作的堆积，而js相关作用域也不会得到释放，内存占用不会回落，从而出现内存泄漏。

遇到这种场景，表层解决方案是换用消费速度更高的技术。在日志收集的案例中，换用文件写入日志的方式会更高效。需要注意的是，如果生产速度因为某些原因突然激增，或者消费速度因为突然的系统故障降低，内存泄漏还是可能出现的。

深度的解决方案应该是监控队列的长度，一旦堆积，应当通过监控系统产生报警并通知相关人员。另一个解决方案是任意异步调用都应该包含超时机制，一旦在限定的时间内未完成响应，通过回调函数传递超时异常，使得任意异步调用的回调都具备可控的响应时间，给消费速度一个下限值。

对于Bagpipe而言，它提供了超时模式和拒绝模式。启用超时模式时，调用加入到队列中就开始计时，超时就直接响应一个超时错误。启用拒绝模式时，当队列拥塞时，新到来的调用会直接响应拥塞错误。这两种模式都能够有效地防止队列拥塞导致的内存泄漏问题。

#### 内存泄漏排查

有一些常用的工具可以来定位node应用的内存泄漏

v8-profiler：它可以用于对V8堆内存抓取快照和对CPU进行分析；
node-heapdump：它允许对V8堆内存抓取快照，用于事后分析；
node-mtrace：它使用GCC的mtrace工具来分析堆的使用；
dtrace：有完善的dtrace工具用来分析内存泄漏；
node-memwatch：来自Mozilla贡献的模块，采用WTFPL许可发布。

#### 总结

Node将JavaScript的主要应用场景扩展到了服务器端，相应要考虑的细节也与浏览器端不同，需要更严谨地为每一份资源作出安排。总的来说，内存在Node中不能随心所欲地使用。


v8-profiler：它可以用于对V8堆内存抓取快照和对CPU进行分析；
node-heapdump：它允许对V8堆内存抓取快照，用于事后分析；
node-mtrace：它使用GCC的mtrace工具来分析堆的使用；
dtrace：有完善的dtrace工具用来分析内存泄漏；
node-memwatch：来自Mozilla贡献的模块，采用WTFPL许可发布。


* node-heapdump

  想要了解node-heapdump对内存泄漏进行排查的方式，需要先构造如下一份包含内存泄漏的代码示例，并将其存为server.js文件：

    ```js
    var leakArray = [];
    var leak = function() {
      leakArray.push("leak" + Math.random());
    };
    http.createServer(function (req, res) {
      leak();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World\n');
    }).listen(1337);
    console.log('Server running at http://127.0.0.1:1337/');
    ```

  在上面这段代码中，每次访问服务进程都将引起leakArray数组中的元素增加，而且得不到回收。我们可以用curl工具输入http://127.0.0.1:1337/命令来模拟用户访问。

  * 安装node-heapdump

    ```js
    npm install heapdump
    ```

  * 引入node-heapdump

    ```js
    var heapdump = require('heapdump');
    ```

    引入node-heapdump后，访问多次，leakArray就会具备大量的元素。这个时候我们通过向服务进程发送SIGUSR2信号，让node-heapdump抓拍一份堆内存的快照。发送信号的命令如下：

    ```js
    kill -USR2 <pid>
    ```

    这份抓取的快照将会在文件目录下以heapdump-<sec>.<usec>.heapsnapshot的格式存放。这是一份较大的JSON文件，需要通过chrome的开发者工具打开查看。

    在chrome的开发者工具中选中Profiles面板，右击该文件后，从弹出的快捷菜单中选择Load...选项，打开刚才的快照文件，就可以查看堆内存中的详细信息。

* node-memwatch

  准备一份内存泄漏代码：

    ```js
    var memwatch = require('memwatch');
    memwatch.on('leak', function(info) {
      console.log('leak:');
      console.log(info);
    });
    memwatch.on('stats', function(stats) {
      console.log('stats:');
      console.log(stats);
    });
    var http = require('http');
    var leakArray = [];
    var leak = function() {
      leakArray.push("leak" + Math.random());
    };
    http.createServer(function(req, res) {
      leak();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World\n');
    }).listen(1337);
    console.log('Server running at http://127.0.0.1:1337/');
    ```

  * stats事件

    在进程中使用node-memwatch之后，每次进行全堆垃圾回收时，将会触发一次stats事件，这个事件将会传递内存的统计信息。在对上述代码创建的服务进程进行访问时，某次stats事件打印的数据如下所示，其中每项的意义卸载注释中：

    ```js
    stats:
    {
      num_full_gc: 4, // 第几次全堆垃圾回收
      num_inc_gc: 23, // 第几次增量垃圾回收
      heap_compactions: 4, // 第几次对老生代进行整理
      usage_trend: 0, // 使用趋势
      estimated_base: 7152944, // 预估基数
      current_base: 7152944, // 当前基数
      min: 6720776, // 最小
      max: 7152944 // 最大
    }
    ```

    在这些数据中，num_full_gc和num_inc_gc比较直观地反应了垃圾回收的情况。

  * leak事件

    如果经过连续5次垃圾回收后，内存仍然没有被释放，这意味着有内存泄漏的产生，node-memwatch会触发一个leak事件。某次leak事件得到的数据如下所示：

    ```js
    leak:
    {
      start: Mon Oct 07 2013 13:46:27 GMT+0800 (CST),
      end: Mon Oct 07 2013 13:54:40 GMT+0800 (CST),
      growth: 6222576,
      reason: 'heap growth over 5 consecutive GCs (8m 13s) - 43.33 mb/hr'
    }
    ```

    这个数据能显示5次垃圾回收的过程中内存增长了多少。

  * 堆内存比较

    最终得到的leak事件的信息只能告知我们应用中存在内存泄漏，具体问题产生在何处还需要从V8的堆内存上定位。node-memwatch提供了抓取快照和比较快照的功能，它能够比较堆上对象的名称和分配数量，从而找到导致内存泄漏的元凶。

    下面为一段导致内存泄漏的代码，这是通过node-memwatch获取堆内存差异结果的示例：

    ```js
    var memwatch = require('memwatch');
    var leakArray = [];
    var leak = function() {
      leakArray.push("leak" + Math.random());
    };
    
    // Take first snapshot
    var hd = new memwatch.HeapDiff();
    
    for (var i = 0; i < 10000; i++) {
      leak();
    }

    // Take the second snapshot and compute the diff
    var diff = hd.end();
    console.log(JSON.stringify(diff, null, 2));
    ```

    执行node diff.js，得到的输出结果如下所示：

    ```js
    {
      "before": {
        "nodes": 11719,
        "time": "2013-10-07T06:32:07.000Z",
        "size_bytes": 1493304,
        "size": "1.42 mb"
      },
      "after": {
        "nodes": 31618,
        "time": "2013-10-07T06:32:07.000Z",
        "size_bytes": 2684864,
        "size": "2.56 mb"
      },
      "change": {
        "size_bytes": 1191560,
        "size": "1.14 mb",
        "freed_nodes": 129,
        "allocated_nodes": 20028,
        "details": [
          {
            "what": "Array",
            "size_bytes": 323720,
            "size": "316.13 kb",
            "+": 15,
            "-": 65
          },
          {
            "what": "Code",
            "size_bytes": -10944,
            "size": "-10.69 kb",
            "+": 8,
            "-": 28
          },
          {
            "what": "String",
            "size_bytes": 879424,
            "size": "858.81 kb",
            "+": 20001,
            "-": 1
          }
        ]
      }
    }
    ```

  在上面的输出结果中，主要关注change节点下的freed_nodes和allocated_nodes，他们记录了释放的，它们记录了释放的节点数量和分配的节点数量。这里由于有内存泄漏，分配的节点数量远远多于释放的节点数量。在details下可以看到具体每种类型的分配和释放数量，主要问题展现在下面这段输出中：

  ```js
  {
    "what": "String",
    "size_bytes": 879424,
    "size": "858.51 kb",
    "+": 20001,
    "-": 1
  }
  ```

  在上述代码中，加号和减号分别表示分配和释放的字符串对象数量。可以通过上面的输出结果猜测到，有大量的字符串没有被回收。

* 小结

  排查内存泄漏的原因主要通过对堆内存进行分析而找到。node-heapdump和node-memwatch各有所长。

## 大内存应用

在Node中，不可避免地还是会存在操作大文件的场景。由于Node的内存限制，不过Node提供了stream模块用于处理大文件。

stream模块是Node的原生模块，直接引用即可。stream继承自EventEmitter，具备基本的自定义事件功能，同时抽象出标准的事件和方法。它分可读和可写两种。Node中的大多数模块都有stream的应用，比如fs的createReadStream()和createWriteStream()方法可以分别用于创建文件的可读流与可写流，process模块中的stdin和stdout则分别是可读流和可写流的示例。

由于V8的内存限制，我们无法通过fs.readFile()和fs.writeFile()直接进行大文件的操作，而改用fs.createReadStream()和fs.createWriteStream()方法通过流的方式实现对大文件的操作。下面的代码展示了如何读取一个文件，然后将数据写入到另一个文件的过程：

```js
var reader = fs.createReadStream('in.txt');
var writer = fs.createWriteStream('out.txt');
reader.on('data', function (chunk) {
  writer.write(chunk);
});
reader.on('end', function () {
  writer.end();
});


  

