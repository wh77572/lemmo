---
title: ts
order: 3.1
---

## TypeScript 和 JavaScript 区别?
|TypeScript |	JavaScript|
|------- | ------- |
|面向对象的语言 |	脚本语言|
|静态类型 |	没有静态类型|
|支持模块 |	不支持模块|
|支持可选参数 |	不支持可选参数|

## TypeScript中的类型。
- boolean（布尔类型）
- number（数字类型）
- string（字符串类型）
- array（数组类型）
- tuple（元组类型）
- enum（枚举类型）
- any（任意类型）
- null 和 undefined 类型
- void 类型
- never 类型
- object 对象类型

### TypeScript中的内置数据类型。
- Partial
创建一个新类型，将T中的所有属性变成可选的。

- Required
创建一个新类型，将T中的属性都变成必选的。

- ReadOnly
创建一个新类型，将T中的属性都变成只读的。

- Record<K, T>
根据K和T产生一个新的类型。
注意的是K必须能赋值给 string|number|symbol.
```
type R = Record<'a'|'b',number>
// {a:number,b:number}
```

- Pick<T,K>
从T中把K属性和它的值宅出来成为一个新的类型。注意K必须是T中的某个属性。
```
interface A {
    x:number;
    y:number;
}
type Ax = Pick<A,'x'> //{x:number}
```

- Omit<T,K>
Omit 和 Pick 是互补的，意思是从T中把K属性剔除掉。

- Exclude<T,U>
把T能赋值给U类型剔除掉。
```
type T0 = Exclude<'a'|'b'|'c','a'> // 'b'|'c'
```

- Extract<T,U>
Extract和Exclude 互补的，意思是把T中可以赋值给U的类型提取出来。

- NonNullable
从T类型中剔除null和undefined产生新类型

- Parameters
获取函数类型T的参数类型构建成元组。

- ConstructorParameters
获取构造函数类型T的参数类型构建成元组。

- ReturnType
获取函数类型T的返回值类型。

- InstanceType
该工具类型能够获取构造函数的返回值类型，即实例类型。

- ThisParameterType
获取函数类型T中的this类型。

- OmitThisParameter
从类型T中剔除this参数类型

- ThisType
定义对象字面量的方法中this的类型。

## 什么是泛型？
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

    这里<T>的T就是类型参数，具体T指代什么类型，是String还是NUmber类型此处不管，而是在程序调用时再指定

### TS 泛型对象数组的多个定义方式
#### Array<泛型定义>
```
interface IRowsItem {
  [propName: string]: string | number
}

interface TableProps {
  rows: Array<IRowsItem>
}
```

#### 泛型定义[]
     
     interface IRowsItem {
       [propName: string]: string | number
     }
     
     interface TableProps {
       rows: IRowsItem[]
     }

#### 方法 C
     Record 指定对象类型
     
     interface TableProps {
       rows: Record<string, string | number>
     }

## TypeScript 中 const 和 readonly 的区别？枚举和常量枚举的区别？
###  const 与 readonly 的区别？
TypeScript 中不可变量的实现方法有两种：

- 使用 ES6 的 const 关键字声明的值类型
- 被 readonly 修饰的属性

区别：
1. const 用于变量， readonly 用于属性

1. const 在运行时检查， readonly 在编译时检查

1. const 声明的变量不得改变值，这意味着，const 一旦声明变量，就必须立即初始化，不能留到以后赋值； readonly 修饰的属性能确保自身不能修改属性，但是当你把这个属性交给其它并没有这种保证的使用者（允许出于类型兼容性的原因），他们能改变

### 枚举和常量枚举的区别？
```
// 枚举
enum Color {
  Red,
  Green,
  Blue
}

// 常量枚举
const enum Color {
  Red,
  Green,
  Blue
}
```
区别：
1. 枚举会被编译时会编译成一个对象，可以被当作对象使用
1. const 枚举会在 typescript 编译期间被删除，const 枚举成员在使用的地方会被内联进来，避免额外的性能开销

```
// 枚举
enum Color {
  Red,
  Green,
  Blue
}

var sisterAn = Color.Red
// 会被编译成 JavaScript 中的 var sisterAn = Color.Red
// 即在运行执行时，它将会查找变量 Color 和 Color.Red
```

```
// 常量枚举
const enum Color {
  Red,
  Green,
  Blue
}

var sisterAn = Color.Red
// 会被编译成 JavaScript 中的 var sisterAn = 0
// 在运行时已经没有 Color 变量
```

## TypeScript 中 any、never、unknown、null & undefined 和 void 有什么区别？
### any
这应该是 typescript 中最开始就会接触到的类型，顾名思义：任意类型，这也是 ts 中不写类型申明时的默认类型，即不作任何约束，编译时会跳过对其的类型检查，

```
let val1: any;
val1 = 'abc';
val1 = 123;
val1 = true;

const arry: any[] = [123, 'abc', true, null];
```

### never
never 同样顾名思义，表示永不存在的值的类型，是 typescript 2.0 中引入的新类型，概念有点绕，什么情况下变量会永远不存在值呢？因为通常情况下，变量一旦申明了，就会被分配值，即使没有特别指定，也会被初始化为 undefined，同样一个函数即使有个写返回值，也会默认返回 undefined，也不是真正的不存在返回值：

### unknown
顾名思义，unknown 表示未知类型，是 typescript 3.0 中引入的新类型，即写代码的时候还不清楚会得到怎样的数据类型，如服务器接口返回的数据，JSON.parse() 返回的结果等；该类型相当于 any，可以理解为官网指定的替代 any 类型的安全版本（因为不提倡直接使用 any 类型）；

它能被赋值为任何类型，但不能被赋值给除了 any 和 unknown 之外的其他类型，同时，不允许执行 unknown 类型变量的方法（any 可以），举个例子：

### Null 和 Undefined
默认情况下，null和undefined是所有其他类型的子类型，也就是如果一个变量具有其它类型，它的值可以被分配为null或者undefined。
```
let a: number;
a = undefined;
```

### void
void 表示无任何类型，正好与 any 相反，没有类型，如果是函数则应没有返回值或者返回 undefined，和 C 等语言中的无返回值函数申明类似：

## TypeScript 中 interface 可以给 Function / Array / Class（Indexable）做声明吗？
可以，interface 能够描述 JavaScript 对象的任何形式，包括函数
```
// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```

```
// Array
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];
```

```
// Class, constructor存在于类的静态部分，所以不会检查
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

## TypeScript 中 type 和 interface 的区别?
### interface
```
//一般接口名称都是大写，且不用写等于号
interface Person  {
        name:string,
        age:number
    }

//使用方式与类型一致
 let jack : Person = {
        name: 'Jack',
        age:18
    }
```  

### type
```
type Person = {
        name:string,
        age:number
    }


let jack : Person = {
    name: 'Jack',
    age:18
}
```

### 区别
1. 接口与类型别名的扩展（继承）方式不同
2. 接口可以重复的定义，而类型别名不可以

```
// 定义一个类型为动物，字段为名字
    interface Animal {
        name:string
    }
    // 定义一个类型猴子，字段为吃香蕉
    // 且继承动物类型
    interface Monkey extends Animal {
        eatBanana:boolean
    }

    let m : Monkey = {
        name:'吉吉国王',
        eatBanana:true
    }
//这样在 Monkey 类型中也有了name字段
```
type
```
// 定义一个类型为动物，字段为名字
    type Animal = {
        name:string
    }
     // 定义一个类型猴子，字段为吃香蕉
    //  并用 & 进行扩展
    type Monkey = {
        eatBanana:boolean
    } & Animal

    let m : Monkey = {
        name:'吉吉国王',
        eatBanana:true
    }
```

## class interface function的区别
interface -- 接口只声明成员方法，不做实现。

class -- 类声明并实现方法。
