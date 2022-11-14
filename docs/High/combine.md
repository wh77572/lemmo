---
title: 组合拳
order: 6
---

## 输入一个URL到页面过程中发生了什么？
1. 输入地址

2. 浏览器查找域名的 IP 地址

3. 浏览器向 web 服务器发送一个 HTTP 请求

4. TCP 三次握手

5. HTTPS 的 TLS 四次握手

6. 发送 HTTP 请求

7. 服务器处理请求并返回 HTTP 报文

8. 断开连接

9. 浏览器解析渲染页面

[参考链接](https://zhuanlan.zhihu.com/p/133906695)

## http
HTTP协议，即超文本传输协议(Hypertext transfer protocol)。是一种详细规定了浏览器和万维网(WWW = World Wide Web)服务器之间互相通信的规则，通过因特网传送万维网文档的数据传送协议。

HTTP是一个应用层协议，由请求和响应构成，是一个标准的客户端服务器模型。HTTP是一个无状态的协议。

### http 2.0
http2.0是一种安全高效的下一代http传输协议。安全是因为http2.0建立在https协议的基础上，高效是因为它是通过二进制分帧来进行数据传输。正因为这些特性，http2.0协议也在被越来越多的网站支持。据统计，截止至2018年8月，已经有27.9%的网站支持http2.0。

    http2.0优化内容
- 二进制分帧（Binary Format）- http2.0的基石
- 多路复用 (Multiplexing) / 连接共享
- 头部压缩（Header Compression）
- 请求优先级（Request Priorities）
  - 优先级最高：主要的html
  - 优先级高：CSS文件
  - 优先级中：js文件
  - 优先级低：图片
- 服务端推送（Server Push）

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

## 前端安全

### XSS
XSS全称(Cross Site Scripting)跨站脚本攻击，是前端最常见的安全问题。XSS是一种在web应用中的计算机安全漏洞，它允许恶意web用户将代码植入到提供给其它用户使用的页面中，攻击者通过注入非法的html标签或者javascript代码，从而当用户浏览该网页时，控制用户浏览器。

#### 类别
1. DOM型xss
2. 反射型xss
3. 存储型xss

#### 解决方案
1. 过滤
2. 编码
3. httpOnly

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

## js的设计模式
设计模式可以被分为三大类：创建、结构、行为范例

举例部分常用模式
### 创建范例
    创建范例包括不同的创建对象的机制。

#### 单例模式
#### 工厂方法
#### 策略模式
#### 发布-订阅模式

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

### 连续触发的事件在某一时间段内只发生一次
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

### 使用场景

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
