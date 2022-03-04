---
order: 1
---

## 什么是TypeScript

> 定义：Typed JavaScript at Any Scale. 即添加了类型系统的 JavaScript，适用于任何规模的项目。

## 语法特性
> TypeScript 是一种给 JavaScript 添加特性的语言扩展。增加的功能包括：

- 类 Classes
- 接口 Interfaces
- 模块 Modules 
- 类型注解 Type annotations
- 编译时类型检查 Compile time type checking 
- Arrow 函数 (类似 C# 的 Lambda 表达式)

## JavaScript 与 TypeScript 的区别

TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。

TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。

<div style="display: flex">
  <img src="/ts-lemmo-1.png" width="160" style="margin-right: 80px">
  <img src="/ts-lemmo-2.png" width="160">
</div>  

---

- TS 基础类型
> Number | String | Boolea | Symbal | undified | null | Array | enum | Tuple | any | void | never

- TS type 和 interface 的区别
> 1、interface 用于声明接口 它可以合并声明
>
> 2、type 用于声明类型  它可以声明基本类型的别名，联合类型，元组等
>
> 3、都可以声明对象  都可以extends扩展

- TS 泛型 和 any的区别
> 1、泛型传入什么类型的参数 就返回什么类型的值   any 是返回任意类型的值
>
> 2、泛型适用于定义抽象类或接口

