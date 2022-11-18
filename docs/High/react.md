---
title: react
order: 4
---

## 浏览器为什么不能读取 JSX？
浏览器只能处理 JavaScript 对象，而不能读取常规 JavaScript 对象中的 JSX。所以为了使浏览器能够读取 JSX，首先，需要用像 Babel 这样的 JSX 转换器将 JSX 文件转换为 JavaScript 对象，然后再将其传给浏览器。

## 虚拟(Virtual)DOM 是什么？
虚拟(Virtual)DOM是一个轻量级的 JavaScript 对象，它是真实 DOM 的内存表示。它是调用渲染函数和在屏幕上显示元素之间的中间步骤。它类似于将元素、它们的属性和内容作为对象及其属性列出的节点树。渲染函数创建 React 组件的节点树，然后更新此节点树以响应由用户或系统执行的各种操作导致的数据模型中的突变。

### 虚拟(Virtual)DOM 的工作原理是什么？
虚拟(Virtual)DOM 分三个步骤工作：

    第1步： 每当 React App 中的任何数据发生变化时，整个 UI 都会以 Virtual DOM 表示形式重新渲染。
    
    第2步： 计算之前的 DOM 表示和新的 DOM 之间的差异。
    
    第3步： 一旦计算完成，真实的 DOM 只更新那些被改变的东西。
    
    
### 区分真实DOM和虚拟DOM。
| Real DOM    | Virtual  DOM |
| ----- | ----- |
| 1. 更新缓慢。    | 1. 更新更快。 |
| 2. 可以直接更新 HTML。    | 2. 无法直接更新 HTML。 |
| 3. 如果元素更新，则创建新DOM。    | 3. 如果元素更新，则更新 JSX 。 |
| 4. DOM操作代价很高。    | 4. DOM 操作非常简单。 |
| 5. 消耗的内存较多。    | 5. 很少的内存消耗。 |

## React 的 ES6 语法与 ES5 语法有什么不同？
React 的 ES6 语法在以下方面与 ES5 语法有所不同。
### require vs. Import
```
// ES5  
var React = require('react');  

// ES6  
import React from 'react';
```

### exports vs. export
```
// ES5  
module.exports = Component;  

// ES6  
export default Component;
```

### 组件和函数
```
// ES5  
var MyComponent = React.createClass({  
    render: function() {  
        return(  
          <h3>Hello JavaTpoint</h3>  
        );  
    }  
});  

// ES6  
class MyComponent extends React.Component {  
    render() {  
        return(  
          <h3>Hello Javatpoint</h3>  
        );  
    }  
}
```

## React的特点
React的主要功能如下：

- 它使用**虚拟DOM **而不是真正的DOM。
- 它可以用服务器端渲染。
    - React 提供了两个方法 renderToString 和 renderToStaticMarkup 用来将组件（Virtual DOM）输出成 HTML 字符串，这是 React 服务器端渲染的基础，它移除了服务器端对于浏览器环境的依赖，所以让服务器端渲染变成了一件有吸引力的事情。
- 它遵循单向数据流或数据绑定。

## 无状态组件和有状态组件的区别是什么？

## React中键的作用是什么？
密钥是唯一标识符。在 React 中，它用于识别哪些项目已从列表中更改、更新或删除。当动态创建组件或用户更改列表时，它很有用。它还有助于确定集合中的哪些组件需要重新渲染，而不是每次都重新渲染整个组件集。它提高了应用程序的性能。

## React组件生命周期的不同阶段是什么？
- 初始阶段：当组件开始其通往 DOM 的旅程时，它是 React 生命周期的诞生阶段。在这个阶段，一个组件包含默认的 Props 和初始状态。这些默认属性在组件的构造函数中完成。
- 挂载阶段：在这个阶段，组件的实例被创建并添加到 DOM 中。
- 更新阶段：这是 React 生命周期的下一个阶段。在这个阶段，我们获得了新的 Props 并改变了状态。只有当道具或状态发生变化时，这个阶段才有可能更新和重新渲染。此阶段的主要目的是确保组件显示其自身的最新版本。这个阶段一次又一次地重复。
- 卸载阶段：这是 React 生命周期的最后一个阶段，组件实例在此阶段被销毁并从 DOM 中卸载(移除)。
### React组件的生命周期方法是什么？
旧：

    getInitialState()： 用于指定 this.state 的默认值。它在创建组件之前执行。
    componentWillMount()： 在组件渲染到 DOM 之前执行。
    componentDidMount()： 当组件被渲染并放置在 DOM 上时执行。可以进行任何 DOM 查询操作。
    componentWillReceiveProps()： 当组件从父类接收到新的 props 并且在调用另一个渲染之前调用它。如果要更新 State 以响应 prop 更改，则应比较 this.props 和 nextProps 以使用 this.setState() 方法执行 State 转换。
    shouldComponentUpdate()：当组件决定对 DOM 进行任何更改/更新时调用它，并根据特定条件返回 true 或 false 值。如果此方法返回 true，则组件将更新。否则，组件将跳过更新。
    componentWillUpdate()： 在 DOM 中进行渲染之前调用它。不能通过调用 this.setState() 方法来更改组件状态。如果 shouldComponentUpdate() 返回 false，它将不会被调用。
    componentDidUpdate()： 渲染发生后立即调用。在此方法中，可以将任何要在更新发生后执行的代码放入其中。
    componentWillUnmount()： 在组件被永久销毁和卸载之前立即调用它。它用于清理内存空间，例如使定时器失效、事件监听器、取消网络请求或清理 DOM 元素。如果组件实例已卸载，则无法再次安装它。

新：

## 组件概念

### 纯组件是什么？
React 15.3 版本中引入的纯组件。React.Component 和 React.PureComponent 的不同在于 shouldComponentUpdate() React 生命周期方法。此方法通过返回一个布尔值(true 或 false)来决定组件的重新渲染。在 React.Component 中， shouldComponentUpdate()方法默认返回 true。但是在 React.PureComponent 中，它会比较 state 或 props 的变化来重新渲染组件。纯组件增强了代码的简单性和应用程序的性能。

纯（Pure） 组件是可以编写的最简单、最快的组件。它们可以替换任何只有 render() 的组件。这些组件增强了代码的简单性和应用的性能。

### 高阶组件(HOC)是什么？
在 React 中，高阶组件是一种重用组件逻辑的高级技术。它是一个接受一个组件并返回一个新组件的函数。换句话说，它是一个接受另一个函数作为参数的函数。根据官网的说法，它不是 React API 中的特性(部分)，而是从 React 的组合性质中出现的一种模式。

### 可以用 HOC 做什么？
HOC可用于许多任务，例如：

- 代码重用，逻辑和引导抽象
- 渲染劫持
- 状态抽象和控制
- Props 控制

## 为什么片段比容器 div 更好？
片段更快并且消耗更少的内存，因为它没有创建额外的 DOM 节点。
一些 CSS 样式如 CSS Grid 和 Flexbox 具有特殊的父子关系，并在中间添加 <div> 标签，这使得难以保持所需的布局。
DOM Inspector 不那么杂乱。

### 片段(fragments)是什么
片段是在 React 16.2 版本中引入的。在 React 中，片段用于组件返回多个元素。它允许您对包含多个子项的列表进行分组，而无需向 DOM 添加额外的节点。
```
render() {  
  return (  
    <React.Fragment>  
      <ChildA />  
      <ChildB />  
      <ChildC />  
    </React.Fragment>  
  )  
}
```
或者
```
render() {  
  return (  
    <>  
      <ChildA />  
      <ChildB />  
      <ChildC />  
    </>  
  )  
}
```

## create-react-app是什么？
Create React App 是 Facebook 推出的用于构建 React 应用程序的工具。它为提供创建单页 React 应用程序。create-react-app 是预配置的，它可以让开发者免于像 Webpack 或 Babel 这样耗时的设置和配置。需要运行一个命令来启动 React 项目，如下所示：
    
    $ npx create-react-app my-app
  

## 什么时候应该使用类组件而不是函数组件？
如果一个组件需要状态或生命周期方法，应该使用类组件； 否则，使用函数组件。但是，在 React 16.8 之后，通过添加 Hooks，可以在函数组件中使用状态、生命周期方法和其他仅在类组件中可用的功能。 

### 什么时候应该使用类组件而不是hooks

## React Hooks有了解么？

## React 中的 refs 是什么？
Refs 是 React 中用于引用的简写。它是一个属性，有助于存储对特定 DOM 节点或 React 元素的引用。它提供了一种访问 React DOM 节点或 React 元素以及如何与之交互的方法。当我们想要更改子组件的值而不使用 props 时使用它。

### React 中如何创建Refs？
可以使用 React.createRef() 创建 Refs 并通过 ref 属性附加到 React 元素。它通常在创建组件时分配给实例属性，然后可以在整个组件中引用。

```

```

### Ref转发是什么？

### Refs 有什么用？
- 它用于返回对元素的引用。
- 当需要 DOM 测量时使用它，例如管理焦点、文本选择或媒体播放。
- 它用于触发命令式动画。
- 它在与第三方 DOM 库集成时使用。
- 它也可以在回调中使用 as。

## React Router是什么？
React Router 是一个建立在 React 之上的标准路由库系统。它用于使用 React Router Package 在 React 应用程序中创建路由。它可以帮助您在应用程序中定义多个路线。它为浏览器上的同步 URL 提供将在网页上显示的数据。它维护应用程序的标准结构和行为，主要用于开发单页 Web 应用程序。

### 为什么需要 React 中的路由器？
React Router 在单个页面应用程序中显示多个视图方面起着重要作用。它用于在应用程序中定义多个路由。当用户在浏览器中键入特定 URL 时，如果此 URL 路径与路由器文件中的任何“路由”匹配，则用户将被重定向到该特定路由。因此，我们需要向 React 应用程序添加一个 Router 库，它允许创建多个路由，每个路由都指向一个唯一的视图。

```
<switch>  
      <h1>React Router Example</h1>  
      <Route path="/" component={Home} />  
      <Route path="/about" component={About} />  
      <Route path="/contact" component={Contact} />  
</switch>
```
### React Router 的优点是什么？
### React 路由与传统路由有何不同？

| 常规路由 |	React 路由 |
| ------- | -------- |
| 在常规路由中，每个视图都包含一个新文件。 |	在 React 路由中，只涉及一个 HTML 页面。|
| HTTP 请求被发送到服务器以接收相应的 HTML 页面。|	只有历史属性 ```<BrowserRouter>``` 被更改。|
| 在这种情况下，用户为每个视图浏览不同的页面。|	在这种情况下，用户认为他正在浏览不同的页面，但这只是一种错觉。|

## 如何在React中模块化代码？

## 状态和属性有什么区别?

### 我们为什么不能直接更新状态?

## react-dom 包的用途是什么?

### react-dom 中 render 方法的目的是什么?

### 在 React 中如何使用 innerHTML?
dangerouslySetInnerHTML 属性是 React 用来替代在浏览器 DOM 中使用 innerHTML。与 innerHTML 一样，考虑到跨站脚本攻击（XSS），使用此属性也是有风险的。使用时，你只需传递以 __html 作为键，而 HTML 文本作为对应值的对象。

在本示例中 MyComponent 组件使用 dangerouslySetInnerHTML 属性来设置 HTML 标记：

```
function createMarkup() {
  return { __html: 'First &middot; Second' }
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />
}
```

##  解释一下 Flux

##  解释一下 Redux

### Redux connect 做了什么

### Redux 怎么做到每个组件可以访问的 store 的

### 如何在 Redux 中定义 Action？

### 解释 Reducer 的作用。
Reducers 是纯函数，它规定应用程序的状态怎样因响应 ACTION 而改变。Reducers 通过接受先前的状态和 action 来工作，然后它返回一个新的状态。它根据操作的类型确定需要执行哪种更新，然后返回新的值。如果不需要完成任务，它会返回原来的状态。

### Store 在 Redux 中的意义是什么？
Store 是一个 JavaScript 对象，它可以保存程序的状态，并提供一些方法来访问状态、调度操作和注册侦听器。应用程序的整个状态/对象树保存在单一存储中。因此，Redux 非常简单且是可预测的。我们可以将中间件传递到 store 来处理数据，并记录改变存储状态的各种操作。所有操作都通过 reducer 返回一个新状态。

###  Redux遵循的三个原则
1. **单一事实来源：** 整个应用的状态存储在单个 store 中的对象/状态树里。单一状态树可以更容易地跟踪随时间的变化，并调试或检查应用程序。
1. **状态是只读的：** 改变状态的唯一方法是去触发一个动作。动作是描述变化的普通 JS 对象。就像 state 是数据的最小表示一样，该操作是对数据更改的最小表示。
1. **使用纯函数进行更改：** 为了指定状态树如何通过操作进行转换，你需要纯函数。纯函数是那些返回值仅取决于其参数值的函数。

### Redux与Flux有何不同？
|Flux | Redux |
| ---- | ---- |
|1. Store 包含状态和更改逻辑 | 1. Store 和更改逻辑是分开的 |
|2. 有多个 Store | 2. 只有一个 Store |
|3. 所有 Store 都互不影响且是平级的 | 3. 带有分层 reducer 的单一 Store |
|4. 有单一调度器 | 4. 没有调度器的概念 |
|5. React 组件订阅 store | 5. 容器组件是有联系的 |
|6. 状态是可变的 | 6. 状态是不可改变的 |

### Redux 有哪些优点？
Redux 的优点如下：

- 结果的可预测性 -  由于总是存在一个真实来源，即 store ，因此不存在如何将当前状态与动作和应用的其他部分同步的问题。
- 可维护性 -  代码变得更容易维护，具有可预测的结果和严格的结构。
- 服务器端渲染 -  你只需将服务器上创建的 store 传到客户端即可。这对初始渲染非常有用，并且可以优化应用性能，从而提供更好的用户体验。
- 开发人员工具 -  从操作到状态更改，开发人员可以实时跟踪应用中发生的所有事情。
- 社区和生态系统 -  Redux 背后有一个巨大的社区，这使得它更加迷人。一个由才华横溢的人组成的大型社区为库的改进做出了贡献，并开发了各种应用。
- 易于测试 -  Redux 的代码主要是小巧、纯粹和独立的功能。这使代码可测试且独立。
- 组织 -  Redux 准确地说明了代码的组织方式，这使得代码在团队使用时更加一致和简单。

## setState的更新是同步还是异步的？

### 调用 setState 之后发生了什么？
1. React 会将传入的参数对象与组件当前的状态合并产生了新的state

2. 生成新的虚拟DOM树  ==> render()

3. 计算出新树与老树的节点差异，然后做真实DOM的差异更新

### React componentWillMount 做 setState 会干嘛

## React中跨组件通信有哪些方案？分别介绍原理和应用场景？

## 请说一下你在项目中写过的高阶组件和渲染劫持功能？

## 说一下你了解的React状态管理库以及原理和应用场景？

## React是如何渲染和调度更新的？

## Fiber
### 请说一下你对Fiber的理解？你认为Vue会引入Fiber吗？为什么?
### 请说一下Fiber 架构下 Concurrent 模式的实现原理？

## 请说一下你对React合成事件的理解？

## React不同版本的DOM-DIFF算法分别是怎么样的?与Vue等其它框架相比有哪些优缺点?

## 如何避免React应用出现白屏？如何更优雅的处理异常？

## 如何进行React的性能分析、监控和性能优化？
