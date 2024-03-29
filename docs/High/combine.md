---
title: 组合拳
order: 6
---

## 输入一个URL到页面过程中发生了什么？
1. 首先在浏览器中输入URL
2. 查找缓存：浏览器先查看浏览器缓存-系统缓存-路由缓存中是否有该地址页面，如果有则显示页面内容。如果没有则进行下一步。
3. 浏览器缓存：浏览器会记录DNS一段时间，因此，只是第一个地方解析DNS请求；
    - 操作系统缓存:如果在浏览器缓存中不包含这个记录，则会使系统调用操作系统， 获取操作系统的记录(保存最近的DNS查询缓存)；
    - 路由器缓存：如果上述两个步骤均不能成功获取DNS记录，继续搜索路由器缓存；
    - ISP缓存：若上述均失败，继续向ISP搜索。
    - DNS域名解析：浏览器向DNS服务器发起请求，解析该URL中的域名对应的IP地址。DNS服务器是基于UDP的，因此会用到UDP协议。
4. 建立TCP连接：解析出IP地址后，根据IP地址和默认80端口，和服务器建立TCP连接
5. 发起HTTP请求：浏览器发起读取文件的HTTP请求，，该请求报文作为TCP三次握手的第三次数据发送给服务器
6. 服务器响应请求并返回结果：服务器对浏览器请求做出响应，并把对应的html文件发送给浏览器
7. 关闭TCP连接：通过四次挥手释放TCP连接
8. 浏览器渲染：客户端（浏览器）解析HTML内容并渲染出来，浏览器接收到数据包后的解析流程为：
    - 构建DOM树：词法分析然后解析成DOM树（dom tree），是由dom元素及属性节点组成，树的根是document对象
    - 构建CSS规则树：生成CSS规则树（CSS Rule Tree）
    - 构建render树：Web浏览器将DOM和CSSOM结合，并构建出渲染树（render tree）
    - 布局（Layout）：计算出每个节点在屏幕中的位置
    - 绘制（Painting）：即遍历render树，并使用UI后端层绘制每个节点。

### dns解析
DNS( Domain Name System)是“域名系统”的英文缩写，是一种组织成域层次结构的计算机和网络服务命名系统，它用于TCP/IP网络，它所提供的服务是用来将主机名和域名转换为IP地址的工作。

1. 在浏览器中输入www  . qq  .com 域名，操作系统会先检查自己本地的hosts文件是否有这个网址映射关系，如果有，就先调用这个IP地址映射，完成域名解析。
2. 如果hosts里没有这个域名的映射，则查找本地DNS解析器缓存，是否有这个网址映射关系，如果有，直接返回，完成域名解析。 
3. 如果hosts与本地DNS解析器缓存都没有相应的网址映射关系，首先会找TCP/ip参数中设置的首选DNS服务器，在此我们叫它本地DNS服务器，此服务器收到查询时，如果要查询的域名，包含在本地配置区域资源中，则返回解析结果给客户机，完成域名解析，此解析具有权威性。 
4. 如果要查询的域名，不由本地DNS服务器区域解析，但该服务器已缓存了此网址映射关系，则调用这个IP地址映射，完成域名解析，此解析不具有权威性。 
5. 如果本地DNS服务器本地区域文件与缓存解析都失效，则根据本地DNS服务器的设置（是否设置转发器）进行查询，如果未用转发模式，本地DNS就把请求发至13台根DNS，根DNS服务器收到请求后会判断这个域名(.com)是谁来授权管理，并会返回一个负责该顶级域名服务器的一个IP。本地DNS服务器收到IP信息后，将会联系负责.com域的这台服务器。这台负责.com域的服务器收到请求后，如果自己无法解析，它就会找一个管理.com域的下一级DNS服务器地址(`http://qq.com`)给本地DNS服务器。当本地DNS服务器收到这个地址后，就会找`http://qq.com`域服务器，重复上面的动作，进行查询，直至找到`www.qq.com`主机。
6. 如果用的是转发模式，此DNS服务器就会把请求转发至上一级DNS服务器，由上一级服务器进行解析，上一级服务器如果不能解析，或找根DNS或把转请求转至上上级，以此循环。不管是本地DNS服务器用是是转发，还是根提示，最后都是把结果返回给本地DNS服务器，由此DNS服务器再返回给客户机。     
   
   从客户端到本地DNS服务器是属于递归查询，而DNS服务器之间就是的交互查询就是迭代查询。

[参考链接](https://zhuanlan.zhihu.com/p/133906695)

### MIME 类型
媒体类型（通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型）是一种标准，用来表示文档、文件或字节流的性质和格式。

## TCP连接和断开过程（三次招手，四次挥手）
### 三次握手
第一次握手：建立连接时，客户端发送SYN(syn = x)包到服务器，并进入到syn_sent状态。等待服务器确认；syn（Synchronize Sequence Numbers 同步序列编号）

第二次握手：服务器收到syn包，必须确认客户的syn(ack = x+1)，同时自己也发送一个syn(syn = y)包，即SYN+ ACK包。此时进入syn_recv状态

第三次握手：客户端收到syn+ack包，向服务器发送确认包ack（ack=y+1）。此包发送完毕，客户端和服务器进入到established状态。完成三次握手

![图片shake](/assets/imgs/shake.png "shake")

### 四次挥手
- 第一次挥手： Client端发起挥手请求，向Server端发送标志位是FIN报文段，设置序列号seq，此时，Client端进入FIN_WAIT_1状态，这表示Client端没有数据要发送给Server端了。
- 第二次挥手：Server端收到了Client端发送的FIN报文段，向Client端返回一个标志位是ACK的报文段，ack设为seq加1，Client端进入FIN_WAIT_2状态，Server端告诉Client端，我确认并同意你的关闭请求。
- 第三次挥手： Server端向Client端发送标志位是FIN的报文段，请求关闭连接，同时Client端进入LAST_ACK状态。
- 第四次挥手 ： Client端收到Server端发送的FIN报文段，向Server端发送标志位是ACK的报文段，然后Client端进入TIME_WAIT状态。Server端收到Client端的ACK报文段以后，就关闭连接。此时，Client端等待2MSL的时间后依然没有收到回复，则证明Server端已正常关闭，那好，Client端也可以关闭连接了。

![图片wave](/assets/imgs/wave.png "wave")

### 为什么连接的时候是三次握手，关闭的时候却是四次握手？
建立连接时因为当Server端收到Client端的SYN连接请求报文后，可以直接发送SYN+ACK报文。其中ACK报文是用来应答的，SYN报文是用来同步的。所以建立连接只需要三次握手。

关闭连接时，当Client端发出FIN报文段时，只是表示Client端告诉Server端数据已经发送完毕了。当Server端收到FIN报文并返回ACK报文段，表示它已经知道Client端没有数据发送了，但是Server端还是可以发送数据到Client端的，所以Server很可能并不会立即关闭SOCKET，直到Server端把数据也发送完毕。当Server端也发送了FIN报文段时，这个时候就表示Server端也没有数据要发送了，就会告诉Client端，我也没有数据要发送了，之后彼此就会愉快的中断这次TCP连接。

## http
HTTP协议，即超文本传输协议(Hypertext transfer protocol)。是一种详细规定了浏览器和万维网(WWW = World Wide Web)服务器之间互相通信的规则，通过因特网传送万维网文档的数据传送协议。

HTTP是一个应用层协议，由请求和响应构成，是一个标准的客户端服务器模型。HTTP是一个无状态的协议。

### 如何升级http2.0协议
1. nginx版本高于1.9.5；
2. --with-http_ssl_module 跟 --with-http_v2_module
--with-http_ssl_module模块是因为http2.0协议是一种https协议。

[参考链接](https://juejin.cn/post/6844903984524705800)

### http的属性以及https的区别
在Internet中所有的传输都是通过TCP/IP进行的。HTTP协议作为TCP/IP模型中应用层的协议也不例外。HTTP协议通常承载于TCP协议之上，有时也承载于TLS或SSL协议层之上，这个时候，就成了我们常说的HTTPS。

- HTTP 明文传输，数据都是未加密的，安全性较差，HTTPS（SSL+HTTP） 数据传输过程是加密的，安全性较好。

- HTTP 默认工作在 TCP 协议 80 端口, HTTPS 默认工作在 TCP 协议443端口

- 使用 HTTPS 协议需要到 CA（Certificate Authority，数字证书认证机构） 申请证书，一般免费证书较少，因而需要一定费用

- HTTP 页面响应速度比 HTTPS 快，主要是因为 HTTP 使用 TCP 三次握手建立连接，客户端和服务器需要交换 3 个包，而 HTTPS除了 TCP 的三个包，还要加上 ssl 握手需要的 9 个包，所以一共是 12 个包。

- HTTPS 其实就是建构在 SSL/TLS 之上的 HTTP 协议，所以，HTTPS 比 HTTP 要更耗费服务器资源。

### http能取消吗？如何取消？
1. XHR 中断请求
XHR 请求的中断是通过 xhr.abort(); 来完成的。

2. Fetch 中断请求
```
const controller = new AbortController();
const signal = controller.signal;
console.log(signal, "signal的初始状态");
signal.addEventListener("abort", function (e) {
    console.log(signal, "signal的中断状态");
});


fetch("/upload", {signal})
.then((res) => {
    console.log(res, "请求成功");
}).catch(function (thrown) {
    console.log(thrown);
});
// 增加部分结束
controller.abort({
    name: "CondorHero",
    age: 19
});
```
fetch 通过 controller.abort 中断请求传入的形参不能被很好的接收。(不兼容 IE)

3. Axios 请求中断
```
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// cancel the request
controller.abort()
```

### http2与http1.1的区别？
- 二进制分帧（Binary Format）- http2.0的基石
- 多路复用 (Multiplexing) / 连接共享
- 头部压缩（Header Compression）
- 请求优先级（Request Priorities）
  - 优先级最高：主要的html
  - 优先级高：CSS文件
  - 优先级中：js文件
  - 优先级低：图片
- 服务端推送（Server Push）

### http状态码
1. 1**	信息，服务器收到请求，需要请求者继续执行操作
1. 2**	成功，操作被成功接收并处理
1. 3**	重定向，需要进一步的操作以完成请求
1. 4**	客户端错误，请求包含语法错误或无法完成请求
1. 5**	服务器错误，服务器在处理请求的过程中发生了错误

[状态码-菜鸟](https://www.runoob.com/http/http-status-codes.html)

### 对于https里的header有哪些了解
| Header | 解释 | 示例 |
| :---- | :---- | :---- |
| Accept-Ranges	| 表明服务器是否支持指定范围请求及哪种类型的分段请求 | Accept-Ranges: bytes |
| Age |	从原始服务器到代理缓存形成的估算时间（以秒计，非负）|	Age: 12 |
| Allow	| 对某网络资源的有效的请求行为，不允许则返回405	|Allow: GET, HEAD |
| Cache-Control	|告诉所有的缓存机制是否可以缓存及哪种类型	|Cache-Control: no-cache |
| Content-Encoding	|web服务器支持的返回内容压缩编码类型。|	Content-Encoding: gzip |
| Content-Language	| 响应体的语言 |	Content-Language: en,zh |
| Content-Length	| 响应体的长度 |	Content-Length: 348 |
| Content-Location	| 请求资源可替代的备用的另一地址 |	Content-Location: /index.htm |
| Content-MD5	| 返回资源的MD5校验值 |	Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ== |
| Content-Range	| 在整个返回体中本部分的字节位置 |	Content-Range: bytes 21010-47021/47022 |
| Content-Type	| 返回内容的MIME类型 |	Content-Type: text/html; charset=utf-8 |
| Date	| 原始服务器消息发出的时间 |	Date: Tue, 15 Nov 2010 08:12:31 GMT |
| ETag	| 请求变量的实体标签的当前值 |	ETag: “737060cd8c284d8af7ad3082f209582d” |
| Expires	| 响应过期的日期和时间 |	Expires: Thu, 01 Dec 2010 16:00:00 GMT |
| Last-Modified	| 请求资源的最后修改时间 |	Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT |
| Location	| 用来重定向接收方到非请求URL的位置来完成请求或标识新的资源 |	Location: http://www.zcmhi.com/archives/94.html |
| Pragma	| 包括实现特定的指令，它可应用到响应链上的任何接收方 |	Pragma: no-cache |
| Proxy-Authenticate	| 它指出认证方案和可应用到代理的该URL上的参数 |	Proxy-Authenticate: Basic |
| refresh	| 应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持）|	Refresh: 5; url=http://www.zcmhi.com/archives/94.html |
| Retry-After	| 如果实体暂时不可取，通知客户端在指定时间之后再次尝试 |	Retry-After: 120 |
| Server	| web服务器软件名称 |	Server: Apache/1.3.27 (Unix) (Red-Hat/Linux) |
| Set-Cookie	| 设置Http Cookie	 |Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1 |
| Trailer	|指出头域在分块传输编码的尾部存在 |	Trailer: Max-Forwards |
| Transfer-Encoding	 | 文件传输编码	|Transfer-Encoding:chunked |
| Vary	| 告诉下游代理是使用缓存响应还是从原始服务器请求 |	Vary: * |
| Via	| 告知代理客户端响应是通过哪里发送的 |	Via: 1.0 fred, 1.1 nowhere.com (Apache|1.1) |
| Warning	| 警告实体可能存在的问题 |	Warning: 199 Miscellaneous warning |
| WWW-Authenticate	| 表明客户端请求实体应该使用的授权方案 |	WWW-Authenticate: Basic |

### http  option
当我们发起跨域请求时，如果是简单请求，那么我们只会发出一次请求，但是如果是复杂请求则先发出 options 请求，用于确认目标资源是否支持跨域，然后浏览器会根据服务端响应的 header 自动处理剩余的请求，如果响应支持跨域，则继续发出正常请求，如果不支持，则在控制台显示错误。

由此可见，当触发预检时，跨域请求便会发送 2 次请求，既增加了请求数，也延迟了请求真正发起的时间，严重影响性能。

所以，我们可以优化 Options 请求，主要有 2 种方法。

 1. 转为简单请求，如用 JSONP 做跨域请求
 1. 对 options 请求进行缓存，服务器端设置 Access-Control-Max-Age 字段，那么当第一次请求该 URL 时会发出 OPTIONS 请求，浏览器会根据返回的 Access-Control-Max-Age 字段缓存该请求的 OPTIONS 预检请求的响应结果（具体缓存时间还取决于浏览器的支持的默认最大值，取两者最小值，一般为 10 分钟）。在缓存有效期内，该资源的请求（URL 和 header 字段都相同的情况下）不会再触发预检。（chrome 打开控制台可以看到，当服务器响应 Access-Control-Max-Age 时只有第一次请求会有预检，后面不会了。注意要开启缓存，去掉 disable cache 勾选。）
 

### http请求优化
 思路：
 1. 更好的连接传输效率。
 1. 更少的请求数量。
 1. 更小的资源大小。
 1. 合适的缓存策略。
 
 方案：
 1. 减少DNS查找：每次主机名的解析都需要一次网络往返，从而增加了请求的延迟时间，同时还会阻塞后续的请求。
 1. 重用TCP连接：尽可能的使用持久连接，以消除因TCP握手和慢启动导致的延迟。
 1. 减少HTTP重定向：HTTP重定向需要额外的DNS查询，TCP握手等非常耗时，最佳的重定向次数为0。
 1. 压缩传输的资源：比如Gzip、图片缓存。
 1. 使用缓存：比如HTTP缓存、CDN缓存、Service Worker缓存。
 1. 使用CDN内容分发网络：把数据放在里用户地理位置更近的地方，可以明显减少每次TCP连接的网络延迟，增大吞吐量。
 1. 删除没有必要请求的资源。
 1. 在客户端缓存资源：缓存必要的应用资源，避免每次都重复请求相同的内容，例如多图片下载可以考虑使用缓存。
 1. 内容在传输前先压缩：传输数据之前应该先压缩应用资源，把要传输的字节减少到最小，在压缩的时候确保对每种不同的资源采用最好的压缩手段。
 1. 消除不必要的请求开销：减少请求的HTTP首部数据（比如HTTP Cooki）
 1. 并行处理请求和响应：请求和响应的排队都会导致延迟，可以尝试并行的处理请求和响应（利用多个HTTP1.1连接实现并行下载，在可能的情况下使用HTTP管道计数）。
 1. 针对协议版本采取优化措施：例如升级到HTTP2.0。
 1. 根据需要采用服务端渲染方式：这种方式可以解决SPA应用首屏渲染慢的问题。
 1. 采用预渲染的方式加速静态页面：页面渲染的极致性能，比较适合静态页面。

## TCP 与 UDP 
#### 连接
TCP 要求在发送方和接收方开始通信之前建立一个良好的连接，它是一个面向连接的协议。

#### UDP 是一种无连接协议。

保持数据传输的顺序

在 TCP 中，由于事先建立了一个良好的连接，接收方以有序的方式接收数据包。

而在 UDP 中，发送方与接收方之间并没有建立良好的连接，接收方将以无序的方式接收数据包。

#### 可靠性
每当通过 TCP 接收到数据包时，接收方都会向发送方发送一条确认。万一失败，它会请求重新传输。

而使用 UDP，在这种情况下不会发送确认，它依赖于高层协议来确保可靠性。

#### 错误检查
TCP 中有广泛的错误检查规则，而 UDP 中只有基本的错误检查技术，例如校验和。

#### 传输方法
在 TCP 中，数据以字节流的形式读取，消息被发送到段边界。

而在 UDP 中，已定义限制的单个 UDP 数据包被发送，在到达接收方时验证其完整性。

#### 广播
TCP 不支持广播。当你使用它时，发送方和接收方必须先建立一条连接，在传输结束后又必须终止这条连接。

UDP 支持广播。

### TCP 与 UDP 的用例
- TCP 被用于 HTTPS（安全超文本传输协议）、HTTP（超文本传输协议）、SMTP（简单邮件传输协议）、FTP（文件传输协议）等等。

- UDP 用于视频流、视频电话、IP 语音服务（互联网呼叫）、DNS（域名系统）等。

## tcp在哪一层？让你实现一个基于tcp协议之上的协议，你怎么实现
TCP协议在传输层，IP在网络层，http在应用层

### 创建TCP服务器端
利用net.createServer(listener)创建一个TCP服务器
```
const net = require("net");
// 通过net.createServer(listeber)即可创建一个TCP服务器
const server = net.createServer(function (socket) {
  // 新的连接
  socket.on("data", function (data) {
    socket.write("你好");
  });
  socket.on("end", function () {
    console.log("连接断开");
  });
  socket.write("学习TCP");
});
// listener是连接事件connection的侦听器
server.listen(8124, function () {
  console.log("server bound");
```

### 创建客户端测试
通过net模块自行构造客户端进行会话，测试上面构建的TCP服务代码如下：
```
const net = require("net");
const client = net.connect({ port: 8124 }, function () {
  //'connect' listener
  console.log("client connected");
  client.write("world!\r\n");
});
client.on("data", function (data) {
  console.log(data.toString());
  client.end();
});
client.on("end", function () {
  console.log("client disconnected");
```

## 粘包问题分析与对策

### 粘包出现原因
粘包出现的根本原因是不确定消息的边界

UDP不会出现粘包，因为它有消息边界

### 怎么避免粘包

（1）对于发送方引起的粘包现象，用户可通过编程设置来避免，TCP提供了强制数据立即传送的操作指令push，TCP软件收到该操作指令后，就立即将本段数据发送出去，而不必等待发送缓冲区满；

（2）对于接收方引起的粘包，则可通过优化程序设计、精简接收进程工作量、提高接收进程优先级等措施，使其及时接收数据，从而尽量避免出现粘包现象；

（3）由接收方控制，将一包数据按结构字段，人为控制分多次接收，然后合并，通过这种手段来避免粘包。分包多发。

以上提到的三种措施，都有其不足之处。

（1）第一种编程设置方法虽然可以避免发送方引起的粘包，但它关闭了优化算法，降低了网络发送效率，影响应用程序的性能，一般不建议使用。

（2）第二种方法只能减少出现粘包的可能性，但并不能完全避免粘包，当发送频率较高时，或由于网络突发可能使某个时间段数据包到达接收方较快，接收方还是有可能来不及接收，从而导致粘包。

（3）第三种方法虽然避免了粘包，但应用程序的效率较低，对实时应用的场合不适合。


一种比较周全的对策是：接收方创建一预处理线程，对接收到的数据包进行预处理，将粘连的包分开。实验证明这种方法是高效可行的。

## 前端安全

### XSS
XSS全称(Cross Site Scripting)跨站脚本攻击，是前端最常见的安全问题。XSS是一种在web应用中的计算机安全漏洞，它允许恶意web用户将代码植入到提供给其它用户使用的页面中，攻击者通过注入非法的html标签或者javascript代码，从而当用户浏览该网页时，控制用户浏览器。

#### 类别
1. 存储型（server端）：
- 场景：见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。
- 攻击步骤：
    - 攻击者将恶意代码提交到目标网站的数据库中
    - 用户打开目标网站时，服务端将恶意代码从数据库中取出来，拼接在HTML中返回给浏览器
    - 用户浏览器在收到响应后解析执行，混在其中的恶意代码也同时被执行
    - 恶意代码窃取用户数据，并发送到指定攻击者的网站，或者冒充用户行为，调用目标网站的接口，执行恶意操作

2. 反射型（Server端）：
- 与存储型的区别在于，存储型的恶意代码存储在数据库中，反射型的恶意代码在URL上
- 场景：通过 URL 传递参数的功能，如网站搜索、跳转等。
- 攻击步骤：
    - 攻击者构造出特殊的 URL，其中包含恶意代码。
    - 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
    - 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
    - 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

3. Dom 型(浏览器端）：
- DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。
- 场景：通过 URL 传递参数的功能，如网站搜索、跳转等。
- 攻击步骤：
    - 攻击者构造出特殊的 URL，其中包含恶意代码。
    - 用户打开带有恶意代码的 URL。
    - 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。
    - 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

#### 解决方案
1. 对数据进行严格的输出编码：如HTML元素的编码，JS编码，CSS编码，URL编码等等
1. CSP HTTP Header，即 Content-Security-Policy、X-XSS-Protection
1. 输入验证：比如一些常见的数字、URL、电话号码、邮箱地址等等做校验判断
1. 开启浏览器XSS防御：Http Only cookie，禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。
1. 验证码

### CSRF
CSRF全称(Cross-Site Request Forgeries)跨站请求伪造。指攻击者冒充用户发起请求（在用户不知情的情况下），完成一些违背用户意愿的事情

#### 解决方案
1. 使用token
2. Referer 验证
3. 使用验证码

### 点击劫持
点击劫持就是将一个危险网站设置透明，然后在其上方设置一个按钮，当你点击这个按钮的时候，就会触发底部恶意网站的某些事件。

#### 解决方案
1. 设置http响应头 X-Frame-Options
2. 使用CSP(Content Security Policy)内容安全策略

### 不安全的第三方依赖
现如今进行应用开发，无论是后端服务器应用还是前端应用开发，绝大多数时候我们都是在借助开发框架和各种类库进行快速开发。然而，一些第三方的依赖或者插件存在很多安全性问题，也会存在这样那样的漏洞，所以使用起来得谨慎。

#### 解决方案
1. 尽量减少第三方依赖，选用相对成熟的依赖包。
2. 使用自动化工具检查这些第三方代码有没有安全问题，比如NSP(Node Security Platform)，Snyk等等

### 本地存储数据泄露
很多开发者为了方便，把一些个人信息不经加密直接存到本地或者cookie，这样是非常不安全的，黑客们可以很容易就拿到用户的信息。

#### 解决方案
1. 不在本地存储重要数据
2. 加密

## 浏览器的并发连接限制是什么？为什么要做并发限制？

**浏览器的并发请求数目限制是针对同一域名的。**

在浏览器同域名并发请求都产生并发数限制，并发限制通常是4～8以内

### 为什么要做并发限制？
1. 对操作系统端口资源考虑

PC总端口数为65536，那么一个TCP（http也是tcp）链接就占用一个端口。操作系统通常会对总端口一半开放对外请求，以防端口数量不被迅速消耗殆尽。

2. 过多并发导致频繁切换产生性能问题

一个线程对应处理一个http请求，那么如果并发数量巨大的话会导致线程频繁切换。而线程的上下文切换有时候并不是轻量级的资源。这导致得不偿失，所以请求控制器里面会产生一个链接池，以复用之前的链接。所以我们可以看作同域名下链接池最大为4～8个，如果链接池全部被使用会阻塞后面请求任务，等待有空闲链接时执行后续任务。

3. 避免同一客服端并发大量请求超过服务端的并发阈值

在服务端通常都对同一个客户端来源设置并发阀值避免恶意攻击，如果浏览器不对同一域名做并发限制可能会导致超过服务端的并发阀值被BAN掉。

4. 客户端良知机制

为了防止两个应用抢占资源时候导致强势一方无限制的获取资源导致弱势一方永远阻塞状态。

### 优化手段
1. 域名散发
    - 给定一组域名，如：img1.baidu.com、img2.baidu.com、img3.baidu.com、img4.baidu.com... ... 
    - 这组域名指向同一个源，或者说最终源是一个。
    - 上传图片（静态文件）的时候随机返回这组域名中的其中一个即可，这样图片的访问域名就不会出现只是一个域名了。

一般是建议4个左右。因为过多域名会导致dns解析性能问题。

2. 小图片合并成大图
减少图片资源的请求数量，雪碧图就是常见的一种手段，或者svg，iconfont等

3. 设置Cache-Control max-age
当我们确定项目那些资源是长久不变化的我们对其设置版本号控制和Cache-Control max-age 进行长时间缓存，减少浏览器对资源重新请求。

4. loading Image 懒加载
懒加载其实是大型网站通常必备对一个手段，为了防止无意义加载场景。通常用户在进来对第一屏对内容不会全部查看，可能在浏览过程中已经跳转到其他页面。那么在用户浏览到的地方没必要进行图片加载、节点创建等操作，可以等用户滚动到节点内容区域再进行显示和加载内容。

5. PWA（渐进式应用）
近几年比较火的一个优化手段，通过web Service 对当前应用请求过的请求进行缓存到客户端，用户下次访问页面或刷新页面都是直接从客户端本机直接读取之前的response。可以细化控制缓存静态资源、api请求等。但是pwa缓存有限制条件：只能缓存https协议、主站点域名的请求。并且之前缓存过的请求需要在下次PWA机制启动时候进行清除和刷新，这样会导致缓存的资源需要两次访问页面才能发生更新。

## hybrid怎么跟APP通信
混合（Hybrid App）开发：原生和 H5 混合开发，通过 webview 内嵌 H5 实现

- 优点：
1. 开发效率高，节约时间，一套代码可适用 Android，IOS，也可在微信或浏览器中访问 H5 链接
1. 代码维护方便，版本更新快，节省成本
1. 更新和部署比较方便，升级版本不需要应用商店审核

- 缺点：
1. 功能无法自定义，需要客户端支持
1. 加载缓慢，网络要求高
1. 安全性比较低

### JSBridge
关于 JSBridge，绝大多数同学最早遇到的是微信的 WeiXinJSBridge（现在被封装成 JSSDK），各种 Web 页面可以通过 Bridge 调用微信提供的一些原生功能，为用户提供相关的功能。

### JSBridge 的实现原理
JavaScript 是运行在一个单独的 JS Context 中（例如，WebView 的 Webkit 引擎、JSCore）。由于这些 Context 与原生运行环境的天然隔离，我们可以将这种情况与 RPC（Remote Procedure Call，远程过程调用）通信进行类比，将 Native 与 JavaScript 的每次互相调用看做一次 RPC 调用。

####  JavaScript 调用 Native
JavaScript 调用 Native 的方式，主要有两种：注入 API 和 拦截 URL SCHEME。

- 注入API
注入 API 方式的主要原理是，通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。

前端调用方式: (这个会随着IOS，Android封装的方法改变)
```
window.postBridgeMessage(message);
```

- 拦截 URL SCHEME
拦截 URL SCHEME 的主要流程是：Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。

缺陷：

使用 iframe.src 发送 URL SCHEME 会有 url 长度的隐患。

#### Native 调用 JavaScript
相比于 JavaScript 调用 Native， Native 调用 JavaScript 较为简单，毕竟不管是 iOS 的 UIWebView 还是 WKWebView，还是 Android 的 WebView 组件，都以子组件的形式存在于 View/Activity 中，直接调用相应的 API 即可。

#### JSBridge 接口实现
从上面的剖析中，可以得知，JSBridge 的接口主要功能有两个：调用 Native（给 Native 发消息） 和 接被 Native 调用（接收 Native 消息）。因此，JSBridge 可以设计如下：

**浅显，不全, (雏形)**
```
window.JSBridge = {
    // 调用 Native
    invoke: function(msg) {
        // 判断环境，获取不同的 nativeBridge
        nativeBridge.postMessage(msg);
    },
    receiveMessage: function(msg) {
        // 处理 msg
    }
};
```

[参考链接](https://juejin.cn/post/6844903585268891662#heading-5)
   

## 你提到了 map，讲讲和object有什么区别?

### 什么是Map
Map是一种数据结构（它很特别，是一种抽象的数据结构类型），数据一对对进行存储，其中包含键以及映射到该键的值。并且由于键的唯一性，因此不存在重复的键值对。

例如：{(1, "smile"), (2, "cry"), (42, "happy")}

### 什么是Object
JavaScript中的常规对象是一种字典类型的数据结构——这意味着它依然遵循与Map类型相同键值对的存储结构。Object中的key，或者我们可以称之为属性，同样是独一无二的并且对应着一个单独的value。

另外，JavaScript中的Object拥有内置原型(prototype)。需要注意的是，JavaScript中几乎所有对象都是Object实例，包括Map。

例如：{1: 'smile', 2: 'cry', 42: 'happy'}

### 区别
- 键：Object遵循普通的字典规则，键必须是单一类型，并且只能是整数、字符串或是Symbol类型。但在Map中，key可以为任意数据类型（Object, Array等）。（你可以尝试将一个对象设置为一个Object的key，看看最终的数据结构）
- 元素顺序：Map会保留所有元素的顺序，而Object并不会保证属性的顺序。（如有疑问可参考：链接）
- 继承：Map是Object的实例对象，而Object显然不可能是Map的实例对象。

```
var map = new Map([[1,2],[3,4]]);
console.log(map instanceof Object); //true
var obj = new Object();
console.log(obj instanceof Map); //false
```

## CSR 和 SSR 的区别

### CSR
CSR全称是 Client Side Rendering ，代表的是客户端渲染

以react为例，客户端渲染初始化的html一般如下

```
<!DOCTYPE html>
<html lang="en">
 <head> 
  <title data-react-helmet="true">react app</title> 
  <noscript> 
  </noscript>
 </head>
 <body>
  <noscript>
   You need to enable JavaScript to run this app.
  </noscript> 
  <div id="root"></div>
  <script type="text/javascript" src="/static/js/bundle.js" defer=""></script> 
  <script type="text/javascript" src="/static/js/main.chunk.js" defer=""></script> 
 </body>
</html>
```
可以看出当前页面除了 <div id="root"></div> 元素，没有其他的元素，然后通过加载 bundle.js , main.chunk.js 来执行渲染。整个渲染过程包括，生成DOM节点，注入样式，交互事件绑定，数据获取等等。

- 优点

1. 前后端分离。前端专注于界面开发，后端专注于api开发，且前端有更多的选择性，可以使用vue，react框架开发，而不需要遵循后端特定的模板。
1. 服务器压力变轻了，渲染工作在客户端进行，服务器直接返回不加工的html
1. 用户在后续访问操作体验好，（首屏渲染慢）可以将网站做成SPA，可以增量渲染

- 缺点

1. 不利于SEO，因为搜索引擎不执行JS相关操作，无法获取渲染后的最终html。
1. 首屏渲染时间比较长，因为需要页面执行ajax获取数据来渲染页面，如果请求接口多，不利于首屏渲染

### SSR
SSR全称是 Server Side Rendering，代表的是服务端渲染。与客户端渲染不同的是，SSR输出的是一个渲染完成的html，整个渲染过程是在服务器端进行的。例如传统的JSP，PHP都是服务端渲染

- 优点

1. 有利于SEO，由于页面在服务器生成，搜索引擎直接抓取到最终页面结果。
1. 有利于首屏渲染，html所需要的数据都在服务器处理好，直接生成html，首屏渲染时间变短。

- 缺点

1. 占用服务器资源，渲染工作都在服务端渲染
1. 用户体验不好，每次跳转到新页面都需要在重新服务端渲染整个页面，不能只渲染可变区域

### SSG
SSG全称是 Static Site Generation ，代表的是静态站点生成。在构建的时候直接把结果页面输出html到磁盘，每次访问直接把html返回给客户端，相当于一个静态资源

- 优点

1. 减轻服务器压力，可以把生成的静态资源（html）放到CDN上，合理利用缓存
1. 有利于SEO，由于html已经提前生成好，不需要服务端和客户端去渲染

- 缺点

1. 只适用于静态数据，对于经常改动的数据，需要每次重新生成页面。
1. 用户体验不好，每次打开新页面都需要重新渲染整个页面，不能只渲染可变区域

## 前端性能优化
性能优化的目的，就是为了提供给用户更好的体验，这些体验包含这几个方面：展示更快、交互响应快、页面无卡顿情况。

![图片performance](/assets/imgs/performance.webp "performance")

### 图片优化

#### 图片延迟加载
在页面中，先不给图片设置路径，只有当图片出现在浏览器的可视区域时，才去加载真正的图片，这就是延迟加载。对于图片很多的网站来说，一次性加载全部图片，会对用户体验造成很大的影响，所以需要使用图片延迟加载。

#### 响应式图片
响应式图片的优点是浏览器能够根据屏幕大小自动加载合适的图片。

通过 picture 实现
```
<picture>
    <source srcset="banner_w1000.jpg" media="(min-width: 801px)">
    <source srcset="banner_w800.jpg" media="(max-width: 800px)">
    <img src="banner_w800.jpg" alt="">
</picture>
```
picture 元素允许我们在不同的设备上显示不同的图片，一般用于响应式。

HTML5 引入了 <picture> 元素，该元素可以让图片资源的调整更加灵活。

    <picture> 元素零或多个 <source> 元素和一个 <img> 元素，每个 <source> 元素匹配不同的设备并引用不同的图像源，如果没有匹配的，就选择 <img> 元素的 src 属性中的 url。

注意:<img> 元素是放在最后一个 <picture> 元素之后，如果浏览器不支持该属性则显示 <img> 元素的的图片。

#### 降低图片质量
- 一是通过 webpack 插件 image-webpack-loader，
- 二是通过在线网站进行压缩。

#### 尽可能利用 CSS3 效果代替图片

### 减少重绘重排
浏览器渲染过程

1. 解析HTML生成DOM树。
1. 解析CSS生成CSSOM规则树。
1. 将DOM树与CSSOM规则树合并在一起生成渲染树。
1. 遍历渲染树开始布局，计算每个节点的位置大小信息。
1. 将渲染树每个节点绘制到屏幕。

[回流重绘](https://juejin.cn/post/6844903569087266823)

### 使用事件委托
事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。所有用到按钮的事件（多数鼠标事件和键盘事件）都适合采用事件委托技术， 使用事件委托可以节省内存。

```
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>凤梨</li>
</ul>

// good
document.querySelector('ul').onclick = (event) => {
  const target = event.target
  if (target.nodeName === 'LI') {
    console.log(target.innerHTML)
  }
}

// bad
document.querySelectorAll('li').forEach((e) => {
  e.onclick = function() {
    console.log(this.innerHTML)
  }
}) 
```

### 使用 transform 和 opacity 属性更改来实现动画
在 CSS 中，transforms 和 opacity 这两个属性更改不会触发重排与重绘，它们是可以由合成器（composite）单独处理的属性。

[参考资料](https://segmentfault.com/a/1190000022205291)

## 基于防抖和节流的性能优化
### 防抖
所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。

```
function mouseMove(event) {
    console.log(event.clientX)
}

function debounce(fn, wait) {
    let timer = null;
    return function () {
        var args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait)
    }
}

debounce(mouseMove, 1000);
```

### 节流
连续触发的事件在某一时间段内只发生一次
```
        function jl (fn, wait) {
            let timmer = null
            return function () {
                var args = arguments
                if (!timer) {
                    timmer = setTimeout(()=>{
                        timmer = null
                        fn.apply(this,args)
                    }, wait)
                }
            }
        }
```

## 柯里化
柯里化（Currying）,维基百科上的解释是，把接受多个参数的函数转换成接受一个单一参数的函数
先看一个简单例子

```
    // 柯里化
    var foo = function(x) {
        return function(y) {
            return x + y
        }
    }
    
    foo(3)(4)       // 7

    
    // 普通方法
    var add = function(x, y) {
        return x + y;
    }
    
    add(3, 4)       //7 
```
本来应该一次传入两个参数的add函数，柯里化方法，变成每次调用都只用传入一个参数，调用两次后，得到最后的结果。

再看看，一道经典的面试题。

    编写一个sum函数，实现如下功能：
    console.log(sum(1)(2)(3)) // 6.

直接套用上面柯里化函数，多加一层return
```
   function sum(a) {
        return function(b) {
            return function(c) {
                return a + b + c;
            }
        }
    }
```

### 尾递归
函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
[尾调用优化-阮一峰](https://www.ruanyifeng.com/blog/2015/04/tail-call.html)

#### 参数复用
```
  var curriedAdd = curry(add, 5)
```
在后面，使用curriedAdd函数时，默认都复用了5,不需要重新传入两个参数

#### 延迟执行

上面传入多个参数的sum(1)(2)(3),就是延迟执行的最后例子，传入参数个数没有满足原函数入参个数，都不会立即返回结果。
```
addEventListener('click', hander.bind(this, arg1,arg2...))

addEventListener('click', curry(hander)) 
```

### 缺点
从上面实现部分的代码中，可以看到，使用柯里化函数，离不开闭包， arguments， 递归。

1. 闭包，函数中的变量都保存在内存中，内存消耗大，有可能导致内存泄漏。
1. 递归，效率非常差，
1. arguments, 变量存取慢，访问性很差,

## 一些常用array的api
- 判断数组的方法有
1. xx instanceof Array
1. Array.isArray()
1. Object.prototype.toString.call() === "[object Array]"

### 改变元数组
unshift、shift、pop、push、splice、reverse

- splice
splice(m,n,e1,e2,e3) 从索引m（包括）到n（不包括）的元素删除数组，再在该位置处添加e1，e2，e3。若n传入0，则只增加；若只传m和n，则只删除；若只传m，则从m位置删除到末位。放回删除元素数组
```
var arr3 = [1,2,3,4,5,6,7,"f1","f2"];
var arr4 = arr3.splice(2,3) //删除第三个元素以后的三个数组元素(包含第三个元素)
console.log(arr4); //[3,4,5];
console.log(arr3); //[1,2,6,7,"f1","f2"]; 原始数组被改变
```

### 不改变
slice， concat，join, indexOf 和 includes，filter、find 和 findIndex,of 和 from, some 和 every, map 和 forEach

- slice
slice(m, n)返回原数组索引m（包含）到n（不包含）的元素数组。不传参数默认全部截取，只传一个参数，从该位置截取到末位。类似于String.prototype.substring
```
var arr1 = [1,23,44,55,66,77,888,"fff"];
var arr2 = arr1.slice(2,4) //从index为2截取到index为4之前不包括4
console.log(arr2); //[44,55]
console.log(arr1); // [1,23,44,55,66,77,888,"fff"]原始数组没有被改变
```

- indexOf 和 includes
indexOf() 返回索引，不存在就返回 -1。inclues()返回布尔值。

NaN 不能通过indexOf()判断，它是通过“===”比较的。
```
arr = [1, "2", null, NaN];
arr.indexOf(NaN); // -1
arr.includes(NaN); // true
```

### of 和 from
of()类似于new Array()，但后者如果传入一个参数，则是设置数组长度。

from() 把伪数组转换为真数组，类似于[].slice.call()（或者写成Array.prototype.slice.call()）

伪数组有DOM集、arguments、{0: "zero", 1: "one", length: 2}

```
Array.of(1,2,3,4); // [ 1, 2, 3, 4 ]
Array.from({0: "zero", 1: "one", length: 2}); // [ "zero", "one" ]
```

## 同源策略
同源是指 同协议 、同域名、同端口。
### 跨域有哪些方法？
1. JSONP

利用 `<script>` 标签没有跨域的限制，缺点是仅支持get方法具有局限性,不安全可能会遭受XSS攻击。
```
function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    window[callback] = function(data) {
      resolve(data)
      document.body.removeChild(script)
    }
    params = { ...params, callback } // wd=b&callback=show
    let arrs = []
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${arrs.join('&')}`
    document.body.appendChild(script)
  })
}
jsonp({
  url: 'http://localhost:3000/say',
  params: { wd: 'Iloveyou' },
  callback: 'show'
}).then(data => {
  console.log(data)
})
```

2. CORS
CORS 和前端没什么关系，但是通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为简单请求和复杂请求
-  简单请求
只要同时满足以下两大条件，就属于简单请求
条件1：使用下列方法之一：

    GET
    HEAD
    POST

条件2：Content-Type 的值仅限于下列三者之一：

    text/plain
    multipart/form-data
    application/x-www-form-urlencoded

- 复杂请求
不符合以上条件的请求就是复杂请求了。 复杂请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求,该请求是 option 方法的，通过该请求来知道服务端是否允许跨域请求。
```
// 允许哪个方法访问我
res.setHeader('Access-Control-Allow-Methods', 'PUT')
// 预检的存活时间
res.setHeader('Access-Control-Max-Age', 6)
// OPTIONS请求不做任何处理
if (req.method === 'OPTIONS') {
  res.end() 
}
// 定义后台返回的内容
app.put('/getData', function(req, res) {
  console.log(req.headers)
  res.end('我不爱你')
})
```

3. postMessage
postMessage是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题：

- 页面和其打开的新窗口的数据传递
- 多窗口之间消息传递
- 页面与嵌套的iframe消息传递
- 上面三个场景的跨域数据传递

    otherWindow.postMessage(message, targetOrigin, [transfer]);

4. websocket
Websocket是HTML5的一个持久化的协议，它实现了浏览器与服务器的全双工通信，同时也是跨域的一种解决方案。WebSocket和HTTP都是应用层协议，都基于 TCP 协议。但是 WebSocket 是一种双向通信协议，在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据。同时，WebSocket 在建立连接时需要借助 HTTP 协议，连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了。

5. nginx反向代理
通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。

先下载nginx，然后将nginx目录下的nginx.conf修改如下:
```
// proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;
    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
```
最后通过命令行nginx -s reload启动nginx

6. window.name + iframe
同域名情况下，可以通信

### document.domain的限制是啥？
document.domain这个方法使用极其简单，但是也有较大的限制，主要用于主域相同的域之间的数据通信。

`
已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；参见本页面底部的兼容性表格以指导你作出决定。请注意，该特性随时可能无法正常工作。
`
    
    直接看例子就能明白:

- 一级域名：www.baidu.com
- 二级域名：music.baidu.com
显然，这是跨域的

**本地设置不同域名**

可以通过配置host文件来设置不同的域名
```
127.0.0.1       www.yuhua.com
127.0.0.1       a.yuhua.com
127.0.0.1       b.yuhua.com
```

#### 如何通过document.domain实现跨域
前提准备：
- http://a.yuhua.com:3000/a.html起a.html
- http://b.yuhua.com:3000/b.html起b.html
```
 //a.html
 <iframe src="http://b.yuhua.com:4000/b.html" "load()" id="frame"></iframe>
 <script type="text/javascript">
   document.domain = 'yuhua.com';
   function load(){
    console.log(frame.contentWindow.name);
   }
 </script>

 //b.html
 <script type="text/javascript">
  document.domain = 'yuhua.com';
  var name = 'yuhua';
 </script>
```
现象：加载a.html，会打印"yuhua"

原因分析：当主域之间相互通信的时候，只要将两者的document.domain赋值为当前的主域地址，即可实现跨域通信。

### 为什么要限制跨域
1. 为了避免数据安全的问题
1. 可能a.com的一段JavaScript脚本，在b.com未曾加载此脚本时，也可以随意涂改b.com的页面。
1. 在浏览器中同时打开某电商网站（域名为b.com），同时在打开另一个网站(a.com)，那么在a.com域名下的脚本可以读取b.com下的Cookie，如果Cookie中包含隐私数据，后果不堪设想。
1. 因为可以随意读取任意域名下的Cookie数据，很容易发起CSRF攻击。

## 你提到了 requestAnimationFrame，讲讲和setlnterval的区别?
与 setTimeout、setInterval 不同，requestAnimationFrame 不需要设置时间间隔，这有什么好处呢？

计时器一直是 JavaScript 动画的核心技术，而编写动画循环的核心是要知道延迟时间多长合适。一方面循环间隔必须足够短，这样才能让不同的动画效果显得平滑顺畅，另一方面循环间隔要足够的长，这样才能保证浏览器有能力渲染产生的变化。
大多数电脑显示器的刷新频率是60Hz，大概相当于每秒重绘60次。大多数浏览器都会对重绘操作加以限制，不会超出显示器的重绘频率。

而 setTimeout 和 setInterval 的缺点是他们都不够精确。它们内在的运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器 UI 线程队列中等待执行的时间，如果队列中已经加入了其他任务，那么动画的执行要等前面的任务结束之后才会执行。

requestAnimationFrame采用的是系统时间间隔，保证了最佳绘制效率。不会因间隔时间过短，造成过度绘制，增加开销；也不会因时间间隔太长，造成动画卡顿。它能够让各种网页动画有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。

### 特点
1. requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率。
1. 在隐藏或不可见的元素中，requsetAnimationFrame 将不会进行重绘或回流，这就意味着更少的 CPU、GPU 和内存使用量。
1. requestAnimationFrame是浏览器专门提供的 api，在运行时浏览器会自动优化方法的调用，并且页面不是激活状态下，动画会暂停执行，有效节省 CPU 开销。

### 使用
- requestAnimationFrame 使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。他返回一个整数，标识定时器的编号，这个值可以传递给 cancelAnimationFrame用于取消这个函数的执行。

```
const requestId = requestAnimationFrame(callback);

//控制台输出1和0
var timer = requestAnimationFrame(function(){
    console.log(0);
}); 
console.log(timer);//1
```

- cancelAnimationFrame方法用于取消定时器

```
//控制台什么都不输出
var timer = requestAnimationFrame(function(){
    console.log(0);
}); 
cancelAnimationFrame(timer);
```

- 也可以直接使用返回值进行取消

```
var timer = requestAnimationFrame(function(){
    console.log(0);
}); 
cancelAnimationFrame(1);
```

## es6如何转换es5？
转换过程分为三步：

1. Parser 解析
第一步主要是将 ES6 语法解析为 AST 抽象语法树。简单地说就是将代码打散成颗粒组装的对象。这一步主要是通过 babylon 插件来完成。

2. Transformer 转换
第二步是将打散的 AST 语法通过配置好的 plugins（babel-traverse 对 AST 进行遍历转译）和 presets （es2015 / es2016 / es2017 / env / stage-0 / stage-4 其中 es20xx 表示转换成该年份批准的标准，env 是最新标准，stage-0 和 stage-4 是实验版）转换成新的 AST 语法。这一步主要是由 babel-transform 插件完成。plugins 和 presets 通常在 .babelrc 文件中配置。

3. Generator 生成
第三步是将新的 AST 语法树对象再生成浏览器都可以识别的 ES5 语法。这一步主要是由 babel-generator 插件完成。

### babel的原理是啥？
Babel 内部原理是将 JS 代码转换为 AST，对 AST 应用各种插件进行处理，最终输出编译后的 JS 代码。

## git merge、git rebase的区别
git rebase 和 git merge 一样都是用于从一个分支获取并且合并到当前分支，但是他们采取不同的工作方式，以下面的一个工作场景说明其区别

### merge
```
git checkout feature
git merge master
```
或者执行更简单的：
```
git merge master feature
```
marge 特点：自动创建一个新的commit

如果合并的时候遇到冲突，仅需要修改后重新commit

优点：记录了真实的commit情况，包括每个分支的详情

缺点：因为每次merge会自动产生一个merge commit，所以在使用一些git 的GUI tools，特别是commit比较频繁时，看到分支很杂乱。

### rebase
本质是变基 变基 变基

变基是什么? 找公共祖先

执行以下命令：
```
git checkout feature
git rebase master
```
rebase 特点：会合并之前的commit历史
- 优点：得到更简洁的项目历史，去掉了merge commit
- 缺点：如果合并出现代码问题不容易定位，因为re-write了history

合并时如果出现冲突需要按照如下步骤解决

修改冲突部分
- git add
- git rebase --continue
- （如果第三步无效可以执行 git rebase --skip）

**不要在git add 之后习惯性的执行 git commit命令**

如果你想要一个干净的，没有merge commit的线性历史树，那么你应该选择git rebase

如果你想保留完整的历史记录，并且想要避免重写commit history的风险，你应该选择使用git merge

## sdk
### 暴露一个公共变量
- 最简单的做法是在 index.js 里加一句 window.SDK = ...

- 不过 webpack 有更好的解决方案 output.library】  

## lowCode && no-code
### lowCode
低代码就是尽量少写代码，定义好业务组件，通过可视化操作实现开发工作。它主要受众是开发者。
> 低代码可以提升开发效率，保障系统稳定性，也降低了开发门槛，可以直接可视化开发。

可能存在的问题
- 不灵活。适用于通用业务领域，对定制化需求不友好。
- 不可控。业务拓展性、可维护性较低。
- 不好用。开发不想用，业务不会用。

### no-code
无代码（no-code）即不需要写代码就能完成开发，更加偏向业务层的定制。

## qiankun
qiankun 为了实现应用和应用之间的变量隔离，做了三种沙箱机制，分别为快照沙箱（snapshotSandbox） , 单例沙箱（legacySandbox）,代理沙箱（proxySandbox）

qiankun是基于 `single-spa` 二次开发的，在 single-spa 的基础上优化了使用体验并扩展了功能。

主要改为了 html 作为入口，解析 html，从中分析 js、css，然后再加载，这个是 `import-html-entry `这个包实现的。

### iframe缺点
- URL 状态的问题。iframe 的 url 状态会在刷新时丢失，同时后退、前进按钮都无法控制 iframe
- UI 完全隔离。iframe 内的 UI 只能在 iframe 内，这在需要弹框，或者层叠的时候会特别丑。比如一个 iframe 内部弹窗，遮罩智能盖住 iframe，无法影响到外面，导致看起来恨不协调
- 上下文隔离。iframe 内外通信及其不方便，一般通过 url、cookie 等方案来通信
- 性能消耗大。每一个 iframe 都可以看成是一个小的浏览器窗口，应用每次进入相当于打开多个窗口。一般会比单页应用更慢。

### HTML Entry 
在 qiankun 的源码中，作者将这一部分抽离成了单独的 npm 库：
```"import-html-entry": "^1.9.0"```

这个库主要做了这些事情：

1. 加载 entry html (index.html) 的内容到内存。
1. 将 entry html 中的 css、js、link 等标签下的内容获取出来（包含外部的和内联的），整理成网页所需的 js、css 列表。并将无用标签去掉（例如注释、ignore 等）。
1. 加载所有外链 js 脚本，并将这些外链 js 和内联 js 一起整理为 script list。
1. 加载所有外链 css 文件，并将其以内联（`<style/>`）的方式插入到 entry html 中。
1. 将处理后的 entry html 和待执行的 script list 返回给调用方（基座）。

### 通信的原理
在通信部分，qiankun 提供了全局的 state 供子应用和基座使用。同时提供了 2 个函数供子应用操作使用，分别是：

- onGlobalStateChange: (callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void 在当前应用监听全局状态，有变更触发 callback，fireImmediately = true 立即触发 callback
- setGlobalState: (state: Record<string, any>) => boolean 按一级属性设置全局状态，子应用中只能修改已存在的一级属性
> 注：setGlobalState 子应用仅能对全局 state 已存在的一级属性做修改，不能对 state 新增或删除属性。onGlobalStateChange 监听数据变化同样只针对于 state 已存在的一级属性。

这样设计的目的是想把全局 state 的掌控权交给基座主应用，避免子应用乱操作。

如果以上数据的通信不够用，也可以使用 window.addEventListener 直接进行事件通信。

## GraphQL

### 初衷和背景
随着移动用户增多, 网络请求有设备电量消耗, 弱网环境等问题. 这在当时是一个非常紧迫的issue, 于是他们研究出了GraphQL, 减小了需要发送的请求个数和数据传输量.

### GraphQL的优势
1. 客户端可以精准取到自己想要的数据, 不再多取或者少取. 多取: 取到了不需要的数据, 可能有性能, 流量问题; 少取: 需要多发请求来满足需求.
1. API有strong typed schema. 客户端可以通过schema知道API支持什么, 包括操作, 参数, 可能的响应等. 支持introspection. schema是一个API能力的contract, 不需要再额外写文档, 一旦定义好了之后, 前后端可以独立工作.
1. 强类型, 利用schema, 结合build工具, 可以在编译时期对请求进行一些检查.
1. 有助于产品快速升级迭代. 前端的改动可以不需要后端的修改.
1. 富有洞察力的数据分析: 因为可以精细地知道client要读的数据, 对数据的的使用情况可以有更深的理解. 在API改动的时候可以deprecate掉不用的数据. 也有助于后端的性能分析.
1. schema stitching: 多个不同的GraphQL的endpoints可以组合成为一个.
1. 社区支持好. 多种语言: graphql.org/code/#serve…; 多种客户端: medium.com/open-graphq…; 多种工具: Prisma, GraphQL Faker, GraphQL Playground, graphql-config.

### GraphQL的缺点
1. 可能并不适合所有类型的API. 比如认证, 授权(authentication and authorization).
1. 服务器端的性能问题.
1. 服务器端的Cache. 需要一个全局的id, 讨论见: Caching.
1. 通信的快速发展, 实现GraphQL节约的数据传输量可能不值一提, 优势不明显.

## grpc over webrtc

gRPC是一个高效的远程过程调用（RPC）框架，它允许客户端和服务器之间的相互通信，并且支持多种编程语言和平台。WebRTC则是一个开放源代码项目，提供了在网页浏览器和移动应用程序之间实现实时通信的技术。

在WebRTC的基础上，可以实现gRPC over WebRTC的通信方式，这种方式利用WebRTC提供的可靠的数据通道和流媒体通道，来传输gRPC的请求和响应数据。这种通信方式可以提供更加安全和可靠的RPC通信，同时还可以支持在Web浏览器和移动应用程序之间进行实时通信。

为了实现gRPC over WebRTC，需要使用一些开源的工具和库，如gRPC-Web、WebRTC、Protobuf等。gRPC-Web是一个在Web浏览器中使用gRPC的工具，它使用了HTTP/2协议和WebSocket技术来实现gRPC通信。WebRTC则提供了在Web浏览器和移动应用程序之间实现实时通信的技术，包括音频和视频的传输。Protobuf则是gRPC使用的序列化和反序列化工具，它可以将gRPC请求和响应数据进行序列化和反序列化，并且支持多种编程语言。

需要注意的是，实现gRPC over WebRTC的通信方式需要一定的技术基础和开发经验。如果你想了解更多关于gRPC over WebRTC的技术细节和实现方法，可以查阅相关的开源文档和参考资料。

## 进程和线程的区别

进程是对运行时程序的封装，是系统进行资源调度和分配的的基本单位，实现了操作系统的并发；

线程是进程的子任务，是CPU调度和分派的基本单位，用于保证程序的实时性，实现进程内部的并发；线程是操作系统可识别的最小执行和调度单位。

### 区别
1. 一个线程只能属于一个进程，而一个进程可以有多个线程(至少有一个线程), 线程依赖于进程而存在。
2. 进程在执行过程中拥有独立的内存单元，而多个线程共享进程的内存。 
3. 进程是资源分配的最小单位，线程是CPU调度的最小单位；
4. 系统开销： 进程切换的开销也远大于线程切换的开销。
5. 通信：由于同一进程中的多个线程具有相同的地址空间，致使它们之间的同步和通信的实现，也变得比较容易。进程间通信IPC，线程间可以直接读写进程数据段（如全局变量）来进行通信——需要进程同步和互斥手段的辅助，以保证数据的一致性。在有的系统中，线程的切换、同步和通信都无须操作系统内核的干预
6. 进程编程调试简单可靠性高，但是创建销毁开销大；线程正相反，开销小，切换速度快，但是编程调试相对复杂。
7. 进程: 进程间不会相互影响；

   线程: 一个线程挂掉将导致整个进程挂掉
8. 进程适应于多核、多机分布；线程适用于多核





[参考地址](https://cloud.tencent.com/developer/article/1688297)

### 进程间通信的方式：
进程间通信主要包括管道、系统IPC（包括消息队列、信号量、信号、共享内存等）、以及套接字socket。

1. 管道：

    1.1. 匿名管道PIPE：
    
    - 它是半双工的（即数据只能在一个方向上流动），具有固定的读端和写端
    - 它只能用于具有亲缘关系的进程之间的通信（也是父子进程或者兄弟进程之间）
    - 它可以看成是一种特殊的文件，对于它的读写也可以使用普通的read、write等函数。但是它不是普通的文件，并不属于其他任何文件系统，并且只存在于内存中。
    
    1.2. 命名管道FIFO：
    - FIFO可以在无关的进程之间交换数据
    - FIFO有路径名与之相关联，它以一种特殊设备文件形式存在于文件系统中。

2. 系统IPC：

      2.1. 消息队列
      
      消息队列，是消息的链接表，存放在内核中。
      
      特点：
      
      - 消息队列是面向记录的，其中的消息具有特定的格式以及特定的优先级。
      - 消息队列独立于发送与接收进程。进程终止时，消息队列及其内容并不会被删除。
      - 消息队列可以实现消息的随机查询,消息不一定要以先进先出的次序读取,也可以按消息的类型读取。
      
      2.2. 信号量semaphore
      
      信号量（semaphore）是一个计数器，可以用来控制多个进程对共享资源的访问。信号量用于实现进程间的互斥与同步，而不是用于存储进程间通信数据。
      
      特点：
            
      - 信号量用于进程间同步，若要在进程间传递数据需要结合共享内存。
      - 信号量基于操作系统的 PV 操作，程序对信号量的操作都是原子操作。
      - 每次对信号量的 PV 操作不仅限于对信号量值加 1 或减 1，而且可以加减任意正整数。
      - 支持信号量组。
        
      2.3. 信号signal
      
      信号是一种比较复杂的通信方式，用于通知接收进程某个事件已经发生
      
      2.4. 共享内存（Shared Memory）
      
      它使得多个进程可以访问同一块内存空间，不同进程可以及时看到对方进程中对共享内存中数据得更新。这种方式需要依靠某种同步操作，如互斥锁和信号量等
    
      特点：

      - 共享内存是最快的一种IPC，因为进程是直接对内存进行存取
      - 因为多个进程可以同时操作，所以需要进行同步
      - 信号量+共享内存通常结合在一起使用，信号量用来同步对共享内存的访问

3. 套接字SOCKET：

socket也是一种进程间通信机制，与其他通信机制不同的是，它可用于不同主机之间的进程通信。

[进程和线程](https://cloud.tencent.com/developer/article/1688297)

### 线程间通信的方式:
线程间的通信目的主要是用于线程同步，所以线程没有像进程通信中的用于数据交换的通信机制。

1. 锁机制：包括互斥锁、条件变量、读写锁

2. wait/notify 等待

3. Volatile 内存共享

4. 信号量机制(Semaphore)

5. 信号机制(Signal)

## 浏览器进程与线程
浏览器是多进程的，每一个Tab页，就是一个独立的进程

### CPU、进程、线程之间的关系

- 进程是cpu资源分配的最小单位（是能拥有资源和独立运行的最小单位）
- 线程是cpu调度的最小单位（线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程）
- 不同进程之间也可以通信，不过代价较大
- 单线程与多线程，都是指在一个进程内的单和多

### 浏览器进程
1. 主进程
- 协调控制其他子进程（创建、销毁）
- 浏览器界面显示，用户交互，前进、后退、收藏
- 将渲染进程得到的内存中的Bitmap，绘制到用户界面上
- 处理不可见操作，网络请求，文件访问等

2. 第三方插件进程
- 每种类型的插件对应一个进程，仅当使用该插件时才创建

3. GPU进程
- 用于3D绘制等

4. 渲染进程，就是我们说的浏览器内核
- 负责页面渲染，脚本执行，事件处理等
- 每个tab页一个渲染进程

[参考资料](https://juejin.cn/post/6906462594001960974)

### 渲染进程
1. GUI渲染线程

- 负责渲染页面，布局和绘制
- 页面需要重绘和回流时，该线程就会执行
- 与js引擎线程互斥，防止渲染结果不可预期

2. JS引擎线程

- 负责处理解析和执行javascript脚本程序
- 只有一个JS引擎线程（单线程）
- 与GUI渲染线程互斥，防止渲染结果不可预期

3. 事件触发线程

- 用来控制事件循环（鼠标点击、setTimeout、ajax等）
- 当处理一些不能立即执行的代码时，会将对应的任务在其可以触发的时机，添加到事件队列的末端
- 事件循环机制会在JS引擎线程空闲时，循环访问事件队列的头部，如果有函数，则会将该函数推到执行栈中并立即执行

4. 定时触发器线程

- setInterval与setTimeout所在的线程
- 定时任务并不是由JS引擎计时的，是由定时触发线程来计时的
- 计时完毕后，将回调事件放入到事件队列中

5. 异步http请求线程

- 浏览器有一个单独的线程用于处理AJAX请求
- 当请求完成时，若有回调函数，将回调事件放入到事件队列中

## 深入分析Webworker, Serviceworker, Worklet
都是HTML5的API接口, 在用途上几乎没有重叠

[mozilla web API](https://developer.mozilla.org/zh-CN/docs/Web/API)

### Webworker
Web Workers 使得一个Web应用程序可以在与主执行线程分离的后台线程中运行一个脚本操作。这样做的好处是可以在一个单独的线程中执行费时的处理任务，从而允许主（通常是UI）线程运行而不被阻塞。

它的作用就是给JS创造多线程运行环境，允许主线程创建worker线程，分配任务给后者，主线程运行的同时worker线程也在运行，相互不干扰，在worker线程运行结束后把结果返回给主线程。这样做的好处是主线程可以把计算密集型或高延迟的任务交给worker线程执行，这样主线程就会变得轻松，不会被阻塞或拖慢。这并不意味着JS语言本身支持了多线程能力，而是浏览器作为宿主环境提供了JS一个多线程运行的环境。

- 注:

因为worker一旦新建，就会一直运行，不会被主线程的活动打断，这样有利于随时响应主线程的通性，但是也会造成资源的浪费，所以不应过度使用，用完注意关闭。或者说：如果worker无实例引用，该worker空闲后立即会被关闭；如果worker实列引用不为0，该worker空闲也不会被关闭。

### Serviceworker
service worker是一种专门用于浏览器与网络和/或缓存之间的代理。

一旦被拦截，service worker可以例如通过从缓存中返回而不是进入网络来做出响应，从而使Web应用程序能够离线运行！

```
/* service-worker.js */

self.addEventListener('fetch', function(event) {
    // Return data from cache
    event.respondWith(
        caches.match(event.request);
    );
});
```

### Worklet
worklet是一个非常轻量级的，高度特定的worker。

worklet与浏览器的渲染管道挂钩，使我们能够对浏览器的渲染过程（例如样式和布局）进行低级访问。

## 怎么理解 function programing?
function programing (函数式编程)

- 函数式编程的显著特征 - 不可变|无副作用|引用透明
说的是一个函数只管接受一些入参，进行计算后吐出结果，除此以外不会对软件造成任何其他影响，把这个叫做没有副作用。

- 函数式编程的目标 - 模块化
模块化的本质是对问题进行分解，针对细粒度的子问题编程解决，然后把一个个小的解决方案整合起来，解决完整的问题。

模块化有利于复用,更加易于测试

- 将函数整合起来 - 高阶函数(Higher-order Functions)
高阶函数的定义。满足以下其中一个条件即可称为高阶函数：

1. 接受一个或者多个函数作为其入参（takes one or more functions as arguments）
1. 返回值是一个函数 （returns a function as its result）

- 缓求值（Lazy Evaluations）
假如有一个函数g(f(x))，在常规的一旦知道x的值，则立即先求出f(x)的值，再将这个值代入到g()函数中。

## 怎么做前端单元测试
目前用的最多的前端单元测试框架主要有 Jest，一部分原因是因为 create-react-app 脚手架默认内置了Jest

### 安装依赖
```
npm install --save-dev jest
```

### 不支持部分 ES6 语法
解决办法：

使用 babel 把 ES6 转成 ES5 语法，安装依赖：
```
npm install --save-dev @babel/core @babel/preset-env
```
根目录加入.babelrc
```{   "presets": ["@babel/preset-env"] }```


ts也差不多，只是插件不一样
```
安装依赖
npm install --save-dev @babel/preset-typescript

**改写 **.babelrc
{   "presets": ["@babel/preset-env", "@babel/preset-typescript"] }
```

### 如何编写单元测试
`./src/utils/fetchEnv.ts` 文件

```
/**
 * 环境参数枚举
 */
 enum IEnvEnum {
  DEV = 'dev', // 开发
  TEST = 'test', // 测试
  PRE = 'pre', // 预发
  PROD = 'prod', // 生产
}

/**
 * 根据链接获取当前环境参数
 * @param {string?} url 资源链接
 * @returns {IEnvEnum} 环境参数
 */
export function fetchEnv(url: string): IEnvEnum {
  const envs = [IEnvEnum.DEV, IEnvEnum.TEST, IEnvEnum.PRE];

  return envs.find((env) => url.includes(env)) || IEnvEnum.PROD;
}
```

#### 编写对应的单元测试

`./test/fetchEnv.test.ts` 文件

```
import { fetchEnv } from '../src/utils/fetchEnv';

describe('fetchEnv', () => {
  it ('判断是否 dev 环境', () => {
    expect(fetchEnv('https://www.imooc.dev.com/')).toBe('dev');
  });

  it ('判断是否 test 环境', () => {
    expect(fetchEnv('https://www.imooc.test.com/')).toBe('test');
  });

  it ('判断是否 pre 环境', () => {
    expect(fetchEnv('https://www.imooc.pre.com/')).toBe('pre');
  });

  it ('判断是否 prod 环境', () => {
    expect(fetchEnv('https://www.imooc.prod.com/')).toBe('prod');
  });

  it ('判断是否 prod 环境', () => {
    expect(fetchEnv('https://www.imooc.com/')).toBe('prod');
  });
});
```

[参考文档](https://juejin.cn/post/7039108357554176037#heading-16)

## 前端监控

### 为什么要做前端监控
1. 更快地发现问题。
1. 做产品决策依据。
1. 提升前端开发的技术深度和广度。
1. 为业务扩展提供更多可能性。

### 前端监控目标(监控分类)
1. 页面的性能情况：包括各阶段加载耗时，一些关键性的用户体验指标等
1. 用户的行为情况：包括PV、UV、访问来路，路由跳转等
1. 接口的调用情况：通过http访问的外部接口的成功率、耗时情况等
1. 页面的稳定情况：各种前端异常等
1. 数据上报及优化：如何将监控捕获到的数据优雅的上报

### 前端监控流程
1. 数据埋点。
1. 数据上报。
1. 分析和计算，将采集到的数据进行加工总结。
1. 可视化展示，将数据按照各种维度进行展示。
1. 监控报警，发现问题后按一定的条件触发报警。

[前端监控体系及实现技术详解](https://juejin.cn/post/6936562262480158728)

## 前端工程化、组件化、模块化的开发模式

### 工程化
前端工程化是一种高层次思想而不是某种技术，所谓前端工程化就是将前端项目当成一项系统工程进行分析、组织和构建从而达到项目结构清晰、分工明确、团队配合默契、开发效率提高的目的

### 模块化
模块化主要体现的是一种分而治之的思想。分而治之是软件工程的重要思想，是复杂系统开发和维护的基石。

#### 模块化的优势：
1. 提高维护性
1. 提高代码复用率
1. 方便依赖关系的管理
1. 可以避免变量污染，命名冲突

#### 三种模块化规范

1. CommonJS

根据 CommonJS 规范，一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义为global对象的属性。

2. AMD

AMD 即 Asynchronous Module Definition，中文名是异步模块定义的意思。AMD规范通过 define 方法去定义模块，通过require方法去加载模块。RequireJS 实现了这种规范。

3. CMD

CMD 即 Common Module Definition 通用模块定义，是 SeaJS 在推广过程中对模块定义的规范化产出。

### 组件化
1. 页面上的每个独立的、可视/可交互区域视为一个组件。
1. 每个组件对应一个工程目录,组件所需的各种资源都在这个目录下就近维护
1. 由于组件具有独立性，因此组件与组件之间可以 自由组合
1. 页面只不过是组件的容器，负责组合组件形成功能完整的界面
1. 当不需要某个组件，或者想要替换组件时，可以整个目录删除/替换
1. 组件化将页面视为一个容器，页面上各个独立部分例如：头部、导航、焦点图、侧边栏、底部等视为独立组件，不同的页面根据内容的需要,去盛放相关组件即可组成完整的页面。

# js的设计模式
------------
设计模式可以被分为三大类：创建、结构、行为范例

举例部分常用模式

## 创建范例
    创建范例包括不同的创建对象的机制。

### 单例模式
一个类只有一个实例，并提供一个访问它的全局访问点。

```
class LoginForm {
    constructor() {
        this.state = 'hide'
    }
    show() {
        if (this.state === 'show') {
            alert('已经显示')
            return
        }
        this.state = 'show'
        console.log('登录框显示成功')
    }
    hide() {
        if (this.state === 'hide') {
            alert('已经隐藏')
            return
        }
        this.state = 'hide'
        console.log('登录框隐藏成功')
    }
 }
 LoginForm.getInstance = (function () {
     let instance
     return function () {
        if (!instance) {
            instance = new LoginForm()
        }
        return instance
     }
 })()

let obj1 = LoginForm.getInstance()
obj1.show()

let obj2 = LoginForm.getInstance()
obj2.hide()

console.log(obj1 === obj2)
```
#### 优点

- 划分命名空间，减少全局变量
- 增强模块性，把自己的代码组织在一个全局变量名下，放在单一位置，便于维护
- 且只会实例化一次。简化了代码的调试和维护

#### 缺点

由于单例模式提供的是一种单点访问，所以它有可能导致模块间的强耦合 从而不利于单元测试。无法单独测试一个调用了来自单例的方法的类，而只能把它与那个单例作为一个单元一起测试。

### 工厂方法
工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。

```
class Product {
    constructor(name) {
        this.name = name
    }
    init() {
        console.log('init')
    }
    fun() {
        console.log('fun')
    }
}

class Factory {
    create(name) {
        return new Product(name)
    }
}

// use
let factory = new Factory()
let p = factory.create('p1')
p.init()
p.fun()
```

#### 优点

- 创建对象的过程可能很复杂，但我们只需要关心创建结果。
- 构造函数和创建者分离, 符合“开闭原则”
- 一个调用者想创建一个对象，只要知道其名称就可以了。
- 扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。

#### 缺点

添加新产品时，需要编写新的具体产品类,一定程度上增加了系统的复杂度
考虑到系统的可扩展性，需要引入抽象层，在客户端代码中均使用抽象层进行定义，增加了系统的抽象性和理解难度

## 结构范例
   结构范例将对象和类组合成更大的结构。

### 装饰
装饰通过增加一个修饰对象来包裹原来的对象，从而给原来的对象添加新的行为。如果你熟悉React或者高阶组件（HOC），你内心的小铃铛可能会叮当一下。

从技术上讲，React中的组件是函数而不是对象。但如果你仔细思索React上下文（React Context）或者Memo是怎么运作的，你会发现我们将组件作为子组件传入HOC后，子组件而可以访问某些功能。

在下面的例子里中ContextProvider组件接受子组件作为prop：
```
import { useState } from 'react'
import Context from './Context'

const ContextProvider: React.FC = ({children}) => {

    const [darkModeOn, setDarkModeOn] = useState(true)
    const [englishLanguage, setEnglishLanguage] = useState(true)

    return (
        <Context.Provider value={{
            darkModeOn,
            setDarkModeOn,
            englishLanguage,
            setEnglishLanguage
        }} >
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
```
然后我们包裹整个应用：

```
export default function App() {
  return (
    <ContextProvider>
      <Router>

        <ErrorBoundary>
          <Suspense fallback={<></>}>
            <Header />
          </Suspense>

          <Routes>
              <Route path='/' element={<Suspense fallback={<></>}><AboutPage /></Suspense>}/>

              <Route path='/projects' element={<Suspense fallback={<></>}><ProjectsPage /></Suspense>}/>

              <Route path='/projects/helpr' element={<Suspense fallback={<></>}><HelprProject /></Suspense>}/>

              <Route path='/projects/myWebsite' element={<Suspense fallback={<></>}><MyWebsiteProject /></Suspense>}/>

              <Route path='/projects/mixr' element={<Suspense fallback={<></>}><MixrProject /></Suspense>}/>

              <Route path='/projects/shortr' element={<Suspense fallback={<></>}><ShortrProject /></Suspense>}/>

              <Route path='/curriculum' element={<Suspense fallback={<></>}><CurriculumPage /></Suspense>}/>

              <Route path='/blog' element={<Suspense fallback={<></>}><BlogPage /></Suspense>}/>

              <Route path='/contact' element={<Suspense fallback={<></>}><ContactPage /></Suspense>}/>
          </Routes>
        </ErrorBoundary>

      </Router>
    </ContextProvider>
  )
}
```
接着，我们使用useContext钩子，使得应用内所有组件都可以获得定义在Context的状态（state）：

```
const AboutPage: React.FC = () => {

    const { darkModeOn, englishLanguage } = useContext(Context)
    
    return (...)
}

export default AboutPage
```
这个例子可能不是书的作者在写这个模式时想到的确切实现，但我相信想法是一样的：把一个对象放在另一个对象中，这样它就可以访问某些功能。;)

## 行为范式
   行为范式控制不同对象之间的通讯。
   
### 观察者
观察者模式允许你定义一个订阅机制来通知多个对象它们正在观察的对象发生的任何事件。基本上，这就像在给定对象上有一个事件侦听器，当该对象执行我们正在侦听的操作时，我们会采取一些行动。

React的useEffect钩子就是一个很好的例子。 useEffect在我们声明的那一刻执行给定的函数。

钩子分为两个主要部分：可执行函数和依赖数组。如果数组为空，如下例所示，每次渲染组件时都会执行该函数。

```
useEffect(() => { console.log('The component has rendered') }, [])
```
如果在依赖数组中声明任何变量，则该函数将仅在这些变量发生变化时执行。

```  
useEffect(() => { console.log('var1 has changed') }, [var1])
```
也可以将JavaScript的事件监听器视为观察者模式。另外，响应式编程和库如RxJS，用来处理异步信息和事件的方法也是这个模式。
   

## 面向对象

### 面向对象的三大特性
面向对象的三个基本特征是：封装、继承、多态

- 封装
封装最好理解了。封装是面向对象的特征之一，是对象和类概念的主要特性。封装，也就是把客观事物封装成抽象的类，并且类可以把自己的数据和方法只让可信的类或者对象操作，对不可信的进行信息隐藏。

- 继承
继承是指这样一种能力：它可以使用现有类的所有功能，并在无需重新编写原来的类的情况下对这些功能进行扩展。通过继承创建的新类称为“子类”或“派生类”，被继承的类称为“基类”、“父类”或“超类”。

要实现继承，可以通过“继承”（Inheritance）和“组合”（Composition）来实现。

- 多态性
多态性（polymorphisn）是允许你将父对象设置成为和一个或更多的他的子对象相等的技术，赋值之后，父对象就可以根据当前赋值给它的子对象的特性以不同的方式运作。简单的说，就是一句话：允许将子类类型的指针赋值给父类类型的指针。

实现多态，有两种方式，覆盖和重载。覆盖和重载的区别在于，覆盖在运行时决定，重载是在编译时决定。并且覆盖和重载的机制不同，例如在 Java 中，重载方法的签名必须不同于原先方法的，但对于覆盖签名必须相同。

### 面向对象的五大基本原则
1. 单一职责原则（SRP）
其核心思想为：一个类，最好只做一件事，只有一个引起它的变化。

一个类，最好有且仅有一个引起它变化的原因。

举个栗子，职员类里包括了普通员工、经理、老板，那类中势必需要用if else来区分判断，而且无论是这三种职员的需求发生变化，都会影响到整个职员类。

按照“单一职责原则”，将普通员工、经理、老板分别建一个类，既不用if else加以区分，也不会在修改某个职员类别的时候影响另一个。

2. 开放封闭原则（OCP）
其核心思想是：软件实体应该是可扩展的，而不可修改的。

一个类，可以扩展（添加属性和功能），但是不要修改已经写好的属性和方法。

实现开开放封闭原则的核心思想就是对抽象编程，而不对具体编程，因为抽象相对稳定。
打个简单的比方，X的大舅二舅都是他舅，是有血缘关系的舅舅，如果突然冒出来一个跟他有血缘关系的三舅，那也是他舅舅。同时也不能改变他大舅和二舅的亲缘关系。

3.里氏替换原则（LSP)
其核心思想是：子类必须能够替换其基类。

类A是类B的父类，那么在进行调用的时候，类A可以引用类B，但是反过来不行。

其实可以粗糙地理解为，类A就是对外提供一个接口，具体的实现在类B中。

实现的方法是面向接口编程：将公共部分抽象为基类接口或抽象类，通过Extract Abstract Class，在子类中通过覆写父类的方法实现新的方式支持同样的职责。

也就是说，其实里氏替换原则是继承和多态的综合体现。

4. 依赖倒置原则（DIP)
其核心思想是：依赖于抽象。具体而言就是高层模块不依赖于底层模块，二者都同依赖于抽象；抽象不依赖于具体，具体依赖于抽象。

在对客观事物抽象成逻辑实体时，可以先思考，同类事物的共性是什么，将这个共性作为这类事物的“高层模块”，若干不同的客观事物作为“底层模块”在依赖”高层“之后，对共性进行特定描述。

举个栗子，苹果跟西瓜都是水果，水果的共同属性是水分、糖分。在这里，”水果“作为高层模块，其属性可以在描述“苹果”和“西瓜”的时候使用，所以“苹果”“西瓜”在此是“底层模块”。

5. 接口隔离原则
其核心思想是：使用多个小的专门的接口，而不要使用一个大的总接口。

接口中定义属性和需要子类实现的方法，实现类必须完全实现接口的所有方法、属性。为什么要接口隔离呢？目的有二：

- 避免引用接口的类，需要实现其实用不到的接口方法、属性。
- 避免当接口修改的时候，有一连串的实现类需要更改。

分离的手段主要有以下两种：1、委托分离，通过增加一个新的类型来委托客户的请求，隔离客户和接口的直接依赖，但是会增加系统的开销。2、多重继承分离，通过接口多继承来实现客户的需求，这种方式是较好的。

- 委托分离，不直接使用原先的接口，可以用另外增加一个新的接口或类来实现需求。
- 多重继承分离，JDK源码、Spring框架使用了这种方式，后续的JDK源码解析系列会提及，好奇的朋友可以查看集合类的结构。

