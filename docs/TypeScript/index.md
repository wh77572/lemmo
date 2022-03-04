---
order: 1
---

## 什么是TypeScript

> 定义：Typed JavaScript at Any Scale. 即添加了类型系统的 JavaScript，适用于任何规模的项目。

## Ts语法
> TypeScript 是一种给 JavaScript 添加特性的语言扩展。增加的功能包括：

- 类 Classes
- 接口 Interfaces
- 模块 Modules 
- 类型注解 Type annotations
- 编译时类型检查 Compile time type checking 
- Arrow 函数 (类似 C# 的 Lambda 表达式)

### Ts数据类型
- Boolean
```
let isBoolean: boolean = false
```

---

- Number
```
TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。

let num: number = 123
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744
```

---

- String
```
let name: string = 'achang'
let name1: string = `Hello ${name}`
```

---

- Array
```
一维数组：
let arr: Array<number> = [1,3,4]
let arr2: number[] = [1,3,4] // 必须是number类型
let arr3: Array<number|string> = [1,2,3, '4'] // 可以是number 或 string 类型

二维数组：
let twoM : string[][]
let twoM : Array<Array<string>>

复杂数组：
let 变量名:<type>{} = {...}
let 变量名:Array<type> = [...]
```

---

- Function
> 函数声明式：指定函数传入参数类型，指定返回值类型，调用时传入参数个数与类型都必须相同：
>括号里指定每个参数类型，括号右边指定返回值的类型。

```
function fun (name:string,age:number):string{
  return 'sss'
}

fun('auroras',18);
```
> 如果传入参数不确定传不传，那么可以给参数加个‘？’表明它是可选的：
```
function fun (name:string,age?:number):string{
  return 'sss'
}

fun('auroras');
```
> 或者给参数添加默认值，那也会成为可选参数：
>
```
function fun (name:string,age:number=666):string{
  return 'sss'
}

fun('auroras');
```
> 如果参数个数不确定，可以用扩展运算符加解构赋值表示，当然要传入与指定类型一致的：
```
function fun (name:string,age:number=666,...res:number[]):string{
  return 'sss'
}

fun('auroras',1,2,3);
```

> 函数表达式：
```
const fun2:(name:string,age:number)=> string = (name:string,age:number) => {
  return 'sss'
}

fun2('auroras',11);
```

---

- Object
```
首先，object类型不单单可以指定对象，还可以指定数组或函数：
const foo1: object = {};
const foo2: object = [];
const foo3: object = function(){};
如果只想指定为对象，如下，对象属性都要提前声明好类型：
const obj: {name: string,age: number} = {
  name: '北极光',
  age:18
}
```

---

- Symbol
```
// 自定义Symbol
const key: symbol = Symbol();

// Well-Known Symbol
const symbolHasInstance: symbol = Symbol.hasInstance;

“unique symbol”类型的主要用途是用作接口、类等类型中的可计算属性名。因为如果使用可计算属性名在接口中添加了一个类型成员，那么必须保证该类型成员的名字是固定的，否则接口定义将失去意义。

下例中，允许将“unique symbol”类型的常量x作为接口的类型成员，而symbol类型的常量y不能作为接口的类型成员，因为symbol类型不止包含一个可能值：

const x: unique symbol = Symbol();
const y: symbol = Symbol();

interface Foo {
     [x]: string; // 正确
     [y]: string;
//  ~~~
//  错误：接口中的计算属性名称必须引用类型为字面量类型
//  或'unique symbol'的表达式
}
```

---

- undefined 和 null
```
TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大：
默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。

let u: undefined = undefined
let n: null = null
let num: number = null
```

---

- void
```
某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：
// void 表示没有任何返回值的类型
let noReturn = () => {}
function warnUser(): void {
  console.log("This is my warning message")
}

声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：

let unusable: void = undefined
// void 0 --> undefined,
```

---

- any
```
任何类型，加 Any 就跟 JavaScript 效果一样。
有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量：
```

---

- never
```
never 永远不会有返回值的类型
never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

let err = () => {
  new Error()
}
```

---

- 元组 Tuple
```
就是要提前指定数组里每个元素的类型，严格一一对应：

// 不能添加元素
let tuple: [number, string] = [0, '1']
// 可以手动添加新元素，可以添加进去
tuple.push('1')
tuple[2] // 但是可添加不能访问

let x: [string, number]
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```

---

- 枚举 enum
```
// 枚举
enum Direction {
  Up,
  Down,
  Left,
  Right
}
// 会从0索引开始取值
console.log(Direction.Up) // 0
console.log(Direction[0]) // Up
```

---

- 高级类型
```
这个就不一一列举了，欢迎补充，pr~pr~pr~
```

## JavaScript 与 TypeScript 的区别

TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。

TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。

<div style="display: flex">
  <img src="/ts-lemmo-1.png" width="160" style="margin-right: 80px">
  <img src="/ts-lemmo-2.png" width="160">
</div>  

---

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

