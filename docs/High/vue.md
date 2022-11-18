---
title: vue
order: 5
---

## 实现一个on和emit
## 双向数据绑定和单(双)向数据流
## spa应用，v-dom，diff算法，mvvm，组件化开发
## vue响应式原理，defineproperty，proxy，对比一下两者
## keep-alive
## 使用路由做前端拦截的具体实现是什么？
## Vue双向数据绑定的原理
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

## Vue 组件中 data 为什么必须是函数？

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

## ref，$refs，$el区别
- ref ：是 元素的属性，用于设置在元素上
- $refs ：获取页面中所有含有ref属性的DOM元素
- $el ：获取Vue实例关联的DOM元素

## 
## 
## 
## 
## 
## 
## 
## 
## 
