---
title: react
order: 4
---
[React Guidebook](https://tsejx.github.io/react-guidebook/foundation/main-concepts/lifecycle/)

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

- 装载阶段 Mounting
    - constructor
    - static getDerivedStateFromProps
    - ⚠️ UNSAFE_componentWillMount
    - render
    - componentDidMount
- 更新阶段 Updating
    - ⚠️ UNSAFE_componentWillReceiveProps
    - static getDerivedStateFromProps
    - shouldComponentUpdate
    - ⚠️ UNSAFE_componentWillUpdate
    - render
    - getSnapshotBeforeUpdate
    - componentDidUpdate
- 卸载阶段 Unmounting
    - componentWillUnmount
- 捕捉错误 Error Handling
    - static getDerivedStateFromError
    - componentDidCatch

### render
- 控制你传进来的容器节点里的内容。第一次被调用时，内部所有已经存在的 DOM 元素都会被替换掉。之后的调用会使用 React 的 DOM 比较算法进行高效的更新。
- 不会修改容器节点（只修改容器的子项）。你可以在不覆盖已有子节点的情况下添加一个组件到已有的 DOM 节点中去。
- 目前会返回一个引用，指向 ReactComponent 的根实例。但是这个返回值是历史遗留，应该避免使用。因为未来版本的 React 可能会在某些情况下进行异步渲染。如果你真的需要一个指向 ReactComponent 的根实例的引用，推荐的方法是天假一个 callback 到根元素上。

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

## React Hooks有了解么？
### 生命周期方法要如何对应到 Hook？
- constructor：函数组件不需要构造函数。你可以通过调用 useState 来初始化 state。如果计算的代价比较昂贵，你可以传一个函数给 useState。
- getDerivedStateFromProps：改为 在渲染时 安排一次更新。
- shouldComponentUpdate：详见 下方 React.memo.
- render：这是函数组件体本身。
- componentDidMount, componentDidUpdate, componentWillUnmount：useEffect Hook 可以表达所有这些(包括 不那么 常见 的场景)的组合。
- getSnapshotBeforeUpdate，componentDidCatch 以及 getDerivedStateFromError：目前还没有这些方法的 Hook 等价写法，但很快会被添加。

[React hook](https://zh-hans.reactjs.org/docs/hooks-faq.html#which-versions-of-react-include-hooks)

## React 中的 refs 是什么？
Refs 是 React 中用于引用的简写。它是一个属性，有助于存储对特定 DOM 节点或 React 元素的引用。它提供了一种访问 React DOM 节点或 React 元素以及如何与之交互的方法。当我们想要更改子组件的值而不使用 props 时使用它。

### Refs 有什么用？
- 它用于返回对元素的引用。
- 当需要 DOM 测量时使用它，例如管理焦点、文本选择或媒体播放。
- 它用于触发命令式动画。
- 它在与第三方 DOM 库集成时使用。
- 它也可以在回调中使用 as。

### 何时使用 Refs
下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

### React 中如何创建Refs？
Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

### createRef跟useRef区别
- createRef 只能用在class组件中，useRef 只能用在函数式组件中。
- createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用。

useRef妙用
- useRef 不仅仅是用来管理 DOM ref 的，它还相当于 this , 可以存放任何变量.  
- useRef 可以很好的解决闭包带来的不方便性. 你可以在各种库中看到它的身影,   比如 react-use 中的 useInterval , usePrevious …… 

### 回调 Refs
React 支持 回调 refs 的方式设置 Refs。这种方式可以帮助我们更精细的控制何时 Refs 被设置和解除。

使用 回调 refs 需要将回调函数传递给 React元素 的 ref 属性。这个函数接受 React 组件实例 或 HTML DOM 元素作为参数，将其挂载到实例属性上，如下所示：

```
import React from 'react';

export default class MyInput extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = null;
        this.setTextInputRef = (ele) => {
            this.inputRef = ele;
        }
    }

    componentDidMount() {
        this.inputRef && this.inputRef.focus();
    }
    render() {
        return (
            <input type="text" ref={this.setTextInputRef}/>
        )
    }
}
```
React 会在组件挂载时，调用 ref 回调函数并传入 DOM元素(或React实例)，当卸载时调用它并传入 null。在 componentDidMount 或 componentDidUpdate 触发前，React 会保证 Refs 一定是最新的。

### Refs 与函数组件 (forwardRef)
**默认情况下，你不能在函数组件上使用 ref 属性，因为它们没有实例：**

如果要在函数组件中使用 ref，你可以使用 forwardRef（可与 useImperativeHandle 结合使用），或者可以将该组件转化为 class 组件。

```
const FancyInput=(props, ref) =>{
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} />;
}

export default forwardRef(FancyInput);
```

### Ref转发是什么？
Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧。

## memo、useMemo及 useCallback解析
useCallback 和 useMemo 都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo 返回缓存的 变量，useCallback 返回缓存的 函数

### React.memo()
在 class 组件时代，为了性能优化我们经常会选择使用 PureComponent,每次对 props 进行一次浅比较，当然，除了 PureComponent 外，我们还可以在 shouldComponentUpdate 中进行更深层次的控制。

在 Function 组件中， React 贴心的提供了 React.memo 这个 HOC（高阶组件），与 PureComponent 很相似，但是是专门给 Function Component 提供的，对 Class Component 并不适用。

但是相比于 PureComponent ，React.memo() 可以支持指定一个参数，可以相当于 shouldComponentUpdate 的作用，因此 React.memo() 相对于 PureComponent 来说，用法更加方便。

```
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```

### 总结
- 在子组件不需要父组件的值和函数的情况下，只需要使用 memo 函数包裹子组件即可。
- 如果有函数传递给子组件，使用 useCallback
- 如果有值传递给子组件，使用 useMemo
- useEffect、useMemo、useCallback 都是自带闭包的。也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(state, props)，所以每一次这三种hooks的执行，反映的也都是当前的状态，你无法使用它们来捕获上一次的状态。对于这种情况，我们应该使用 ref 来访问。

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
- 在这种情况下，无需手动设置浏览器历史记录。
- 链接用于导航应用程序中的内部链接。它类似于锚标记。
- 它使用 Switch 功能进行渲染。
- 路由器只需要一个子元素。
- 在此，每个组件都在 `<Route>` 中指定。
这些包分为三个包，分别是 Web、Native 和 Core。它支持 React 应用程序的紧凑尺寸。

### React 路由与传统路由有何不同？

| 常规路由 |	React 路由 |
| ------- | -------- |
| 在常规路由中，每个视图都包含一个新文件。 |	在 React 路由中，只涉及一个 HTML 页面。|
| HTTP 请求被发送到服务器以接收相应的 HTML 页面。|	只有历史属性 ```<BrowserRouter>``` 被更改。|
| 在这种情况下，用户为每个视图浏览不同的页面。|	在这种情况下，用户认为他正在浏览不同的页面，但这只是一种错觉。|

## 状态和属性有什么区别?
state 和 props 都是普通的 JavaScript 对象。虽然它们都保存着影响渲染输出的信息，但它们在组件方面的功能不同。Props 以类似于函数参数的方式传递给组件，而状态则类似于在函数内声明变量并对它进行管理。

### 我们为什么不能直接更新状态?
State 的更新是异步的，直接更新不会重新渲染组件。

## react-dom 包的用途是什么?
react-dom 包提供了用户 DOM 的特定方法，可以在你应用程序的顶层进行使用，如果你有需要的话，还可以作为应急方案，在 React 模型以外的地方使用。

### react-dom 中 render 方法的目的是什么?
``注意：在 React 18 中，render 函数已被 createRoot 函数所取代。具体请参阅 createRoot 以了解更多。``

render() 目前会返回对根组件 ReactComponent 实例的引用。 但是，目前应该避免使用返回的引用，因为它是历史遗留下来的内容，而且在未来版本的 React 中，组件渲染在某些情况下可能会是异步的。 如果你真的需要获得对根组件 ReactComponent 实例的引用，那么推荐为根元素添加 callback ref。

使用 render() 对服务端渲染容器进行 hydrate 操作的方式已经被废弃，并且会在 React 17 被移除。作为替代，请使用 hydrateRoot()。

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

##  解释一下 Redux
[Redux](https://cn.redux.js.org/tutorials/essentials/part-1-overview-concepts/)

### Redux connect 做了什么
react-redux 提供了两个重要的对象， Provider 和 connect ，前者使 React 组件可被连接（connectable），后者把 React 组件和 Redux 的 store 真正连接起来。

connect方法声明：
```
connect([mapStateToProps], [mapDispatchToProps], [mergeProps],[options])
```
作用：连接React组件与 Redux store。

参数说明：

    mapStateToProps(state, ownProps) : stateProps
    
这个函数允许我们将 store 中的数据作为 props 绑定到组件上。
```
const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}
```

### Redux 怎么做到每个组件可以访问的 store 的
把所有内容包裹在 Provider 组件中，将之前创建的 store 作为 prop传给 Provider 。
[Redux](https://juejin.cn/post/6844903505191239694#heading-4)

### 如何在 Redux 中定义 Action？
Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。

    import { ADD_TODO, REMOVE_TODO } from '../actionTypes'

Action 创建函数

```
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

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

### react 的useState 钩子，底层是怎么实现
用于定义组件的 State，对标到类组件中this.state的功能

```
function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

let state;

function useState(initialState){
  state = state || initialState;

  function setState(newState) {
    state = newState;
    render();
  }

  return [state, setState];
}

render(); // 首次渲染
```

### React componentWillMount 做 setState 会干嘛
componentWillMount中若使用setState，其state会被合并到初始数据当中。

## 说一下你了解的React状态管理库以及原理和应用场景？
在学习 Redux 之前需要先理解其大致工作流程，一般来说是这样的：

1. 用户在页面上进行某些操作，通过 dispatch 发送一个 action。

1. Redux 接收到这个 action 后通过 reducer 函数获取到下一个状态。

1. 将新状态更新进 store，store 更新后通知页面进行重新渲染。

### 三大原则
- 单一数据源
在 Redux 中，所有的状态都放到一个 store 里面，一个应用中一般只有一个 store。

- State 是只读的
在 Redux 中，唯一改变 state 的方法是通过 dispatch 触发 action，action 描述了这次修改行为的相关信息。只允许通过 action 修改可以避免一些 mutable 的操作，保证状态不会被随意修改

- 通过纯函数来修改
为了描述 action 使状态如何修改，需要你编写 reducer 函数来修改状态。reducer 函数接收前一次的 state 和 action，返回新的 state。无论被调用多少次，只要传入相同的 `state 和 action，那么就一定返回同样的结果。

这三个原则使得 Redux 状态是可预测的，很容易实现时间旅行，但也带来了一些弊端，那就是上手难度比较高，模板代码太多，需要了解 `action、reducer、middleware 等概念。

[React状态](https://github.com/yinguangyao/blog/issues/56)

## React是如何渲染和调度更新的？
### React 15
- 架构分层
React 15版本(Fiber以前)整个更新渲染流程分为两个部分：

1. Reconciler(协调器); 负责找出变化的组件
1. Renderer(渲染器); 负责将变化的组件渲染到页面上

- Reconciler
在React中可以通过setState、forceUpdate、ReactDOM.render来触发更新。每当有更新发生时，Reconciler会做如下工作：

1. 调用组件的render方法，将返回的JSX转化为虚拟DOM
1. 将虚拟DOM和上次更新时的虚拟DOM对比
1. 通过对比找出本次更新中变化的虚拟DOM
1. 通知Renderer将变化的虚拟DOM渲染到页面上

- Renderer
在对某个更新节点执行玩Reconciler之后，会通知Renderer根据不同的"宿主环境"进行相应的节点渲染/更新。

**React 15的缺陷**

React 15的diff过程是 递归执行更新 的。由于是递归，一旦开始就"无法中断" 。当层级太深或者diff逻辑(钩子函数里的逻辑)太复杂，导致递归更新的时间过长，Js线程一直卡主，那么用户交互和渲染就会产生卡顿。

### React 16
React15架构不能支撑异步更新以至于需要重构，于是React16架构改成分为三层结构：

- Scheduler(调度器);调度任务的优先级，高优任务优先进入Reconciler
- Reconciler(协调器);负责找出变化的组件
- Renderer(渲染器);负责将变化的组件渲染到页面上

#### Scheduler
React 15对React 16提出的需求是Diff更新应为可中断的，那么此时又出现了两个新的两个问题:中断方式和判断标准;

React团队采用的是 合作式调度，即主动中断和控制器出让。判断标准为超时检测。同时还需要一种机制来告知中断的任务在何时恢复/重新执行。 React 借鉴了浏览器的requestIdleCallback接口，当浏览器有剩余时间时通知执行。

由于一些原因React放弃使用rIdc，而是自己实现了功能更完备的polyfill，即Scheduler。除了在空闲时触发回调的功能外，Scheduler还提供了多种调度优先级供任务设置。

- Reconciler
在React 15中Reconciler是递归处理Virtual DOM的。而React16使用了一种新的数据结构：Fiber。Virtual DOM树由之前的从上往下的树形结构，变化为基于多向链表的"图"。
```
function workLoopConcurrent() {
    // Perform work until Scheduler asks us to yield
    while (workInProgress !== null && !shouldYield()) {
        workInProgress = performUnitOfWork(workInProgress);
    }
}
```

Renderer(Commit)
Renderer根据Reconciler为Virtual DOM打的标记，同步执行对应的渲染操作。
对于我们在上一节使用过的例子，在React 16架构中整个更新流程为：

1. setState产生一个更新，更新内容为：state.count从1变为2
1. 更新被交给Scheduler，Scheduler发现没有其他更高优先任务，就将该任务交给Reconciler
1. Reconciler接到任务，开始遍历Virtual DOM，判断哪些Virtual DOM需要更新，为需要更新的Virtual DOM打上标记
1. Reconciler遍历完所有Virtual DOM，通知Renderer
1. Renderer根据Virtual DOM的标记执行对应节点操作

其中步骤2、3、4随时可能由于如下原因被中断：

- 有其他更高优先任务需要先更新
- 当前帧没有剩余时间

由于Scheduler和Reconciler的工作都在内存中进行，不会更新页面上的节点，所以用户不会看见更新不完全的页面。

### 请说一下Fiber 架构下 Concurrent 模式的实现原理？
Concurrent 模式（异步渲染）下的"时间切片"和"优先级"

### 时间切片
时间切片的核心思想是：如果任务不能在 50 毫秒内执行完，那么为了不阻塞主线程，这个任务应该让出主线程的控制权，使浏览器可以处理其他任务。让出控制权意味着停止执行当前任务，让浏览器去执行其他任务，随后再回来继续执行没有执行完的任务。

### 如何使用时间切片
时间切片是一种概念，也可以理解为一种技术方案，它不是某个 API 的名字，也不是某个工具的名字。

事实上，时间切片充分利用了“异步”，在早期，可以使用定时器来实现，例如：

// 如果利用时间分片的概念来实现这个功能，我们可以使用requestAnimationFrame+DocumentFragment

```
btn.onclick = function () {
  someThing(); // 执行了50毫秒
  setTimeout(function () {
    otherThing(); // 执行了50毫秒
  });
};
```

[参考资料](https://blog.ahulib.com/other/React_Fiber%E6%9E%B6%E6%9E%84%E4%B8%8B%E7%9A%84Concurrent%E6%A8%A1%E5%BC%8F.html)

## React事件机制
React事件机制包括事件注册、事件的合成、事件冒泡、事件派发等

### 请说一下你对React合成事件的理解？
合成事件是 React模拟原生 DOM事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器

根据 W3C规范来定义合成事件，兼容所有浏览器，拥有与浏览器原生事件相同的接口.

## 如何避免React应用出现白屏？如何更优雅的处理异常？
部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，为了解决这个问题，React 16 引入了一个新的概念 —— 错误边界(Error Boundaries)。

React 15 中有一个支持有限的错误边界方法 unstable_handleError。此方法不再起作用，同时自 React 16 beta 发布起你需要在代码中将其修改为 componentDidCatch。

## 如何进行React的性能分析、监控和性能优化？
一般来说，首先应该用 React Profiler 进行 React 层面的问题筛查，这样更直观，更容易定位问题。如果某些问题跳出了 React 框架范围，或者不再能以组件粒度进行度量，我们可以回到 Performance 面板进行通用性能分析。


