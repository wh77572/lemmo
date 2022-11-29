---
title: vue
order: 5
---

## 实现一个on和emit
```
let obj = {};
 
window.$on = (name, fn) => {
    if (!obj[name]) {
        obj[name] = [];
    }
    obj[name].push(fn);
}
 
window.$emit = (name, value) => {
    if (obj[name]) {
        obj[name].forEach(fn => {
            fn(value);
        })
    }
}
 
window.$off = (name, fn) => {
    if (name) {
        if (fn) {
            let index = obj[name].indexOf(fn);
            index>-1 && obj[name].splice(index, 1);
        } else {
            obj[name].length = 0;
        }
    }
}
 
export default {
    $on,
    $emit,
    $off
}
```

## 双向数据绑定和单(双)向数据流
### 单向数据流
数据流，表明的是数据流向，用大白话说就是数据传递。那么单项数据流 是我们的数据单一方向传输。

### 双向数据绑定
当我们在前端开发中采用 MV*的模式时，M - model，指的是模型，也就是数据，V - view，指的是视图，也就是页面展现的部分。通常，我们需要编写代码，将从服务器获取的数据进行“渲染”，展现到视图上。每当数据有变更时，我们会再次进行渲染，从而更新视图，使得视图与数据保持一致。也就是：

而另一方面，页面也会通过用户的交互，产生状态、数据的变化，这个时候，我们则编写代码，将视图对数据的更新同步到数据，以致于同步到后台服务器。

## spa应用，v-dom，diff算法，mvvm
### spa
SPA（ single-page application ）即一个web项目就只有一个页面（即一个HTML文件,HTML 内容的变换是利用路由机制实现的。

仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

优点：

- 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
- 基于上面一点，SPA 相对对服务器压力小；
- 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；

缺点：

- 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；

前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

### MVVM
MVVM其实表示的是 Model-View-ViewModel

- Model：模型层，负责处理业务逻辑以及和服务器端进行交互
- View：视图层：负责将数据模型转化为UI展示出来，可以简单的理解为HTML页面
- ViewModel：视图模型层，用来连接Model和View，是Model和View之间的通信桥梁

### 虚拟dom（vdom)是什么
它是一个Object对象模型，用来模拟真实的DOM节点的结构

## vue响应式原理，defineproperty，proxy，对比一下两者
### defineproperty
首先，vue2.0 使用的是通过 Object.defineProperty 方法来实现响应式的。我们来看看 Object.defineProperty方法的参数
    
    Object.defineProperty(obj, prop, descriptor)

```
obj: 要在其上定义属性的对象
prop: 要定义或修改的属性的名称
descriptor: 将被定义或修改的属性的描述

obj代表的是你要处理的对象，
prop为你要定义或者修改的属性的key
descriptor是一个对象，具体为：
    configurable 类型： boolean 释义：是否可以修改默认属性
    enumerable 类型： boolean 释义：是否可以被枚举
    writable 类型： boolean 释义：是否可以修改修改这个属性的值
    value类型： any 释义：初始值
    get 类型： Function 释义：被修饰的属性，在被访问的时候执行
    set 类型： Function 释义：被修饰的属性，在被修改的时候执行
```

缺点：
1. Object.defineProperty的第一个缺陷,无法监听数组变化

因为数组的变化大部分你要使用 数组的方法，vue将数组的原型拿出来，在常用的方法里面，注入render逻辑，再重新赋值给 Array 的原型。

2. 我们在使用vue2的时候，有时候在对象里面添加属性，以及删除属性，是无法触发渲染的。 那么看到上面的原理后，我相信大家已经非常明白为什么不会触发渲染了。 因为这两个操作，根本无法让set执行。所以vue提供了 set和set 和 set和delete 方法。 用于手动触发渲染。 

### proxy
    const obj = new Proxy(target, handler)
```
target: 要监听的对象  类型： 对象，数组，函数，代理对象(Proxy代理的对象)

handler: 回调的方法集合 类型：对象 , 回调方法的合集

  handler.getPrototypeOf()
  handler.setPrototypeOf()
  handler.isExtensible()
  handler.preventExtensions()
  handler.getOwnPropertyDescriptor()
  handler.defineProperty()
  handler.has()
  handler.get(target, property)
  handler.set(target, property, value)
  handler.deleteProperty()
  handler.ownKeys()
  handler.apply()
  handler.construct()
```

我们很自然的发现了，其中也有get 和set方法。和defineProperty比起来， proxy  接收的target为任何类型的对象，包括原生数组，函数，甚至另一个代理对象， 有了这个，我们会清晰的发现，实现响应式不再那么麻烦了。那么我们先来看看，Proxy如何使用set和get监听数据变化。

### 两者区别
- Proxy 是对整个对象的代理，而 Object.defineProperty 只能代理某个属性。所以我们在编写响应式函数的时候，defineProperty 需要用for in 去给每个属性添加监听
- 对象上新增属性，Proxy 可以监听到，Object.defineProperty 不能。
- 数组新增修改，Proxy 可以监听到，Object.defineProperty 不能。
- 若对象内部属性要全部递归代理，Proxy 可以只在调用的时候递归，而 Object.definePropery 需要一次完成所有递归，性能比 Proxy 差。 这个我们可以对比两个递归，definePropery 是在一开始，将传入的对象，所有属性，包括内不熟悉全部进行递归。之后才取处理set get。 但是Proxy的递归是在set中，这样，我们就可以根据需求，来调整递归原则，也就是说，在一些条件下，让其不进行递归。 举个很简单的例子。   我们页面上需要渲染一个对象，这个对象总是 会被整体重新赋值。不会单独的去修改其中的属性。那么我们就可以通过Proxy控制不让其递归这个对象，从而提高性能
- Proxy 不兼容 IE，Object.defineProperty 不兼容 IE8 及以下
- Proxy 使用上比 Object.defineProperty 方便多。

## keep-alive
keepalive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染 。也就是所谓的组件缓存

`<keep-alive>` 是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。

- `<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
- `<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

### keep-alive生命周期执行
- 页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发 deactivated 当再次进入（前进或者后退）时，只触发 activated
- 事件挂载的方法等，只执行一次的放在 mounted 中；组件每次进去执行的方法放在 activated 中；

### keepalive的参数
keepalive 可以接收3个属性做为参数进行匹配对应的组件进行缓存:

- include 包含的组件(可以为字符串，数组，以及正则表达式,只有匹配的组件会被缓存)
- exclude 排除的组件(以为字符串，数组，以及正则表达式,任何匹配的组件都不会被缓存)
- max 缓存组件的最大值(类型为字符或者数字,可以控制缓存组件的个数)

```
<!-- 如果同时使用include,exclude,那么exclude优先于include， 下面的例子只缓存a组件 -->
<keep-alive include="a,b" exclude="b"> 
  <component></component>
</keep-alive>
```

## 使用路由做前端拦截的具体实现是什么？
主要是利用vue-router提供的钩子函数beforeEach()对路由进行判断

每个钩子方法接收三个参数：
* to: Route: 即将要进入的目标 路由对象
* from: Route: 当前导航正要离开的路由
* next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
* next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
* next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
* next(‘/’) 或者 next({ path: ‘/’ }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

要想统一处理所有http请求和响应，就得用上 axios 的拦截器。通过配置http response inteceptor

## Vue双向数据绑定的原理
Vue 数据双向绑定原理是通过 数据劫持 + 发布者-订阅者模式 的方式来实现的，当监听的属性发生变动时通知订阅者，是否需要更新，若更新就会执行对应的更新函数。

常见的基于数据劫持的双向绑定有两种实现
- 一个是目前Vue在用的 Object.defineProperty
- 一个是ES2015中新增的 Proxy，而在Vue3.0版本后加入Proxy从而代替Object.defineProperty

## 请说出vue几种常用的指令
- v-if：根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。
- v-show：根据表达式之真假值，切换元素的 display CSS 属性。
- v-for：循环指令，基于一个数组或者对象渲染一个列表，vue 2.0以上必须需配合 key值 使用。
- v-bind：动态地绑定一个或多个特性，或一个组件 prop 到表达式。
- v-on：用于监听指定元素的DOM事件，比如点击事件。绑定事件监听器。
- v-model：实现表单输入和应用状态之间的双向绑定
- v-pre：跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
- v-once：只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能

## vue生命周期
- beforeCreate：创建前
- created：创建后
- beforeMount：挂载前
- mounted：挂载后
- beforeUpdate：更新前
- updated：更新后
- activated()：keep-alive 组件激活时调用
- deactivated(); keep-alive 组件停用时调用
- beforeDestroy：销毁前
- destroyed：销毁后
- errorCaptured（2.5.0+ 新增）

## v-if 和 v-show 有什么区别
- 相同点

动态显示DOM元素。

- 区别

v-if 是 真正 的 条件渲染，有更高的切换消耗，v-if适合运行时条件很少改变时使用

v-show 只是简单地切换元素的 CSS 属性display。有更高的初始消耗，v-show适合频繁切换

优先级： v-if > v-show 

## vue常用的修饰符
- .stop - 调用 event.stopPropagation()，禁止事件冒泡。
- .prevent - 调用 event.preventDefault()，阻止事件默认行为。
- .capture - 添加事件侦听器时使用 capture 模式。
- .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
- .native - 监听组件根元素的原生事件。
- .once - 只触发一次回调。
- .left - (2.2.0) 只当点击鼠标左键时触发。
- .right - (2.2.0) 只当点击鼠标右键时触发。
- .middle - (2.2.0) 只当点击鼠标中键时触发。
- .passive - (2.3.0) 以 { passive: true } 模式添加侦听器

## vue中 key 值的作用
- 唯一性，用于 管理可复用的元素
- v-for 的默认行为会尝试原地修改元素而不是移动它们。要强制其重新排序元素，你需要用特殊属性 key 来提供一个排序提示

## 什么是$nextTick？
因为Vue的异步更新队列，$nextTick是用来知道什么时候DOM更新完成的。

1. nextTick是Vue提供的一个全局API,是在下次DOM更新循环结束之后执行延迟回调，在修改数据之后使用$nextTick，则可以在回调中获取更新后的DOM；
2. Vue在更新DOM时是异步执行的。只要侦听到数据变化，Vue将开启1个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个watcher被多次触发，只会被推入到队列中-次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作是非常重要的。nextTick方法会在队列中加入一个回调函数，确保该函数在前面的dom操作完成后才调用；
3. 比如，我在干什么的时候就会使用nextTick，传一个回调函数进去，在里面执行dom操作即可；
4. 我也有简单了解nextTick实现，它会在callbacks里面加入我们传入的函数，然后用timerFunc异步方式调用它们，首选的异步方式会是Promise。这让我明白了为什么可以在nextTick中看到dom操作结果。

## Vue 组件中 data 为什么必须是函数？
因为使用对象的话，每个实例（组件）上使用的data数据是相互影响的

vue data是函数的原因：
1. 防止data复用；
vue中组件是用来复用的，为了防止data复用，将其定义为函数。

2. data独立性；
vue组件中的data数据都应该是相互隔离，互不影响的，组件每复用一次，data数据就应该被复制一次，之后，当某一处复用的地方组件内data数据被改变时，其他复用地方组件的data数据不受影响，就需要通过data函数返回一个对象作为组件的状态。

3. 作用域；
当我们将组件中的data写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的data，拥有自己的作用域，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。

4. js的特性。
当我们组件的date单纯的写成对象形式，这些实例用的是同一个构造函数，由于JavaScript的特性所导致，所有的组件实例共用了一个data，就会造成一个变了全都会变的结果。

```
var MyComponent = function() {}
MyComponent.prototype.data = {
  a: 1,
  b: 2,
}
// 上面是一个虚拟的组件构造器，真实的组件构造器方法很多

var component1 = new MyComponent()
var component2 = new MyComponent()
// 上面实例化出来两个组件实例，也就是通过<my-component>调用，创建的两个实例

component1.data.a === component2.data.a // true
component1.data.b = 5
component2.data.b // 5
```

## v-for 与 v-if 的优先级
- v-for的优先级比v-if更高
- 永远不要把 v-if 和 v-for 同时用在一个元素上，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）
- 如果避免出现这种情况，则在外层嵌套 template （页面渲染不生成dom节点），再这一层进行 v-if 判断，然后再内部进行 v-for 循环

```
<template v-if="isShow">
    <p v-for="item in items">
</template>
```

## Vue组件通讯方式
- props / $emit 适用 父子组件通信
- ref 与 $parent / $children 适用 父子组件通信
- $emit / $on 适用于 父子、隔代、兄弟组件通信
- $attrs/$listeners 适用于 隔代组件通信
- provide / inject 适用于 隔代组件通信
- Vuex 适用于 父子、隔代、兄弟组件通信

## Vue中$set()的作用
给对象添加新的属性。如果视图不能更新的话用$set可以进行视图更新。只所以用$set 是因为Vue无法监听普通的新增属性的变化。

## vue-router有哪几种导航钩子（ 导航守卫 ）？
1. 全局守卫： router.beforeEach
1. 全局解析守卫： router.beforeResolve
1. 全局后置钩子： router.afterEach
1. 路由独享的守卫： beforeEnter
1. 组件内的守卫： beforeRouteEnter、beforeRouteUpdate (2.2 新增)、beforeRouteLeave

## vuex(状态管理器的使用)
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

### State
```
//创建且声明一个对象
export const store = new Vuex.Store({
    state:{
        isShow:true,
        items:[
        {
            name:"张三",
            num:"1"
        },
        {
            name:"李四",
            num:"2"
        },
        {
            name:"王五",
            num:"3"
        }
        ]
    }
})
```
使用：
```
computed:{
        itemList(){
            return this.$store.state.items
        }
    },
```

### Mutations
我们可以使用mutations配合vuex提供的commit方法来修改state中的状态
```
export const store = new Vuex.Store({
    state:{
        isShow:false,
        myData:'',
        items:[
            {
                name:"张三",
                num:1
            },
            {
                name:"李四",
                num:2
            },
            {
                name:"王五",
                num:3
            }
            ]
    },
    mutations:{
        //定义一个函数动态修改state的状态值
        numTurn(state){ /这里的state代表上面的State
            state.items.forEach(item=>{
                item.num+=100
            })
        }
    }
})
```
```
<button @click="$store.commit('numTurn')">改变数字</button>
```

### store.commit跟dispatch的区别
- 共同点：在更改状态、触发更改状态时都可以以载荷方式和对象方式进行分发
- 区别：
    - commit：(同步操作)
    
    mutation注册了一个变更状态的事件后，需要调用 store.commit()来进行状态变更
    
    - dispatch：(可以是异步操作)
    
    数据提交至 actions ，可用于向后台提交数据

### Action
如文档中所说,Action类似于Mutations,不同在于：

Aciton提交的是mutation,而不是直接变更状态
Action可以包含任何异步操作

## vue中watch，computed 和methods的区别
### 计算属性computed :
- 支持缓存，只有依赖数据发生改变，才会重新进行计算
- 不支持异步，当computed内有异步操作时无效，无法监听数据的变化
- computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props中的数据通过计算得到的值
- 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed
- 如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。

### 监听属性watch：（需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用）
- 不支持缓存，数据变，直接会触发相应的操作
- watch支持异步
- 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
- 当一个属性发生变化时，需要执行对应的操作；一对多；
- 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数，
- immediate：组件加载立即触发回调函数执行， deep: 深度监听，复杂类型的数据时使用，例如数组中的对象改变。注意：deep无法监听到数组的变动和对象的新增，参考vue数组变异,只有以响应式的方式触发才会被监听到。

### Methods
Methods是挂载到vue实例所有方法的集合

## vue 的computed 属性是怎么收集依赖的？
我们都知道在Vue.js中对data对象数据的依赖收集在Object.defineProperty的get方法中

每一个 computed ，都是一个Watcher ,这就意味着它可以像组件Watcher一样，去做一些依赖收集的工作，在这里着重提一点const computedWatcherOptions = { lazy: true },可以看到这个配置在创建Watcher时被导入，这个配置也是computed与watch的最大区别。

## ref，$refs，$el区别
- ref ：是 元素的属性，用于设置在元素上
- $refs ：获取页面中所有含有ref属性的DOM元素
- $el ：获取Vue实例关联的DOM元素
