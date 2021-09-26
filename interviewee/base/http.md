* 1. 了解tcp中的三次握手和4次挥手机制么
* 2. 304,301,302,304怎么出现的，协商缓存和内容缓存


#### 1. 了解tcp中的三次握手和4次挥手机制么
tcp协议是传输层面向链接的安全、可靠、基于字节流的传输协议,三次握手的机制是保证能建立一个安全可靠的链接；

三次握手

* 第一次握手有客户端发起，想服务器发送报文，在报文中SYN是置1的,携带随机生成的报文序号1000
* 当服务端收到报文以后，知道了客户端要建立链接，于是服务器端向客户端发送确认的报文，SYN置为1，随机生成报文序号2000， ACK置为1，ack确认序号1001，完成第二次握手 当两次握手后客户端已经能够确认双方能够建立链接，但是服务器端不能确定客户端能够接受自己的信息，
* 所以需要客户端发起第三次请求，ACK置为1，ack 确认序号2001
通过三次请求，双方都确认了能够确定
  
四次挥手

* 当客户端要断开链接是，客户端想服务端发送标志位FIN置为1的报文，携带报文序号
* 服务器端接到客户端断开链接请求会立即，发送确认报文 ACK置为1，ack报文序号
* 在确定与客户端所有的相关的请求完成后，发送断开报文 FIN置为1,告知客户端可以断开
* 客户端接到请求，发送确定断开报文,告知服务端断开完成


