---
title: rxjs
order: 5.1
---

本来不想开这个题的，但奈何不住市场需求，还是开一个，其实前几年就想学一下这个，现在也还是没绕的过去，那就lets do
it.

！！！它的核心思想是，将离散的多个事件视为一个流来操控，流可以（通过操作符）进行各种变换（映射、采样、合并等）。
## Rxjs介绍
Rxjs官方是这样说的: Think of RxJS as Lodash for events. 把Rxjs想像成针对events的lodash，也就是说，Rxjs本质是个工具库，处理的是事件。这里的events，可以称之为流。

流是指什么？

举个例子，代码中每1s输出一个数字，用户每一次对元素的点击，就像是在时间这个维度上，产生了一个数据集。这个数据集不像数组那样，它不是一开始都存在的，而是随着时间的流逝，一个一个数据被输出出来。这种异步行为产生的数据，就可以被称之为一个流，在Rxjs中，称之为ovservalbe（抛开英文，本质其实就是一个数据的集合，只是这些数据不一定是一开始就设定好的，而是随着时间而不断产生的）。而Rxjs，就是为了处理这种流而产生的工具，比如流与流的合并，流的截断，延迟，消抖等等操作。

最简单的例子
```
import { Observable } from "rxjs";

const now = new Date().getTime();

const stream$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.next([1, 2, 3]);
  }, 500);
  setTimeout(() => {
    subscriber.next({ a: 1000 });
  }, 1000);
  setTimeout(() => {
    subscriber.next("end");
  }, 3000);
  setTimeout(() => {
    subscriber.complete();
  }, 4000);
});

// 启动流
const subscription = stream$.subscribe({
  complete: () => console.log("done"),
  next: v => console.log(v),
  error: () => console.log("error")
});

// 1s后，关闭流
setTimeout(() => {
  subscription.unsubscribe();
}, 1000);
// output 
// [1,2,3]  // 500ms时
// {a: 1000} // 1000ms时
```

## 什么是 RxJS
RxJS 是 ReactiveX 的 JS 版实现，RxJS 之于事件处理，相当于 Lodash 之于数据处理。

RxJS 在 Angular 中作为重要的数据底层，但是其本身是一个独立的库，可以在其他场景下使用，例如配合 React + Observable-hooks 作为全局状态管理器。

