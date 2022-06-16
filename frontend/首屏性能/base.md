
如果是服务端渲染 html body渲染完成表示首屏时间， performance对象来计算首屏时间


window.onload = function() {
  var timing  = performance.timing;
  console.log('准备新页面时间耗时: ' + timing.fetchStart - timing.navigationStart);
  console.log('redirect 重定向耗时: ' + timing.redirectEnd  - timing.redirectStart);
  console.log('Appcache 耗时: ' + timing.domainLookupStart  - timing.fetchStart);
  console.log('unload 前文档耗时: ' + timing.unloadEventEnd - timing.unloadEventStart);
  console.log('DNS 查询耗时: ' + timing.domainLookupEnd - timing.domainLookupStart);
  console.log('TCP连接耗时: ' + timing.connectEnd - timing.connectStart);
  console.log('request请求耗时: ' + timing.responseEnd - timing.requestStart);
  console.log('白屏时间: ' + timing.responseStart - timing.navigationStart);
  console.log('请求完毕至DOM加载: ' + timing.domInteractive - timing.responseEnd);
  console.log('解释dom树耗时: ' + timing.domComplete - timing.domInteractive);
  console.log('从开始至load总耗时: ' + timing.loadEventEnd - timing.navigationStart);
}


FMP spa的页面body是空的，浏览器需要先加载js，然后通过js来渲染页面的内容。如何计算FMP,



### 一些基本的时间概念
* DOMContentLoaded The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.


DOMContentLoaded 和 load 顺序
Therefore, the order of execution will be
1. DOMContentLoaded event listeners of window in the capture phase
2. DOMContentLoaded event listeners of document
3. DOMContentLoaded event listeners of window in the bubble phase
4. load event listeners (including onload event handler) of window

### Resource Timing

分析静态资源加载情况
调用 performance.getEntriesByType('resource') 方法获取页面中资源加载的数据，该方法返回每个资源项加载数据包括

属性 | 描述
entryType | EntryType的类型resource
name | resources URL
startTime | 在资源提取开始的时间
duration | 整个流程消耗的时间=responseEnd-startTime
initiatorType | 发起资源请求的类型
nextHopProtocol | 获取资源的网络协议的字符串
workerStart | 如果Service Worker线程已在运行,则在调用FetchEvent之前立即返回DOMHighResTimeStamp，如果尚未运行，则在启动Service Worker线程之前立即返回DOMHighResTimeStamp。 如果资源未被Service Worker拦截，则该属性将始终返回0
redirectStart | 初始重定向的开始获取时间
redirectEnd | 紧接在收到最后一次重定向响应的最后一个字节后
fetchStart | 拉取资源开始时间，紧接在浏览器开始获取资源之前
domainLookupStart | 紧接在浏览器启动资源的域名查找之前
domainLookupEnd | 表示浏览器完成资源的域名查找后的时间
connectStart | 开始TCP连接：紧接在浏览器检索资源，开始建立与服务器的连接之前
connectEnd | 结束TCP连接：紧接在浏览器完成与服务器的连接以检索资源之后
secureConnectStart | 开始SSL连接：紧接在浏览器启动握手过程之前，以保护当前连接
requestStart | 紧接在浏览器开始从服务器请求资源之前
responseStart | 紧接在浏览器收到服务器响应的第一个字节后
responseEnd | 紧接在浏览器收到资源的最后一个字节之后或紧接在传输连接关闭之前，以先到者为准
secureConnectionStart | SSL / 初始连接时间
transferSize | 表示获取资源的大小（以八位字节为单位）的数字。 包括响应头字段和响应payload body的大小。
encodedBodySize | 在删除任何应用的内容编码之前，从payload body的提取（HTTP或高速缓存）接收的大小（以八位字节为单位）的number
decodedBodySize | 在删除任何应用的内容编码之后，从消息正文( message body )的提取（HTTP或缓存）接收的大小（以八位字节为单位）的number
serverTiming | 包含服务器时序度量( timing metrics )的PerformanceServerTiming 条目数组，可用于服务器传数据到前端

其中 initiatorType 包括

PerformanceResourceTiming.initiatorType 
已知可获取类型如下：

类型 | 描述
css | css资源类型
img | 图片请求类型
scrpit | scrpit脚本请求类型
xmlhttprequest | 接口请求类型
link | link请求类型


css 加载不会阻塞DOM树的解析
css 记载会阻塞DOM树的渲染
Css 加载会阻塞后面js语句的执行
因此，为了避免让用户看到长时间的白屏时间，我们应该尽可能的提高css加载速度，比如可以使用以下几种方法:

