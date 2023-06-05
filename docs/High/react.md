---
title: react
order: 4
---
[React Guidebook](https://tsejx.github.io/react-guidebook/foundation/main-concepts/lifecycle/)

## React和原生js的区别
我觉得最大的区别就是React使用了虚拟dom，每次渲染的时候减少了重绘次数，这样节省了内存，提升了加载速度. 而真实dom的元素体积较大，不轻易使用js加载页面

其次React框架里面只有一个div是html，其余所有内容都由js生成

最后React是基于组件的，提升了代码的复用性

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
    getInitialState()： 用于指定 this.state 的默认值。它在创建组件之前执行。
    componentWillMount()： 在组件渲染到 DOM 之前执行。
    componentDidMount()： 当组件被渲染并放置在 DOM 上时执行。可以进行任何 DOM 查询操作。
    componentWillReceiveProps()： 当组件从父类接收到新的 props 并且在调用另一个渲染之前调用它。如果要更新 State 以响应 prop 更改，则应比较 this.props 和 nextProps 以使用 this.setState() 方法执行 State 转换。
    shouldComponentUpdate()：当组件决定对 DOM 进行任何更改/更新时调用它，并根据特定条件返回 true 或 false 值。如果此方法返回 true，则组件将更新。否则，组件将跳过更新。
    componentWillUpdate()： 在 DOM 中进行渲染之前调用它。不能通过调用 this.setState() 方法来更改组件状态。如果 shouldComponentUpdate() 返回 false，它将不会被调用。
    componentDidUpdate()： 渲染发生后立即调用。在此方法中，可以将任何要在更新发生后执行的代码放入其中。
    componentWillUnmount()： 在组件被永久销毁和卸载之前立即调用它。它用于清理内存空间，例如使定时器失效、事件监听器、取消网络请求或清理 DOM 元素。如果组件实例已卸载，则无法再次安装它。

旧：
- 挂载
    - constructor
    - componentWillMount
    - render
    - componentDidMount
- 更新
    - componentWillReceiveProps
    - shouldComponentUpdate
    - componentWillUpdate
    - render
    - componentDidUpdate
- 卸载
    - componentWillUnmount

新：
- 挂载阶段 Mounting
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
### React Hooks带来的便利
1. 逻辑复用，无需修改组件结构的情况下复用状态逻辑
1. 更符合 React 本身的思想，函数式、组件化。
1. HOC嵌套地狱，平铺式

### 生命周期方法要如何对应到 Hook？
- constructor：函数组件不需要构造函数。你可以通过调用 useState 来初始化 state。如果计算的代价比较昂贵，你可以传一个函数给 useState。
- getDerivedStateFromProps：改为 在渲染时 安排一次更新。
- shouldComponentUpdate：详见 下方 React.memo.
- render：这是函数组件体本身。
- componentDidMount, componentDidUpdate, componentWillUnmount：useEffect Hook 可以表达所有这些(包括 不那么 常见 的场景)的组合。
- getSnapshotBeforeUpdate，componentDidCatch 以及 getDerivedStateFromError：目前还没有这些方法的 Hook 等价写法，但很快会被添加。

```
// 没有第二个参数
// mount 阶段和 update 阶段都执行
useEffect(fn)
// 第二个参数为空数组
// 当 mount 阶段会执行
useEffect(fn,[])
// 第二个参数为依赖项
// 当依赖项（deps）数据更新时会执行
useEffect(fn, [deps])
// 清除副作用 
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // 清除订阅
    subscription.unsubscribe();
  };
});
```

[React hook](https://zh-hans.reactjs.org/docs/hooks-faq.html#which-versions-of-react-include-hooks)

### 自定义hooks
由于 useState 和 useEffect 是函数调用，因为我们可以将其组合成自己的 Hooks

```
function MyResponsiveComponent() {  
  const width = useWindowWidth();
  return (
    <p> Window width is {width}</p>  
   )
}

function useWindowWidth() {   
  const [width, setWidth] = useState(window,innerWidth); 

  useEffect(() => {  
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)    
    return () => {          
      window.removeEventListener('resize', handleResize)     
    }   
 })  
 
 return width;
}
```
自定义 Hooks 让不同的组件共享可重用的状态逻辑。注意状态本身是不共享的。每次调用 Hook 都只声明了其自身的独立状态

### React Hooks的不足
虽然实现了大多数类组件的功能，但是还无法实现 getSnapshotBeforeUpdate 和 componentDidCatch 这两个 API

## useEffect(fn, []) 不等于 componentDidMount()

### 执行时机不同
componentDidMount在组件挂载之后运行。如果立即（同步）设置 state，那么React就会触发一次额外的render，并将第二个render的响应用作初始UI，这样用户就不会看到闪烁。假设需要使用componentDidMount读取一个DOM元素的宽度，并希望更新state来反映宽度。事件的执行顺序应该是下面这样的：

1. 首次执行render
1. 此次 render 的返回值 将用于更新到真正的 Dom 中
1. componentDidMount 执行而且执行setState
1. state 变更导致 再次执行 render，而且返回了新的 返回值
1. 浏览器只显示了第二次 render 的返回值，这样可以避免闪屏
1. 可以理解为上面的过程都是同步执行的，会阻塞到浏览器将真实DOM最终绘制到浏览器上，当我们需要它的时候，这样的工作模式是合理的。但大多数情况下，我们可以在UI Paint 完毕之后，再执行一些异步拉取数据之后setState之类的副作用。

useEffect也是再挂载后运行，但是他更往后，它不会阻塞真实 DOM 的渲染，因为 useEffect 在 Paint（绘制）之后延迟异步运行，这意味着如果需要从 DOM 读取数据，然后同步设置 state 生成新的 UI，有可能会有闪烁的问题发生。React 也提供了同步执行模式的 useLayoutEffect，它更加接近 componentDidMount()表现。

如果想通过同步设置状态来避免闪烁，那么可以使用 useLayoutEffect。但是大部分时间都需要使用 useEffect 比较好。

### Props 和 State 的捕获（Capturing）
假设我们有很多异步代码操作流程，在执行时需要指定 count 的状态：

```
class App extends React.Component {
    state = {
        count: 0
    }
    componentDidMount() {
        longResolve().then(() => {
          alert(this.state.count);
        });
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState(state => ({ count: state.count + 1 }));
          }}
        >
          Count: {this.state.count}
        </button>
      </div>
    );
  }
};
```

页面加载完成后，在 longResolve 执行完成之前，假设大概有几秒钟的时间点击按钮几次。如果我在此期间点了 5 次，那么最后 alert 最终显示的也是在最新的值，也就是 5。

用 hooks 重构运行后会发现，它的表现和 class 版本有所不同，无论你在 longResove 执行完毕前点击多少次，最后 alert 的 count 都是 0。

造成这种差异的原因是 useEffect 在创建时就已经捕获了 count 的值。当我们把回调函数赋值给 useEffect时，它会存在于内存中，在内存中它只知道 count 在创建时是 0（闭包的原因）。不管经过了多少时间，以及 count 在这个时间内改变多少次，闭包的本质是只跟创建闭包时这个值的状态有关，我们称之为捕获。而在 calss 组件中，componentDidMount()中没有闭包，每次读取的都是当前的 count 的值。

可以用下面的函数来理解，在内存中，useEffect 的回调函数中的 count 在创建时赋予了初始值 0，此时 count 的值不受外界影响。

```
()=> {
    const count = 0
    longResolve().then(() => {
        alert(count)
    })
}
```

## 什么场景下使用context？
我们知道React 是单向数据流，如果组件之间有嵌套引用的关系如A引用B，B引用C，像套娃一样的关系， 在没有状态管理的情况下，只能通过props一层一层的进行传递，当组件间的调用过多的时候，维护会变得十分复杂，React自带API context可以使这个局面得到缓和，实现A组件直接到C组件的值传递，不需要经过中间组件。

### 举个小栗子
A>B>C三个组件逐层嵌套，每个组件里都包含半句话，在A组件里包含我的个人信息，需要在C组件里显示，要求信息数据不通过B组件传递。

```
//组件A
import React from "react";
import B from "./B";

export const nameContext = React.createContext("");
export default function App() {
  return (
    <nameContext.Provider value={"ys"}>
      大家好，
      <B />
    </nameContext.Provider>
  );
}
```

```
//组件B
import C from "./C";

export default function B() {
  return (
    <>
      我是今天的分享者，
      <C />
    </>
  );
}
```

```
//组件C
import React from "react";
import { nameContext } from "./App";

export default function C() {
  return (
    <nameContext.Consumer>
      {(name) => <span>我叫{name}</span>}
    </nameContext.Consumer>
  );
}

useContext写法

import React, { useContext } from "react"
import { nameContext, titleContext } from "./App"

export default function C() {
  const name = useContext(nameContext)
  const title = useContext(titleContext)

  return (
    <span>
      {name}
      {title}
    </span>
  )
}
```

### 缺点
可能会导致Child重新渲染，造成不必要的开销。

解决办法
```
 // 只需要修改这里通过useMemo包装，保证每次返回的对象不变，deeps为[],只在首次挂载执行，所以就保证了每次value都是同一个。
 const ctxValue = useMemo(() => ( {setShow }), [])

 <ParentContext.Provider value={ctxValue}>
    <Child></Child>
 </ParentContext.Provider>
```

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

React.memo 是一个 高阶组件。所谓高阶组件，其实指的就是一个接收组件并返回一个组件的函数。

React.memo 的作用是 缓存 组件，它会对传入的组件加上缓存功能生成一个新组件，然后返回这个新组件。

React.memo 判断是否使用缓存，默认使用的是浅比较，也就是只比较第一层的 key。

也就是拿到两参数：旧的和新的 props 对象，然后根据该方法的返回值来决定是否使用缓存。如果为真值，使用缓存，否则重新渲染并把新的渲染结果缓存下来。

#### React.memo
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

#### useMemo
```
import { useState, useEffect, useRef, useMemo } from "react";
import UseMemoCounts from "./use-memo-counts";

export default function ParentComponent() {
  .
  .
  const [times, setTimes] = useState(0);
  const useMemoRef = useRef(0);

  const incrementUseMemoRef = () => useMemoRef.current++;

  // uncomment the next line to test that <UseMemoCounts /> will re-render every t ime the parent re-renders.
  // const memoizedValue = useMemoRef.current++;

// the next line ensures that <UseMemoCounts /> only renders when the times value changes
const memoizedValue = useMemo(() => incrementUseMemoRef(), [times]);

  .
  .

  return (
    <div className="flex flex-col justify-center items-center border-2 rounded-md mt-5 dark:border-yellow-200 max-w-lg m-auto pb-10 bg-gray-900">
      .
      .
        <div className="mt-4 text-center">
          <button
            className="bg-indigo-200 py-2 px-10 rounded-md"
            onClick={() => setTimes(times+1)}
          >
            Force render
          </button>

          <UseMemoCounts memoizedValue={memoizedValue} />
        </div>
    </div>
  );
}
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

### React 中 fiber 是用来做什么的
Fiber 是 React 16 中采用的新协调（reconciliation）引擎，主要目标是支持虚拟 DOM 的渐进式渲染。

Fiber 将原有的 Stack Reconciler 替换为 Fiber Reconciler，提高了复杂应用的可响应性和性能。主要通过以下方式达成目标：

1. 对大型复杂任务的分片。
1. 对任务划分优先级，优先调度高优先级的任务。
1. 调度过程中，可以对任务进行挂起、恢复、终止等操作。

Fiber 对现有代码的影响： 由于 Fiber 采用了全新的调度方式，任务的更新过程可能会被打断，这意味着在组件更新过程中，render 及其之前的生命周期函数可能会调用多次。因此，在下列生命周期函数中不应出现副作用。

- shouldComponentUpdate
- React 16 中已经声明废弃的钩子 
    - componentWillMount（UNSAFE_componentWillMount）
    - componentWillReceiveProps（UNSAFE_componentWillReceiveProps）
    - componentWillUpdate（UNSAFE_componentWillUpdate）
[fiber原理](https://cloud.tencent.com/developer/article/1882296)

### fiber怎么划分任务优先级
#### 事件优先级
事件优先级是在注册阶段被确定的，在向root上注册事件时，会根据事件的类别，创建不同优先级的事件监听（listener），最终将它绑定到root上去。 

- 离散事件（DiscreteEvent）：click、keydown、focusin等，这些事件的触发不是连续的，优先级为0。
- 用户阻塞事件（UserBlockingEvent）：drag、scroll、mouseover等，特点是连续触发，阻塞渲染，优先级为1。
- 连续事件（ContinuousEvent）：canplay、error、audio标签的timeupdate和canplay，优先级最高，为2。

4种优先级：事件优先级、更新优先级、任务优先级、调度优先级，它们之间是递进的关系。事件优先级由事件本身决定，更新优先级由事件计算得出，然后放到root.pendingLanes，任务优先级来自root.pendingLanes中最紧急的那些lanes对应的优先级，调度优先级根据任务优先级获取。几种优先级环环相扣，保证了高优任务的优先执行。 

[fiber优先级](https://www.51cto.com/article/656064.html)

### 请说一下Fiber 架构下 Concurrent 模式（异步渲染）的实现原理？
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
我们日常写的事件放在某元素的jsx里，然而当jsx进行渲染的时候，它没有把事件加载到该元素对应的真实dom，而是绑定到顶层的document上面，由document监听所有的事件，调用对应的事件函数。

这样统一管理的优点就是提升了性能，也解决了兼容问题

React事件机制包括事件注册、事件的合成、事件冒泡、事件派发等

### 请说一下你对React合成事件的理解？
合成事件是 React模拟原生 DOM事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器

根据 W3C规范来定义合成事件，兼容所有浏览器，拥有与浏览器原生事件相同的接口.

##  redux,react-redux,redux-saga,dva的区别与联系

### redux
1、定位：它是将flux和函数式编程思想结合在一起形成的架构；

2、思想：视图与状态是一一对应的；所有的状态，都保存在一个对象里面；

3、API：
- store：就是一个数据池，一个应用只有一个
- state：一个 State 对应一个 View。只要 State 相同，View 就相同。
- action：State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置。
- dispatch：它是view发出action的唯一方法；
- reducer：view发出action后，state要发生变化，reducer就是改变state的处理层，它接收action和state，通过处理action来返回新的state；
- subscribe：监听。监听state，state变化view随之改变；

### react-redux
1、定位：react-redux是为了让redux更好的适用于react而生的一个库，使用这个库，要遵循一些规范；

2、主要内容

UI组件：就像一个纯函数，没有state，不做数据处理，只关注view，长什么样子完全取决于接收了什么参数（props）
容器组件：关注行为派发和数据梳理，把处理好的数据交给UI组件呈现；React-Redux规定，所有的UI组件都由用户提供，容器组件则是由React-Redux自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

connect：这个方法可以从UI组件生成容器组件；但容器组件的定位是处理数据、响应行为，因此，需要对UI组件添加额外的东西，即mapStateToProps和mapDispatchToProps，也就是在组件外加了一层state；

mapStateToProps：一个函数， 建立一个从（外部的）state对象到（UI组件的）props对象的映射关系。 它返回了一个拥有键值对的对象；

mapDispatchToProps：用来建立UI组件的参数到store.dispatch方法的映射。 它定义了哪些用户的操作应该当作动作，它可以是一个函数，也可以是一个对象。

以上，redux的出现已经可以使react建立起一个大型应用，而且能够很好的管理状态、组织代码，但是有个棘手的问题没有很好地解决，那就是异步；在react-redux中一般是引入middleware中间件来处理，redux-thunk

### redux-saga：

1、定位：react中间件；旨在于更好、更易地解决异步操作（有副作用的action）,不需要像在react-redux上还要额外引入redux-thunk；redux-saga相当于在Redux原有数据流中多了一层，对Action进行监听，捕获到监听的Action后可以派生一个新的任务对state进行维护；

2、特点：通过 Generator 函数来创建，可以用同步的方式写异步的代码；

3、API：

Effect： 一个简单的对象，这个对象包含了一些给 middleware 解释执行的信息。所有的Effect 都必须被 yield 才会执行。

put：触发某个action，作用和dispatch相同；

### dva
定位：dva 首先是一个基于redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。dva = React-Router + Redux + Redux-saga；

2、核心：

- State：一个对象，保存整个应用状态；
- View：React 组件构成的视图层；
- Action：一个对象，描述事件(包括type、payload)
- connect 方法：一个函数，绑定 State 到 View
- dispatch 方法：一个函数，发送 Action 到 State


3、model：dva 提供 app.model 这个对象，所有的应用逻辑都定义在它上面。

4、model内容：

- namespace：model的命名空间；整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成；
- state：该命名空间下的数据池；
- effects：副作用处理函数；
- reducers：等同于 redux 里的 reducer，接收 action，同步更新 state；                   
- subscriptions：订阅信息；

dva 是基于现有应用架构 (redux + react-router + redux-saga 等)的一层轻量封装，没有引入任何新概念，全部代码不到 100 行。dva 实现上尽量不创建新语法，而是用依赖库本身的语法，比如 router 的定义还是用 react-router 的 JSX 语法的方式(dynamic config 是性能的考虑层面，之后会支持)。

他最核心的是提供了 app.model 方法，用于把 reducer, initialState, action, saga 封装到一起

### react-redux connect 做了什么
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

### Redux和React-redux的使用方法及差异
![redux 流程图](/assets/imgs/redux.png "redux")

#### 个人理解  React-redux 就是跟hooks的useContex + useReducer的原理类似

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

### Redux中间件机制
流程： dispatch(action) = dispatch({type:'', payload：{} }) -> 执行 reducer() -> 修改state。

在redux中，中间件的作用在于， 调用 dispatch 触发 reducer之前做一些其他操作，也就是说，它改变的是执行dispatch到 触发 reducer的流程。


原来流程是这样的：

`dispatch -> reducer`

加入中间件就变成这样了：

`dispatch -> 中间件(Middleware) -> 中间件(Middleware)  -> 中间件(Middleware)  -> reducer`

redux使用 applyMiddleware， redux使用redux-thunk

## RN在开发中的一些坑点和注意事项

react-native是一个可以使用JavaScript+react编写移动端native应用的框架，是目前一种很是热门的一种移动应用开发方案。但是react-native通用存在着很多的问题，这让很多开发人员不得不注意其中的问题所在，并避免踩坑，这里记录一下常见的坑点，主要是分为三类：

1. 通用坑点
1. Android坑点
1. IOS的坑点

[RN在开发中的一些坑点和注意事项](https://blog.caoweiju.com/2019/07/21/rn%E5%9C%A8%E5%BC%80%E5%8F%91%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%9D%91%E7%82%B9%E5%92%8C%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9/)

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

## 如何避免React应用出现白屏？如何更优雅的处理异常？
部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，为了解决这个问题，React 16 引入了一个新的概念 —— 错误边界(Error Boundaries)。

React 15 中有一个支持有限的错误边界方法 unstable_handleError。此方法不再起作用，同时自 React 16 beta 发布起你需要在代码中将其修改为 componentDidCatch。

## 如何进行React的性能分析、监控和性能优化？
一般来说，首先应该用 React Profiler 进行 React 层面的问题筛查，这样更直观，更容易定位问题。如果某些问题跳出了 React 框架范围，或者不再能以组件粒度进行度量，我们可以回到 Performance 面板进行通用性能分析。


