报文首部
空行（CR+LF）(carriage return, line feed)
报文主体

3.3 编码提升速率
常用的编码：
* gzip
* compress
* deflate（zlib）
* identity


分块传输编码

内容协商（content negotiation）

* accept
* accept-charset
* accept-encoding
* accept-languate

服务器驱动协商（Server-driven Negotiation）
客户端驱动协商（Agent-driven Negotiation）
透明协商（Transparent Negotiation）

状态码：

4.2 2XX 成功

200 OK

204 No Content 没有内容
206 Partial Conent

4.3 3XX 重定向

301 Moved Permanently 永久性重定向 永久性重定向。该状态码表示请求的资源已被分配了新的 URI，以后应使用资源现在所指的 URI。也就是说，如果已经把资源对应的
302 Found 临时性重定向。该状态码表示请求的资源已被分配了新的 URI，希望用户（本次）能使用新的 URI 访问。
303 See Other 该状态码表示由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源。
304 Not Modified 该状态码表示客户端发送附带条件的请求 2 时，服务器端允许请求访问资源，但未满足条件的情况。(2 附带条件的请求是指采用 GET 方法的请求报文中包含 If-Match，If-Modified-Since，If-None-Match，If-Range，If-Unmodified-Since)
307 临时重定向

4.4 4XX 客户端错误

400 Bad Request 该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。另外，浏览器会像 200 OK 一样对待该状态码。

401 Unauthorized 该状态码表示发送的请求需要有通过 HTTP 认证（BASIC
403 Forbidden 该状态码表明对请求资源的访问被服务器拒绝了。服务器端没有必要给出拒绝的详细理由，但如果想作说明的话，可以在实体的主体部分对原因进行描述，这样就能让用户看到了。
404 Not Found 未找到资源，服务器拒绝

4.5 5XX 服务器错误

500 该状态码表明服务器端在执行请求时发生了错误。也有可能是 Web 应用存在的 bug 或某些临时的故障。
503 Service unavailable 该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。如果事先得知解除以上状况需要的时间，最好写入


