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
**从技术角度而言，http1.1和2.0 最大的区别是二进制框架层。与 http1.1把所有请求和响应作为纯文本不同，http2 使用二进制框架层把所有消息封装成二进制，且仍然保持http语法，消息的转换让http2能够尝试http1.1所不能的传输方式。**

主要就是http2升级的几个方面来讲:
1. 流水线和队头阻塞
- http1.1: 
客户端首次接受的响应常常不能完全渲染。相反，它包含一些其他需要的资源。 因此，客户端必须发出一些其他请求。 Http1.0客户端的每一个请求必须重新连接，这是非常耗时和资源的。
         
Http1.1 通过引入长连接和流水线技术处理了这个问题。 通过长连接，http1.1假定这个tcp连接应该一直打开直到被通知关闭。 这就允许客户端通过同一连接发送多个请求。不巧的是，这优化策略有个瓶颈。当一个队头的请求不能收到响应的资源，它将会阻塞后面的请求。这就是知名的队头阻塞问题。虽然添加并行的tcp连接能够减轻这个问题，但是tcp连接的数量是有限的，且每个新的连接需要额外的资源。
 
- http2:    
在http2 ， 二进制框架层编码 请求和响应 并把它们分成更小的包，能显著的提高传输的灵活性。

与http1.1利用多个tcp连接来减少队头阻塞的影响相反，http2在两端建立一个单独的连接。该连接包含多个数据流。 每个流包含多个请求/响应格式的消息 。 最终，每个消息被划分为更小的帧单元。

2. 优先级
Http2协议允许客户端在运行时根据用户交互重新分配权重和改变依赖。 然而，服务器端会改变优先级根据如果某个流因为请求特定资源被阻塞。

3. 缓冲区溢出
- http1.1: 
http1.1流控制基于tcp连接。当连接建立时，两端通过系统默认机制建立缓冲区。 并通过ack报文来通知对方接收窗口大小。

因为Http1.1 依靠传输层来避免流溢出，每个tcp连接需要一个独立的流控制机制。

- http2: 
http2通过一个连接来多路复用。 结果是在传输层的tcp连接不足以管理每个流的发送。http2允许客户端和服务器端实现他们自己的流控制机制，而不是依赖传输层。两端在传输层交换可用的缓冲区大小，来让他们在多路复用流上设置自己的接收窗口。
   
4. 预测资源请求
- http1.1 资源内联: 
如果开发者提前知道客户机器需要哪些额外的资源来渲染界面，他们使用资源内联的技术来包含需要的资源。例如：如果一个客户需要一个特定的CSS文件，内联该文件就可以不通过请求来拿到，减少客户端必须发送的请求数。

该技术对于小文件是可行的，但是大文件会降低连接的速度。还可能造成文件多次请求。

- http2  服务器推送: 
因为http2支持多个并发响应，服务器可以提前把HTML 页面中的其他资源在客户端请求之前发给它。

服务器先发送一个PUSH_PROMISE 帧通知客户端将推送资源。该帧只包含头消息，且允许用户提前知道哪些资源将会推送。如果客户端已经缓存，可以拒绝该推送。

5. 压缩技术
- http1.1: 
Gzip已经被用于压缩http消息很久了，特别是减少CSS和JS脚本的文件。然而消息头部分依然是纯文本发送。尽管每个头都很小，但随着请求越来越多，连接的负担就会越重，如果带了cookie. Header将变得更大。

- http2:  
Http2 的二进制框架层在细节上表现出强大的控制力，在头压缩上也是如此。 http2 能把头从他们的数据中分离，并封城头帧和数据帧。 http2特定的压缩程序HPACK可以压缩头帧。 该算法用Huffman编码头metadata，可以很大程度上减少头大小。此外， HPACK可以跟踪先前传输的metadata字段，然后通过动态改变服务器端和客户端共享的索引来进一步压缩

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
unshift、push、shift、pop，splice

- splice
splice(m,n,e1,e2,e3) 从索引m（包括）到n（不包括）的元素删除数组，再在该位置处添加e1，e2，e3。若n传入0，则只增加；若只传m和n，则只删除；若只传m，则从m位置删除到末位。放回删除元素数组

### 不改变
slice， concat，indexOf 和 includes，filter、find 和 findIndex,of 和 from, some 和 every, map 和 forEach

- slice
slice(m, n)返回原数组索引m（包含）到n（不包含）的元素数组。不传参数默认全部截取，只传一个参数，从该位置截取到末位。类似于String.prototype.substring

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

## 同源策略
同源是指 同协议 、同域名、同端口。
### 跨域有哪些方法？
1. JSONP
利用 <script> 标签没有跨域的限制，缺点是仅支持get方法具有局限性,不安全可能会遭受XSS攻击。
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
